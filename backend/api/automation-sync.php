<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';
start_secure_session();

$pdo = db();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'POST') {
    $data = input_json();
    $projectKey = trim((string)($data['projectKey'] ?? ''));
    $invoiceNo = trim((string)($data['invoiceNo'] ?? ''));
    $type = trim((string)($data['type'] ?? 'sync'));
    $title = trim((string)($data['title'] ?? 'Frontend activity'));
    $message = trim((string)($data['message'] ?? ''));

    $projectId = null;
    if ($projectKey !== '' || $invoiceNo !== '') {
        $stmt = $pdo->prepare("SELECT id FROM projects WHERE project_key=? OR invoice_no=? LIMIT 1");
        $stmt->execute([$projectKey, $invoiceNo]);
        $projectId = $stmt->fetchColumn() ?: null;
    }

    $payload = json_encode($data, JSON_UNESCAPED_UNICODE);
    $stmt = $pdo->prepare("INSERT INTO activity_log (project_id,project_key,invoice_no,activity_type,title,message,payload_json) VALUES (?,?,?,?,?,?,?)");
    $stmt->execute([$projectId, $projectKey, $invoiceNo, $type, $title, $message, $payload]);

    if ($projectId) {
        $stmt = $pdo->prepare("INSERT INTO admin_notifications (project_id,title,message,type) VALUES (?,?,?,?)");
        $stmt->execute([$projectId, $title, $message, $type]);
    }

    json_response(['success'=>true, 'projectId'=>$projectId]);
}

$projects = $pdo->query("SELECT * FROM projects ORDER BY updated_at DESC, created_at DESC LIMIT 300")->fetchAll();
$payments = $pdo->query("SELECT p.*, pr.invoice_no, pr.project_key, pr.business_name FROM payments p JOIN projects pr ON pr.id=p.project_id ORDER BY p.updated_at DESC, p.created_at DESC LIMIT 300")->fetchAll();
$receipts = $pdo->query("SELECT r.*, pr.invoice_no, pr.project_key, pr.business_name FROM payment_receipts r JOIN projects pr ON pr.id=r.project_id ORDER BY r.submitted_at DESC LIMIT 300")->fetchAll();
$messages = $pdo->query("SELECT m.*, pr.invoice_no, pr.project_key, pr.business_name FROM project_messages m LEFT JOIN projects pr ON pr.id=m.project_id ORDER BY m.created_at DESC LIMIT 300")->fetchAll();
$notifications = $pdo->query("SELECT n.*, pr.invoice_no, pr.project_key, pr.business_name FROM admin_notifications n LEFT JOIN projects pr ON pr.id=n.project_id ORDER BY n.created_at DESC LIMIT 300")->fetchAll();
$activities = $pdo->query("SELECT a.*, pr.business_name FROM activity_log a LEFT JOIN projects pr ON pr.id=a.project_id ORDER BY a.created_at DESC LIMIT 300")->fetchAll();

json_response([
  'success'=>true,
  'projects'=>$projects,
  'payments'=>$payments,
  'receipts'=>$receipts,
  'messages'=>$messages,
  'notifications'=>$notifications,
  'activities'=>$activities
]);
