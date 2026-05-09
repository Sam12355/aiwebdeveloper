<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';
require_login();

$projectId = (int)($_POST['projectId'] ?? 0);
if (!$projectId || empty($_FILES['files'])) {
    json_response(['success' => false, 'message' => 'No files uploaded'], 422);
}

if (!is_dir(UPLOAD_DIR)) mkdir(UPLOAD_DIR, 0755, true);

$allowed = ['image/jpeg','image/png','image/webp','application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
$saved = [];

foreach ($_FILES['files']['name'] as $i => $name) {
    $tmp = $_FILES['files']['tmp_name'][$i];
    $size = (int)$_FILES['files']['size'][$i];
    $mime = mime_content_type($tmp);

    if ($size > MAX_UPLOAD_BYTES || !in_array($mime, $allowed, true)) continue;

    $safeName = preg_replace('/[^a-zA-Z0-9._-]/', '_', basename($name));
    $stored = uniqid('wdlk_', true) . '_' . $safeName;
    move_uploaded_file($tmp, UPLOAD_DIR . $stored);

    $stmt = db()->prepare("INSERT INTO project_files (project_id, original_name, stored_name, mime_type, size_bytes, uploaded_by) VALUES (?,?,?,?,?,?)");
    $stmt->execute([$projectId, $name, $stored, $mime, $size, 'customer']);
    $saved[] = $name;
}

json_response(['success' => true, 'saved' => $saved]);
