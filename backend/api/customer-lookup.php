<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';

$data = input_json();
$login = trim((string)($data['login'] ?? ''));
$digits = preg_replace('/\D+/', '', $login);

if ($login === '') {
    json_response(['success' => false, 'message' => 'Phone or email is required'], 422);
}

$pdo = db();
$stmt = $pdo->prepare("
    SELECT
      p.*,
      ca.username,
      ca.plain_password_temp,
      ca.status AS account_status
    FROM projects p
    LEFT JOIN customer_accounts ca ON ca.project_id = p.id
    WHERE LOWER(p.email) = LOWER(?)
       OR REPLACE(REPLACE(REPLACE(REPLACE(p.contact_number, ' ', ''), '-', ''), '+', ''), '.', '') = ?
       OR LOWER(ca.email) = LOWER(?)
       OR REPLACE(REPLACE(REPLACE(REPLACE(ca.contact_number, ' ', ''), '-', ''), '+', ''), '.', '') = ?
    ORDER BY p.updated_at DESC, p.id DESC
    LIMIT 1
");
$stmt->execute([$login, $digits, $login, $digits]);
$row = $stmt->fetch();

if (!$row) {
    json_response(['success' => false, 'message' => 'No project found for this phone or email'], 404);
}

start_secure_session();
$_SESSION['customer_project_id'] = (int)$row['id'];
$_SESSION['is_admin'] = 0;

json_response([
    'success' => true,
    'customer' => [
        'businessName' => $row['business_name'] ?? '',
        'yourName' => $row['customer_name'] ?? 'Customer',
        'contactNumber' => $row['contact_number'] ?? '',
        'email' => $row['email'] ?? '',
        'username' => $row['username'] ?? '',
        'accountStatus' => $row['account_status'] ?? 'active',
    ],
    'project' => [
        'id' => $row['invoice_no'] ?? '',
        'projectKey' => $row['project_key'] ?? '',
        'invoiceNo' => $row['invoice_no'] ?? '',
        'businessName' => $row['business_name'] ?? '',
        'customerName' => $row['customer_name'] ?? '',
        'contactNumber' => $row['contact_number'] ?? '',
        'email' => $row['email'] ?? '',
        'businessType' => $row['business_type'] ?? '',
        'businessDescription' => $row['business_description'] ?? '',
        'mainServices' => $row['main_services'] ?? '',
        'pageCount' => $row['page_count'] ?? '',
        'businessModel' => $row['business_model'] ?? '',
        'websitePath' => $row['website_path'] ?? '',
        'themeName' => $row['theme_name'] ?? '',
        'themeCategory' => $row['theme_category'] ?? '',
        'themeImage' => $row['theme_image'] ?? '',
        'pricingTypeLabel' => $row['pricing_type_label'] ?? '',
        'packageName' => $row['package_name'] ?? '',
        'packageLabel' => $row['package_label'] ?? '',
        'packagePages' => $row['package_pages'] ?? '',
        'totalPrice' => (float)($row['total_price'] ?? 0),
        'advancePayment' => (float)($row['advance_payment'] ?? 0),
        'balancePayment' => (float)($row['balance_payment'] ?? 0),
        'paymentStatus' => $row['payment_status'] ?? '',
        'finalPaymentStatus' => $row['final_payment_status'] ?? '',
        'status' => $row['status'] ?? '',
        'stage' => $row['stage'] ?? '',
        'progressPercent' => (int)($row['progress_percent'] ?? 0),
        'liveUrl' => $row['live_url'] ?? '',
        'renewalDate' => $row['renewal_date'] ?? '',
    ],
]);
