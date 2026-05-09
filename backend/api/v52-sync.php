<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';
require_once __DIR__ . '/../config.php';
start_secure_session();

$data = input_json();

function vv(array $data, string $key, string $default = ''): string {
    return isset($data[$key]) ? trim((string)$data[$key]) : $default;
}
function nn(array $data, string $key): float {
    return isset($data[$key]) ? (float)$data[$key] : 0.0;
}

$pdo = db();
$projectKey    = vv($data, 'projectKey');
$invoiceNo     = vv($data, 'invoiceNo');
$businessName  = vv($data, 'businessName', 'New Business');
$customerName  = vv($data, 'customerName', 'Customer');
$contactNumber = vv($data, 'contactNumber');
$email         = vv($data, 'email');

// Guard: skip INSERT for anonymous/empty page-load pings.
// Only save to DB when the visitor has provided at least one real identifier.
$hasRealEmail   = $email !== '' && strpos($email, '@noemail.') === false;
$hasRealContact = preg_replace('/\D/', '', $contactNumber) !== '';

if (!$hasRealEmail && !$hasRealContact) {
    if ($projectKey !== '') {
        $chk = $pdo->prepare("SELECT id FROM projects WHERE project_key = ? LIMIT 1");
        $chk->execute([$projectKey]);
        if (!$chk->fetchColumn()) {
            // No existing project and no real data — skip silently
            json_response(['success' => true, 'skipped' => true, 'reason' => 'no_real_data']);
        }
        // Project exists → fall through and UPDATE it
    } else {
        json_response(['success' => true, 'skipped' => true, 'reason' => 'no_project_key']);
    }
}

if ($projectKey === '') $projectKey = 'WDLK-' . time() . '-' . random_int(1000,9999);
if ($invoiceNo === '')  $invoiceNo  = 'WD-' . date('ymd') . '-' . random_int(1000,9999);
// Never use fake placeholder emails
if (!$hasRealEmail) $email = '';

$pdo->beginTransaction();
try {
    // Only touch the users table when we have a real email
    $userId = 0;
    if ($hasRealEmail) {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email=? OR contact_number=? LIMIT 1");
        $stmt->execute([$email, $contactNumber]);
        $userId = (int)($stmt->fetchColumn() ?: 0);

        if (!$userId) {
            $username = vv($data, 'username') ?: null;
            $stmt = $pdo->prepare("INSERT INTO users (business_name,name,username,contact_number,email,password_hash) VALUES (?,?,?,?,?,?)");
            $stmt->execute([$businessName, $customerName, $username, $contactNumber, $email, null]);
            $userId = (int)$pdo->lastInsertId();
        } else {
            $username = vv($data, 'username');
            if ($username !== '') {
                $stmt = $pdo->prepare("UPDATE users SET business_name=?, name=?, username=?, contact_number=?, updated_at=NOW() WHERE id=?");
                $stmt->execute([$businessName, $customerName, $username, $contactNumber, $userId]);
            } else {
                $stmt = $pdo->prepare("UPDATE users SET business_name=?, name=?, contact_number=?, updated_at=NOW() WHERE id=?");
                $stmt->execute([$businessName, $customerName, $contactNumber, $userId]);
            }
        }
    }

    $stmt = $pdo->prepare("SELECT id FROM projects WHERE project_key=? OR invoice_no=? LIMIT 1");
    $stmt->execute([$projectKey, $invoiceNo]);
    $projectId = (int)($stmt->fetchColumn() ?: 0);

    $params = [
        'project_key'=>$projectKey,
        'user_id'=>$userId,
        'invoice_no'=>$invoiceNo,
        'business_type'=>vv($data,'businessType'),
        'business_name'=>$businessName,
        'customer_name'=>$customerName,
        'contact_number'=>$contactNumber,
        'email'=>$email,
        'business_description'=>vv($data,'businessDescription'),
        'main_services'=>vv($data,'mainServices'),
        'page_count'=>vv($data,'pageCount'),
        'business_model'=>vv($data,'businessModel'),
        'website_path'=>vv($data,'websitePath'),
        'theme_name'=>vv($data,'selectedTheme'),
        'theme_category'=>vv($data,'themeCategory'),
        'theme_image'=>vv($data,'themeImage'),
        'pricing_type'=>vv($data,'pricingType'),
        'pricing_type_label'=>vv($data,'pricingTypeLabel'),
        'package_name'=>vv($data,'packageName'),
        'package_label'=>vv($data,'packageLabel'),
        'package_pages'=>vv($data,'packagePages'),
        'total_price'=>nn($data,'totalPrice'),
        'advance_payment'=>nn($data,'advancePayment'),
        'balance_payment'=>nn($data,'balancePayment'),
        'payment_status'=>vv($data,'paymentStatus', vv($data,'status','Lead')),
        'final_payment_status'=>vv($data,'finalPaymentStatus'),
        'status'=>vv($data,'status','Lead'),
        'stage'=>vv($data,'stage','lead'),
        'progress_percent'=> isset($data['progressPercent']) ? (int)nn($data, 'progressPercent') : ((vv($data, 'stage') === 'live' || vv($data, 'stage') === 'ready_to_launch') ? 100 : (isset($data['pendingLead']) && $data['pendingLead'] ? 20 : 0)),
        'live_url'=>vv($data,'liveUrl'),
        'renewal_date'=>vv($data,'renewalDate') ?: null,
        'raw_json'=>json_encode($data, JSON_UNESCAPED_UNICODE)
    ];

    if ($projectId) {
        // Fetch current row so we only overwrite fields with real incoming values
        $cur = $pdo->prepare("SELECT * FROM projects WHERE id = ? LIMIT 1");
        $cur->execute([$projectId]);
        $existing = $cur->fetch() ?: [];

        function vvMerge(string $new, string $old, array $blanks = ['']): string {
            return in_array($new, $blanks, true) ? $old : $new;
        }
        function nnMerge(float $new, float $old): float { return $new > 0 ? $new : $old; }

        $params['user_id']              = nnMerge((float)$params['user_id'],    (float)($existing['user_id']           ?? 0));
        $params['invoice_no']           = vvMerge($params['invoice_no'],             $existing['invoice_no']           ?? '');
        $params['business_type']        = vvMerge($params['business_type'],          $existing['business_type']        ?? '');
        $params['business_name']        = vvMerge($params['business_name'],          $existing['business_name']        ?? '', ['', 'New Business']);
        $params['customer_name']        = vvMerge($params['customer_name'],          $existing['customer_name']        ?? '', ['', 'Customer']);
        $params['contact_number']       = vvMerge($params['contact_number'],         $existing['contact_number']       ?? '');
        $params['email']                = vvMerge($params['email'],                  $existing['email']                ?? '');
        $params['business_description'] = vvMerge($params['business_description'],   $existing['business_description'] ?? '');
        $params['main_services']        = vvMerge($params['main_services'],          $existing['main_services']        ?? '');
        $params['page_count']           = vvMerge($params['page_count'],             $existing['page_count']           ?? '');
        $params['business_model']       = vvMerge($params['business_model'],         $existing['business_model']       ?? '');
        $params['website_path']         = vvMerge($params['website_path'],           $existing['website_path']         ?? '');
        $params['theme_name']           = vvMerge($params['theme_name'],             $existing['theme_name']           ?? '');
        $params['theme_category']       = vvMerge($params['theme_category'],         $existing['theme_category']       ?? '');
        $params['theme_image']          = vvMerge($params['theme_image'],            $existing['theme_image']          ?? '');
        $params['pricing_type']         = vvMerge($params['pricing_type'],           $existing['pricing_type']         ?? '');
        $params['pricing_type_label']   = vvMerge($params['pricing_type_label'],     $existing['pricing_type_label']   ?? '');
        $params['package_name']         = vvMerge($params['package_name'],           $existing['package_name']         ?? '');
        $params['package_label']        = vvMerge($params['package_label'],          $existing['package_label']        ?? '');
        $params['package_pages']        = vvMerge($params['package_pages'],          $existing['package_pages']        ?? '');
        $params['total_price']          = nnMerge($params['total_price'],      (float)($existing['total_price']       ?? 0));
        $params['advance_payment']      = nnMerge($params['advance_payment'],  (float)($existing['advance_payment']   ?? 0));
        $params['balance_payment']      = nnMerge($params['balance_payment'],  (float)($existing['balance_payment']   ?? 0));
        $params['payment_status']       = vvMerge($params['payment_status'],         $existing['payment_status']       ?? '', ['', 'Lead']);
        if (strtolower((string)($existing['payment_status'] ?? '')) === 'received' && strtolower((string)$params['payment_status']) !== 'received') {
            $params['payment_status'] = 'received';
        }
        $params['final_payment_status'] = vvMerge($params['final_payment_status'],   $existing['final_payment_status'] ?? '');
        if (strtolower((string)($existing['final_payment_status'] ?? '')) === 'received' && strtolower((string)$params['final_payment_status']) !== 'received') {
            $params['final_payment_status'] = 'received';
        }
        $params['status']               = vvMerge($params['status'],                 $existing['status']               ?? '', ['', 'Lead']);
        $params['stage']                = vvMerge($params['stage'],                  $existing['stage']                ?? '', ['', 'lead']);
        if (strtolower((string)($params['payment_status'] ?? '')) === 'received' && in_array($params['stage'], ['lead', 'pending_lead', 'payment_pending_verification'], true)) {
            $params['stage'] = $existing['stage'] && !in_array($existing['stage'], ['lead', 'pending_lead', 'payment_pending_verification'], true) ? $existing['stage'] : 'planning';
        }
        $params['progress_percent']     = (int)nnMerge((float)$params['progress_percent'], (float)($existing['progress_percent'] ?? 0));
        $params['live_url']             = vvMerge($params['live_url'],               $existing['live_url']             ?? '');
        if ($params['renewal_date'] === null) $params['renewal_date'] = $existing['renewal_date'] ?? null;

        $sql = "UPDATE projects SET project_key=:project_key, user_id=:user_id, invoice_no=:invoice_no, business_type=:business_type, business_name=:business_name, customer_name=:customer_name, contact_number=:contact_number, email=:email, business_description=:business_description, main_services=:main_services, page_count=:page_count, business_model=:business_model, website_path=:website_path, theme_name=:theme_name, theme_category=:theme_category, theme_image=:theme_image, pricing_type=:pricing_type, pricing_type_label=:pricing_type_label, package_name=:package_name, package_label=:package_label, package_pages=:package_pages, total_price=:total_price, advance_payment=:advance_payment, balance_payment=:balance_payment, payment_status=:payment_status, final_payment_status=:final_payment_status, status=:status, stage=:stage, progress_percent=:progress_percent, live_url=:live_url, renewal_date=:renewal_date, raw_json=:raw_json, updated_at=NOW() WHERE id=:id";
        $params['id'] = $projectId;
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
    } else {
        $sql = "INSERT INTO projects (project_key,user_id,invoice_no,business_type,business_name,customer_name,contact_number,email,business_description,main_services,page_count,business_model,website_path,theme_name,theme_category,theme_image,pricing_type,pricing_type_label,package_name,package_label,package_pages,total_price,advance_payment,balance_payment,payment_status,final_payment_status,status,stage,progress_percent,live_url,renewal_date,raw_json) VALUES (:project_key,:user_id,:invoice_no,:business_type,:business_name,:customer_name,:contact_number,:email,:business_description,:main_services,:page_count,:business_model,:website_path,:theme_name,:theme_category,:theme_image,:pricing_type,:pricing_type_label,:package_name,:package_label,:package_pages,:total_price,:advance_payment,:balance_payment,:payment_status,:final_payment_status,:status,:stage,:progress_percent,:live_url,:renewal_date,:raw_json)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $projectId = (int)$pdo->lastInsertId();
    }

    $username = vv($data, 'username');
    $plainPassword = vv($data, 'accountPassword');
    if ($username !== '' && $plainPassword !== '') {
        $hash = password_hash($plainPassword, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO customer_accounts (project_id,project_key,invoice_no,business_name,customer_name,username,contact_number,email,password_hash,plain_password_temp,status,email_alert_status,sms_alert_status)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
        ON DUPLICATE KEY UPDATE project_id=VALUES(project_id), invoice_no=VALUES(invoice_no), business_name=VALUES(business_name), customer_name=VALUES(customer_name), contact_number=VALUES(contact_number), email=VALUES(email), password_hash=VALUES(password_hash), plain_password_temp=VALUES(plain_password_temp), status='active', updated_at=NOW()");
        $stmt->execute([$projectId,$projectKey,$invoiceNo,$businessName,$customerName,$username,$contactNumber,$email,$hash,$plainPassword,'active','prepared','prepared']);

        $subject = 'Your Webdeveloper.lk Customer Account';
        $message = "Dear {$customerName},\n\nYour Webdeveloper.lk customer account is ready.\nUsername: {$username}\nContact Login: {$contactNumber}\nPassword: {$plainPassword}\nDashboard: " . rtrim(APP_URL,'/') . "/customer-dashboard.php";
        if ($email !== '' && strpos($email, '@noemail.webdeveloper.lk') === false) {
            $headers = "From: " . MAIL_FROM . "\r\nContent-Type: text/plain; charset=UTF-8";
            $sent = @mail($email, $subject, $message, $headers);
            $stmt = $pdo->prepare("INSERT INTO email_alerts (project_id,project_key,email_to,subject,message,status) VALUES (?,?,?,?,?,?)");
            $stmt->execute([$projectId,$projectKey,$email,$subject,$message,$sent?'sent':'prepared']);
        }
        if ($contactNumber !== '') {
            $sms = "Webdeveloper.lk login: {$username} / {$contactNumber}. Password: {$plainPassword}";
            $stmt = $pdo->prepare("INSERT INTO sms_alerts (project_id,project_key,phone,message,status) VALUES (?,?,?,?,?)");
            $stmt->execute([$projectId,$projectKey,$contactNumber,$sms,'prepared']);
        }
    }

    $title = isset($data['pendingLead']) && $data['pendingLead'] ? 'Pending lead created' : 'System synced';
    $reason = vv($data,'reason','sync');
    $stmt = $pdo->prepare("INSERT INTO admin_notifications (project_id,title,message,type) VALUES (?,?,?,?)");
    $stmt->execute([$projectId,$title,$businessName . ' | ' . $reason,$reason]);

    $stmt = $pdo->prepare("INSERT INTO activity_log (project_id,project_key,invoice_no,activity_type,title,message,payload_json) VALUES (?,?,?,?,?,?,?)");
    $stmt->execute([$projectId,$projectKey,$invoiceNo,$reason,$title,$businessName,json_encode($data, JSON_UNESCAPED_UNICODE)]);

    $advanceStatus = vv($data, 'paymentStatus');
    $advanceIsRealPayment = $advanceStatus !== '' && !in_array(strtolower($advanceStatus), ['lead', 'pending lead'], true);
    if ($advanceIsRealPayment && nn($data, 'advancePayment') > 0) {
        $stmt = $pdo->prepare("SELECT status FROM payments WHERE project_id=? AND payment_type='advance' LIMIT 1");
        $stmt->execute([$projectId]);
        $existingPaymentStatus = strtolower((string)($stmt->fetchColumn() ?: ''));
        if ($existingPaymentStatus !== 'received' && $existingPaymentStatus !== 'advance_paid' && $existingPaymentStatus !== 'balance_paid') {
            $stmt = $pdo->prepare("INSERT INTO payments (project_id,payment_type,amount,method,status,paid_at)
            VALUES (?,?,?,?,?,?)
            ON DUPLICATE KEY UPDATE amount=VALUES(amount), method=VALUES(method), status=VALUES(status), paid_at=VALUES(paid_at), updated_at=NOW()");
            $paidAt = stripos($advanceStatus, 'paid') !== false || stripos($advanceStatus, 'received') !== false ? date('Y-m-d H:i:s') : null;
            $stmt->execute([$projectId, 'advance', nn($data, 'advancePayment'), vv($data, 'paymentMethod', 'Card / Bank'), $advanceStatus, $paidAt]);
        }
    }

    $finalStatus = vv($data, 'finalPaymentStatus');
    if ($finalStatus !== '' && nn($data, 'balancePayment') > 0) {
        $stmt = $pdo->prepare("SELECT status FROM payments WHERE project_id=? AND payment_type='final' LIMIT 1");
        $stmt->execute([$projectId]);
        $existingPaymentStatus = strtolower((string)($stmt->fetchColumn() ?: ''));
        if ($existingPaymentStatus !== 'received' && $existingPaymentStatus !== 'advance_paid' && $existingPaymentStatus !== 'balance_paid') {
            $stmt = $pdo->prepare("INSERT INTO payments (project_id,payment_type,amount,method,status,paid_at)
            VALUES (?,?,?,?,?,?)
            ON DUPLICATE KEY UPDATE amount=VALUES(amount), method=VALUES(method), status=VALUES(status), paid_at=VALUES(paid_at), updated_at=NOW()");
            $paidAt = stripos($finalStatus, 'paid') !== false || stripos($finalStatus, 'received') !== false ? date('Y-m-d H:i:s') : null;
            $stmt->execute([$projectId, 'final', nn($data, 'balancePayment'), vv($data, 'finalPaymentMethod', 'Card / Bank'), $finalStatus, $paidAt]);
        }
    }

    $pdo->commit();
    json_response(['success'=>true,'projectId'=>$projectId,'projectKey'=>$projectKey,'invoiceNo'=>$invoiceNo]);
} catch (Throwable $e) {
    $pdo->rollBack();
    json_response(['success'=>false,'message'=>'Sync failed','error'=>$e->getMessage()],500);
}
