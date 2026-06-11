<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';
start_secure_session();

$projectId = null;

if (!empty($_SESSION['customer_project_id'])) {
    // Customer logged in via login page
    $projectId = (int)$_SESSION['customer_project_id'];

} elseif (!empty($_SESSION['is_admin'])) {
    // Admin — must supply projectId param
    $projectId = (int)($_GET['projectId'] ?? 0);
    if (!$projectId) {
        json_response(['success' => false, 'error' => 'projectId required'], 400);
        exit;
    }

} else {
    // Fallback: customer identifies via projectKey / invoiceNo from localStorage
    $projectKey = wdlk_clean_string((string)($_GET['projectKey'] ?? ''));
    $invoiceNo  = wdlk_clean_string((string)($_GET['invoiceNo'] ?? ''));

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

    if (!$projectId) {
        json_response(['success' => false, 'error' => 'Authentication required'], 401);
        exit;
    }
}

$stmt = db()->prepare(
    "SELECT id, sender_type, subject, message, email_to, email_status, created_at
     FROM project_messages
     WHERE project_id = ?
     ORDER BY created_at ASC
     LIMIT 200"
);
$stmt->execute([$projectId]);
$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

json_response(['success' => true, 'messages' => $messages, 'projectId' => $projectId]);
