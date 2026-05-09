<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';
start_secure_session();

$data = input_json();

function val(array $data, string $key, string $default = ''): string {
    return isset($data[$key]) ? trim((string)$data[$key]) : $default;
}
function num(array $data, string $key): float {
    return isset($data[$key]) ? (float)$data[$key] : 0.0;
}

$projectKey    = val($data, 'projectKey');
$email         = val($data, 'email');
$contactNumber = val($data, 'contactNumber');
$businessName  = val($data, 'businessName', 'New Business');
$customerName  = val($data, 'customerName', 'Customer');
$invoiceNo     = val($data, 'invoiceNo');

// Only save when the customer has provided at least one real identifier.
// This prevents blank "ghost" records created by data-recorder.js on every page load.
$hasRealEmail   = $email !== '' && !str_contains($email, '@noemail.');
$hasRealContact = preg_replace('/\D/', '', $contactNumber) !== '';
$hasRealName    = !in_array($businessName, ['New Business', '', 'Customer'], true) ||
                  !in_array($customerName, ['Customer', ''], true);

$pdo = db();

if (!$hasRealEmail && !$hasRealContact) {
    // No real customer data yet — check if this project already exists in DB.
    // If it does, we can still UPDATE it (the customer may have data from a previous step).
    // If it doesn't, skip the insert entirely.
    if ($projectKey !== '') {
        $chk = $pdo->prepare("SELECT id FROM projects WHERE project_key = ? LIMIT 1");
        $chk->execute([$projectKey]);
        if (!$chk->fetchColumn()) {
            // Truly empty first visit — ignore
            json_response(['success' => true, 'skipped' => true, 'reason' => 'no_real_data']);
        }
    } else {
        json_response(['success' => true, 'skipped' => true, 'reason' => 'no_project_key']);
    }
}

if ($projectKey === '') {
    $projectKey = 'WDLK-' . time() . '-' . random_int(1000, 9999);
}
if ($invoiceNo === '') {
    $invoiceNo = 'WD-' . date('ymd') . '-' . random_int(1000, 9999);
}

$pdo = db();
$pdo->beginTransaction();

try {
    // Only create / update a user row when we have a real email
    $userId = 0;
    if ($hasRealEmail) {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
        $stmt->execute([$email]);
        $userId = (int)($stmt->fetchColumn() ?: 0);

        if (!$userId) {
            $stmt = $pdo->prepare("INSERT INTO users (business_name, name, contact_number, email, password_hash) VALUES (?,?,?,?,?)");
            $stmt->execute([$businessName, $customerName, $contactNumber, $email, null]);
            $userId = (int)$pdo->lastInsertId();
        } else {
            $stmt = $pdo->prepare("UPDATE users SET business_name=?, name=?, contact_number=?, updated_at=NOW() WHERE id=?");
            $stmt->execute([$businessName, $customerName, $contactNumber, $userId]);
        }
    }

    $stmt = $pdo->prepare("SELECT id FROM projects WHERE project_key = ? OR invoice_no = ? LIMIT 1");
    $stmt->execute([$projectKey, $invoiceNo]);
    $projectId = (int)($stmt->fetchColumn() ?: 0);

    $params = [
        'project_key' => $projectKey,
        'user_id' => $userId,
        'invoice_no' => $invoiceNo,
        'business_type' => val($data, 'businessType'),
        'business_name' => $businessName,
        'customer_name' => $customerName,
        'contact_number' => $contactNumber,
        'email' => $email,
        'business_description' => val($data, 'businessDescription'),
        'main_services' => val($data, 'mainServices'),
        'page_count' => val($data, 'pageCount'),
        'business_model' => val($data, 'businessModel'),
        'website_path' => val($data, 'websitePath'),
        'feature' => val($data, 'feature'),
        'additional_info' => val($data, 'additionalInfo'),
        'theme_name' => val($data, 'selectedTheme'),
        'theme_category' => val($data, 'themeCategory'),
        'theme_image' => val($data, 'themeImage'),
        'pricing_type' => val($data, 'pricingType'),
        'pricing_type_label' => val($data, 'pricingTypeLabel'),
        'package_name' => val($data, 'packageName'),
        'package_label' => val($data, 'packageLabel'),
        'package_pages' => val($data, 'packagePages'),
        'total_price' => num($data, 'totalPrice'),
        'advance_payment' => num($data, 'advancePayment'),
        'balance_payment' => num($data, 'balancePayment'),
        'payment_status' => val($data, 'paymentStatus', 'lead'),
        'final_payment_status' => val($data, 'finalPaymentStatus'),
        'status' => val($data, 'status', 'Lead'),
        'stage' => val($data, 'stage', 'lead'),
        'progress_percent' => (int)num($data, 'progressPercent'),
        'live_url' => val($data, 'liveUrl'),
        'renewal_date' => val($data, 'renewalDate') ?: null,
        'raw_json' => json_encode($data, JSON_UNESCAPED_UNICODE),
    ];

    if ($projectId) {
        // Fetch current row so we only overwrite fields with real incoming values
        $cur = $pdo->prepare("SELECT * FROM projects WHERE id = ? LIMIT 1");
        $cur->execute([$projectId]);
        $existing = $cur->fetch() ?: [];

        function mergeField(string $new, string $old, array $blanks = ['']): string {
            return in_array($new, $blanks, true) ? $old : $new;
        }
        function mergeNum(float $new, float $old): float { return $new > 0 ? $new : $old; }
        function mergeInt(int $new, int $old): int { return $new > 0 ? $new : $old; }

        $params['user_id']              = mergeNum((float)$params['user_id'], (float)($existing['user_id'] ?? 0));
        $params['invoice_no']           = mergeField($params['invoice_no'],           $existing['invoice_no']           ?? '');
        $params['business_type']        = mergeField($params['business_type'],        $existing['business_type']        ?? '');
        $params['business_name']        = mergeField($params['business_name'],        $existing['business_name']        ?? '', ['', 'New Business']);
        $params['customer_name']        = mergeField($params['customer_name'],        $existing['customer_name']        ?? '', ['', 'Customer']);
        $params['contact_number']       = mergeField($params['contact_number'],       $existing['contact_number']       ?? '');
        $params['email']                = mergeField($params['email'],                $existing['email']                ?? '');
        $params['business_description'] = mergeField($params['business_description'], $existing['business_description'] ?? '');
        $params['main_services']        = mergeField($params['main_services'],        $existing['main_services']        ?? '');
        $params['page_count']           = mergeField($params['page_count'],           $existing['page_count']           ?? '');
        $params['business_model']       = mergeField($params['business_model'],       $existing['business_model']       ?? '');
        $params['website_path']         = mergeField($params['website_path'],         $existing['website_path']         ?? '');
        $params['feature']              = mergeField($params['feature'],              $existing['feature']              ?? '');
        $params['additional_info']      = mergeField($params['additional_info'],      $existing['additional_info']      ?? '');
        $params['theme_name']           = mergeField($params['theme_name'],           $existing['theme_name']           ?? '');
        $params['theme_category']       = mergeField($params['theme_category'],       $existing['theme_category']       ?? '');
        $params['theme_image']          = mergeField($params['theme_image'],          $existing['theme_image']          ?? '');
        $params['pricing_type']         = mergeField($params['pricing_type'],         $existing['pricing_type']         ?? '');
        $params['pricing_type_label']   = mergeField($params['pricing_type_label'],   $existing['pricing_type_label']   ?? '');
        $params['package_name']         = mergeField($params['package_name'],         $existing['package_name']         ?? '');
        $params['package_label']        = mergeField($params['package_label'],        $existing['package_label']        ?? '');
        $params['package_pages']        = mergeField($params['package_pages'],        $existing['package_pages']        ?? '');
        $params['total_price']          = mergeNum($params['total_price'],       (float)($existing['total_price']       ?? 0));
        $params['advance_payment']      = mergeNum($params['advance_payment'],   (float)($existing['advance_payment']   ?? 0));
        $params['balance_payment']      = mergeNum($params['balance_payment'],   (float)($existing['balance_payment']   ?? 0));
        $params['payment_status']       = mergeField($params['payment_status'],       $existing['payment_status']       ?? '', ['', 'lead']);
        if (strtolower((string)($existing['payment_status'] ?? '')) === 'received' && strtolower((string)$params['payment_status']) !== 'received') {
            $params['payment_status'] = 'received';
        }
        $params['final_payment_status'] = mergeField($params['final_payment_status'], $existing['final_payment_status'] ?? '');
        if (strtolower((string)($existing['final_payment_status'] ?? '')) === 'received' && strtolower((string)$params['final_payment_status']) !== 'received') {
            $params['final_payment_status'] = 'received';
        }
        $params['status']               = mergeField($params['status'],               $existing['status']               ?? '', ['', 'Lead']);
        $params['stage']                = mergeField($params['stage'],                $existing['stage']                ?? '', ['', 'lead']);
        if (strtolower((string)($params['payment_status'] ?? '')) === 'received' && in_array($params['stage'], ['lead', 'pending_lead', 'payment_pending_verification'], true)) {
            $params['stage'] = $existing['stage'] && !in_array($existing['stage'], ['lead', 'pending_lead', 'payment_pending_verification'], true) ? $existing['stage'] : 'planning';
        }
        $params['progress_percent']     = mergeInt((int)$params['progress_percent'],  (int)($existing['progress_percent'] ?? 0));
        $params['live_url']             = mergeField($params['live_url'],             $existing['live_url']             ?? '');
        if ($params['renewal_date'] === null) $params['renewal_date'] = $existing['renewal_date'] ?? null;

        $sql = "UPDATE projects SET
          project_key=:project_key, user_id=:user_id, invoice_no=:invoice_no, business_type=:business_type, business_name=:business_name,
          customer_name=:customer_name, contact_number=:contact_number, email=:email, business_description=:business_description,
          main_services=:main_services, page_count=:page_count, business_model=:business_model, website_path=:website_path,
          feature=:feature, additional_info=:additional_info, theme_name=:theme_name, theme_category=:theme_category,
          theme_image=:theme_image, pricing_type=:pricing_type, pricing_type_label=:pricing_type_label, package_name=:package_name,
          package_label=:package_label, package_pages=:package_pages, total_price=:total_price, advance_payment=:advance_payment,
          balance_payment=:balance_payment, payment_status=:payment_status, final_payment_status=:final_payment_status,
          status=:status, stage=:stage, progress_percent=:progress_percent, live_url=:live_url, renewal_date=:renewal_date,
          raw_json=:raw_json, updated_at=NOW()
          WHERE id=:id";
        $params['id'] = $projectId;
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
    } else {
        $sql = "INSERT INTO projects
        (project_key,user_id,invoice_no,business_type,business_name,customer_name,contact_number,email,business_description,main_services,
        page_count,business_model,website_path,feature,additional_info,theme_name,theme_category,theme_image,pricing_type,pricing_type_label,
        package_name,package_label,package_pages,total_price,advance_payment,balance_payment,payment_status,final_payment_status,status,stage,
        progress_percent,live_url,renewal_date,raw_json)
        VALUES
        (:project_key,:user_id,:invoice_no,:business_type,:business_name,:customer_name,:contact_number,:email,:business_description,:main_services,
        :page_count,:business_model,:website_path,:feature,:additional_info,:theme_name,:theme_category,:theme_image,:pricing_type,:pricing_type_label,
        :package_name,:package_label,:package_pages,:total_price,:advance_payment,:balance_payment,:payment_status,:final_payment_status,:status,:stage,
        :progress_percent,:live_url,:renewal_date,:raw_json)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $projectId = (int)$pdo->lastInsertId();
    }

    $reason = val($data, 'reason', 'customer_update');
    $stmt = $pdo->prepare("INSERT INTO admin_notifications (project_id, title, message, type) VALUES (?,?,?,?)");
    $stmt->execute([$projectId, 'Customer data updated', $businessName . ' | ' . $reason, $reason]);

    $paymentStatus = val($data, 'paymentStatus');
    $paymentIsRealPayment = $paymentStatus !== '' && !in_array(strtolower($paymentStatus), ['lead', 'pending lead'], true);
    if ($paymentIsRealPayment && num($data, 'advancePayment') > 0) {
        $stmt = $pdo->prepare("SELECT status FROM payments WHERE project_id=? AND payment_type='advance' LIMIT 1");
        $stmt->execute([$projectId]);
        $existingPaymentStatus = strtolower((string)($stmt->fetchColumn() ?: ''));
        if (in_array($existingPaymentStatus, ['received', 'advance_paid', 'balance_paid'], true)) {
            $pdo->commit();
            json_response(['success' => true, 'projectId' => $projectId, 'projectKey' => $projectKey, 'invoiceNo' => $invoiceNo]);
        }
        $stmt = $pdo->prepare("SELECT id FROM payments WHERE project_id=? AND payment_type='advance' LIMIT 1");
        $stmt->execute([$projectId]);
        $payId = (int)($stmt->fetchColumn() ?: 0);
        if ($payId) {
            $stmt = $pdo->prepare("UPDATE payments SET amount=?, method=?, status=?, updated_at=NOW() WHERE id=?");
            $stmt->execute([num($data, 'advancePayment'), val($data, 'paymentMethod', 'Bank / Card'), $paymentStatus, $payId]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO payments (project_id, payment_type, amount, method, status) VALUES (?,?,?,?,?)");
            $stmt->execute([$projectId, 'advance', num($data, 'advancePayment'), val($data, 'paymentMethod', 'Bank / Card'), $paymentStatus]);
        }
    }

    $pdo->commit();
    json_response(['success' => true, 'projectId' => $projectId, 'projectKey' => $projectKey, 'invoiceNo' => $invoiceNo]);
} catch (Throwable $e) {
    $pdo->rollBack();
    json_response(['success' => false, 'message' => 'Record failed', 'error' => $e->getMessage()], 500);
}
