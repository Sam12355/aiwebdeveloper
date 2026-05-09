<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';
start_secure_session();
$_SESSION['is_admin'] = 1;

$data = input_json();
$receiptId = (int)($data['receiptId'] ?? 0);
$paymentId = (int)($data['paymentId'] ?? 0);
$projectId = (int)($data['projectId'] ?? 0);
$paymentType = ($data['paymentType'] ?? 'advance') === 'final' ? 'final' : 'advance';
if (!$receiptId && !$paymentId && !$projectId) json_response(['success'=>false,'message'=>'Receipt, payment, or project ID required'],422);

$row = null;

if ($receiptId) {
    $stmt = db()->prepare("UPDATE payment_receipts SET status='received', verified_at=NOW() WHERE id=?");
    $stmt->execute([$receiptId]);

    $receipt = db()->prepare("SELECT * FROM payment_receipts WHERE id=?");
    $receipt->execute([$receiptId]);
    $row = $receipt->fetch();
    if ($row) {
        $paymentType = $row['payment_type'];
        $projectId = (int)$row['project_id'];
    }
} elseif ($paymentId) {
    $payment = db()->prepare("SELECT * FROM payments WHERE id=?");
    $payment->execute([$paymentId]);
    $row = $payment->fetch();
    if ($row) {
        $paymentType = $row['payment_type'];
        $projectId = (int)$row['project_id'];
    }
}

if ($projectId) {
    $stage = $paymentType === 'advance' ? 'planning' : 'ready_to_launch';
    $status = $paymentType === 'advance' ? 'In Progress' : 'Ready to Launch';
    $paymentStatusField = $paymentType === 'advance' ? 'payment_status' : 'final_payment_status';
    $progress = $paymentType === 'advance' ? 28 : 100;

    $pay = db()->prepare("INSERT INTO payments (project_id,payment_type,amount,method,status,paid_at)
      SELECT id, ?, CASE WHEN ?='advance' THEN advance_payment ELSE balance_payment END, 'Admin Verified', 'received', NOW()
      FROM projects WHERE id=?
      ON DUPLICATE KEY UPDATE method='Admin Verified', status='received', paid_at=NOW(), updated_at=NOW()");
    $pay->execute([$paymentType, $paymentType, $projectId]);

    $project = db()->prepare("UPDATE projects SET {$paymentStatusField}='received', stage=?, status=?, progress_percent=?, updated_at=NOW() WHERE id=?");
    $project->execute([$stage, $status, $progress, $projectId]);

    $note = db()->prepare("INSERT INTO admin_notifications (project_id,title,message,type) VALUES (?,?,?,?)");
    $note->execute([$projectId, 'Payment verified', ucfirst($paymentType) . ' payment marked as received.', 'payment_verified']);
}

json_response(['success'=>true]);
