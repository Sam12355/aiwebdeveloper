<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';
require_admin();

$data = input_json();
$to = trim($data['to'] ?? '');
$subject = trim($data['subject'] ?? 'Webdeveloper.lk Update');
$message = trim($data['message'] ?? '');

if (!filter_var($to, FILTER_VALIDATE_EMAIL) || !$message) {
    json_response(['success'=>false,'message'=>'Invalid notification'],422);
}

$headers = 'From: ' . MAIL_FROM . "\r\n" . 'Content-Type: text/plain; charset=UTF-8';
$sent = mail($to, $subject, $message, $headers);

json_response(['success'=>$sent]);
