<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';

// Validate provider signature here before updating payment.
// This sample accepts JSON: reference, status, paidAt.
$data = input_json();
$reference = trim($data['reference'] ?? '');
$status = trim($data['status'] ?? 'failed');
$paidAt = $data['paidAt'] ?? date('Y-m-d H:i:s');

if (!$reference) json_response(['success'=>false,'message'=>'Missing reference'],422);

$stmt = db()->prepare("UPDATE payments SET status=?, paid_at=? WHERE gateway_reference=?");
$stmt->execute([$status, $paidAt, $reference]);

json_response(['success'=>true]);
