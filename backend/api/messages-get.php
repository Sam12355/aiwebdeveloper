<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';
start_secure_session();

$projectId = null;

if (!empty($_SESSION['customer_project_id'])) {
    // Logged-in customer — identified by their own session
    $projectId = (int)$_SESSION['customer_project_id'];

} else {
    // Resolve from explicit request identifiers. These are handled BEFORE the admin
    // check so the customer dashboard (which sends projectKey/invoiceNo) still works
    // even if an admin session happens to be active in the same browser.
    $projectKey = wdlk_clean_string((string)($_GET['projectKey'] ?? ''));
    $invoiceNo  = wdlk_clean_string((string)($_GET['invoiceNo'] ?? ''));
    $reqId      = (int)($_GET['projectId'] ?? 0);

    if ($projectKey !== '' || $invoiceNo !== '') {
        // Customer-style request: look up the project by its key / invoice
        $where  = [];
        $params = [];
        if ($projectKey !== '') { $where[] = 'project_key = ?'; $params[] = $projectKey; }
        if ($invoiceNo !== '')  { $where[] = 'invoice_no = ?';  $params[] = $invoiceNo; }
        $stmt = db()->prepare(
            "SELECT id FROM projects WHERE " . implode(' OR ', $where) . " LIMIT 1"
        );
        $stmt->execute($params);
        $projectId = (int)($stmt->fetchColumn() ?: 0);

    } elseif ($reqId > 0 && !empty($_SESSION['is_admin'])) {
        // Admin inbox: viewing a specific project by id
        $projectId = $reqId;

    } elseif (!empty($_SESSION['is_admin'])) {
        json_response(['success' => false, 'error' => 'projectId required'], 400);
        exit;
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
