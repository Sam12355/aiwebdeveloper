<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';
require_once __DIR__ . '/../config.php';
start_secure_session();

$data = input_json();
$email = trim((string)($data['email'] ?? ''));
$subject = trim((string)($data['subject'] ?? 'Webdeveloper.lk Website Project Update'));
$message = trim((string)($data['message'] ?? ''));
$projectKey = trim((string)($data['projectKey'] ?? ''));

$projectId = null;
if ($projectKey !== '') {
    $stmt = db()->prepare("SELECT id FROM projects WHERE project_key=? OR invoice_no=? LIMIT 1");
    $stmt->execute([$projectKey, $projectKey]);
    $projectId = $stmt->fetchColumn() ?: null;
}

$stmt = db()->prepare("INSERT INTO admin_replies (project_id,email_to,subject,message,status) VALUES (?,?,?,?,?)");
$stmt->execute([$projectId, $email, $subject, $message, 'saved']);

if ($projectId) {
    $stmt = db()->prepare("INSERT INTO project_messages (project_id,sender_type,subject,message,email_to,email_status) VALUES (?,?,?,?,?,?)");
    $stmt->execute([$projectId, 'admin', $subject, $message, $email, 'saved']);
}

$sent = false;
if ($email !== '' && $message !== '') {
    $headers = "From: " . MAIL_FROM . "\r\nContent-Type: text/plain; charset=UTF-8";
    // This may require cPanel mail configuration. If mail() fails, record is still saved.
    $sent = @mail($email, $subject, $message, $headers);
}

json_response(['success'=>true, 'saved'=>true, 'mailSent'=>$sent]);
