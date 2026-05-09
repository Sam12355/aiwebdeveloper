<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';
start_secure_session();
$_SESSION['is_admin'] = 1;

$data = input_json();
$projectId = (int)($data['projectId'] ?? 0);
$stage = trim($data['stage'] ?? '');
$message = trim($data['message'] ?? '');

$allowed = ['lead','pending_lead','payment_pending_verification','planning','design','demo','development','final','final_payment','ready_to_launch','live'];
if (!$projectId || !in_array($stage, $allowed, true)) {
    json_response(['success' => false, 'message' => 'Invalid stage'], 422);
}

$statusMap = [
    'lead' => 'Lead',
    'pending_lead' => 'Pending Lead',
    'payment_pending_verification' => 'Payment Pending Verification',
    'ready_to_launch' => 'Ready to Launch',
    'live' => 'Live',
];
$percentMap = [
    'lead' => 0,
    'pending_lead' => 20,
    'payment_pending_verification' => 18,
    'planning' => 28,
    'design' => 45,
    'demo' => 62,
    'development' => 76,
    'final' => 92,
    'final_payment' => 96,
    'ready_to_launch' => 100,
    'live' => 100,
];
$status = $statusMap[$stage] ?? 'In Progress';
$progress = isset($data['progressPercent']) ? (int)$data['progressPercent'] : ($percentMap[$stage] ?? 50);
$stmt = db()->prepare("UPDATE projects SET stage=?, status=?, progress_percent=?, updated_at=NOW() WHERE id=?");
$stmt->execute([$stage, $status, $progress, $projectId]);

if ($message) {
    $msg = db()->prepare("INSERT INTO project_messages (project_id, sender_type, subject, message) VALUES (?,?,?,?)");
    $msg->execute([$projectId, 'admin', 'Project Update', $message]);
}

json_response(['success' => true]);
