<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';
require_once __DIR__ . '/../config.php';
start_secure_session();

$data = input_json(); // read body once

// 1. Try PHP session (customer logged in via login page)
$projectId = (int)($_SESSION['customer_project_id'] ?? 0);

// 2. Fallback: identify project by projectKey / invoiceNo sent from localStorage
if (!$projectId) {
    $projectKey = wdlk_clean_string((string)($data['projectKey'] ?? ''));
    $invoiceNo  = wdlk_clean_string((string)($data['invoiceNo'] ?? ''));

    if ($projectKey !== '' || $invoiceNo !== '') {
        $where  = [];
        $params = [];
        if ($projectKey !== '') { $where[] = 'project_key = ?'; $params[] = $projectKey; }
        if ($invoiceNo !== '')  { $where[] = 'invoice_no = ?';  $params[] = $invoiceNo; }
        $stmt = db()->prepare(
            "SELECT id FROM projects WHERE " . implode(' OR ', $where) . " LIMIT 1"
        );
        $stmt->execute($params);
        $projectId = (int)($stmt->fetchColumn() ?: 0);
    }
}

if (!$projectId) {
    json_response(['success' => false, 'error' => 'Could not identify project. Please log in.'], 401);
    exit;
}

$message = wdlk_clean_string((string)($data['message'] ?? ''));
$subject = wdlk_clean_string((string)($data['subject'] ?? 'Customer Message'));

if ($message === '') {
    json_response(['success' => false, 'error' => 'Message is required'], 400);
    exit;
}

$pdo = db();

$stmt = $pdo->prepare("SELECT business_name, customer_name, email FROM projects WHERE id = ? LIMIT 1");
$stmt->execute([$projectId]);
$project = $stmt->fetch(PDO::FETCH_ASSOC);

$stmt = $pdo->prepare(
    "INSERT INTO project_messages (project_id, sender_type, subject, message, email_to, email_status)
     VALUES (?, 'customer', ?, ?, ?, 'saved')"
);
$stmt->execute([$projectId, $subject, $message, ADMIN_EMAIL]);
$messageId = (int)$pdo->lastInsertId();

$notifTitle = ($project['business_name'] ?? 'Customer') . ' sent a new message';
$stmt = $pdo->prepare(
    "INSERT INTO admin_notifications (project_id, title, message, type) VALUES (?, ?, ?, 'message')"
);
$stmt->execute([$projectId, $notifTitle, mb_substr($message, 0, 120)]);

json_response(['success' => true, 'messageId' => $messageId, 'projectId' => $projectId]);
