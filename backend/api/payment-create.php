<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';
require_login();

$data = input_json();
$projectId = (int)($data['projectId'] ?? 0);
$type = $data['type'] === 'final' ? 'final' : 'advance';
$amount = (float)($data['amount'] ?? 0);

if (!$projectId || $amount <= 0) json_response(['success'=>false,'message'=>'Invalid payment request'],422);

// Replace this block with real payment provider request.
// For PayHere/WebXpay/OnePay etc, generate hash/signature here and return checkout payload.
$reference = 'WD-PAY-' . date('ymdHis') . '-' . random_int(100, 999);

$stmt = db()->prepare("INSERT INTO payments (project_id, payment_type, amount, gateway, gateway_reference, status) VALUES (?,?,?,?,?,?)");
$stmt->execute([$projectId, $type, $amount, PAYMENT_GATEWAY_MODE, $reference, 'pending']);

json_response([
  'success'=>true,
  'paymentId'=>db()->lastInsertId(),
  'reference'=>$reference,
  'mode'=>PAYMENT_GATEWAY_MODE,
  'message'=>'Connect real gateway credentials in backend/config.php'
]);
