<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';
start_secure_session();

$projectId = (int)($_POST['projectId'] ?? $_POST['project_id'] ?? 0);
$projectKey = trim((string)($_POST['projectKey'] ?? $_POST['project_key'] ?? $_POST['invoiceNo'] ?? $_POST['invoice_no'] ?? ''));
$paymentTypeRaw = $_POST['paymentType'] ?? $_POST['payment_type'] ?? 'advance';
$paymentType = $paymentTypeRaw === 'final' ? 'final' : 'advance';
$amount = (float)($_POST['amount'] ?? 0);

if (!$projectId && $projectKey !== '') {
    $stmt = db()->prepare("SELECT id FROM projects WHERE project_key=? OR invoice_no=? LIMIT 1");
    $stmt->execute([$projectKey, $projectKey]);
    $projectId = (int)($stmt->fetchColumn() ?: 0);
}

if (!$projectId || empty($_FILES['receipt'])) {
    json_response(['success' => false, 'message' => 'Project and receipt are required'], 422);
}

if (!is_dir(UPLOAD_DIR)) mkdir(UPLOAD_DIR, 0755, true);

$file = $_FILES['receipt'];
$allowed = ['image/jpeg','image/png','image/webp','application/pdf'];
$mime = mime_content_type($file['tmp_name']);

if ($file['size'] > MAX_UPLOAD_BYTES || !in_array($mime, $allowed, true)) {
    json_response(['success' => false, 'message' => 'Invalid receipt file'], 422);
}

$safeName = preg_replace('/[^a-zA-Z0-9._-]/', '_', basename($file['name']));
$stored = uniqid('receipt_', true) . '_' . $safeName;
move_uploaded_file($file['tmp_name'], UPLOAD_DIR . $stored);

$fileUrl = rtrim(APP_URL, '/') . '/backend/uploads/' . $stored;

$stmt = db()->prepare("INSERT INTO payment_receipts
(project_id, payment_type, method, amount, bank_name, branch, account_name, account_number, receipt_file, file_url, status)
VALUES (?,?,?,?,?,?,?,?,?,?,?)");
$stmt->execute([
    $projectId,
    $paymentType,
    'Bank Transfer / Manual Deposit',
    $amount,
    'Commercial Bank',
    'Kadawatha Branch',
    'Web Designer & Web Developer (Pvt)Ltd',
    '1000433270',
    $stored,
    $fileUrl,
    'pending_verification'
]);

$receiptId = db()->lastInsertId();

$stmt = db()->prepare("INSERT INTO payments (project_id,payment_type,amount,method,status)
VALUES (?,?,?,?,?)
ON DUPLICATE KEY UPDATE amount=VALUES(amount), method=VALUES(method), status=VALUES(status), updated_at=NOW()");
try {
    $stmt->execute([$projectId, $paymentType, $amount, 'Bank Transfer / Manual Deposit', 'pending_verification']);
} catch (Throwable $e) {
    // Payments table may not have unique key in older schemas, insert separately.
    $stmt = db()->prepare("INSERT INTO payments (project_id,payment_type,amount,method,status) VALUES (?,?,?,?,?)");
    $stmt->execute([$projectId, $paymentType, $amount, 'Bank Transfer / Manual Deposit', 'pending_verification']);
}

$statusField = $paymentType === 'final' ? 'final_payment_status' : 'payment_status';
$stmt = db()->prepare("UPDATE projects SET {$statusField}='pending_verification', status='Payment Pending Verification', updated_at=NOW() WHERE id=?");
$stmt->execute([$projectId]);

$stmt = db()->prepare("INSERT INTO admin_notifications (project_id,title,message,type) VALUES (?,?,?,?)");
$stmt->execute([$projectId, 'Payment receipt uploaded', ucfirst($paymentType) . ' payment receipt uploaded. Please verify.', 'payment_receipt']);

json_response(['success' => true, 'receiptId' => $receiptId, 'fileUrl' => $fileUrl, 'status' => 'pending_verification']);
