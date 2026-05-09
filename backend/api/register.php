<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';

$data = input_json();
$business = trim($data['businessName'] ?? '');
$name = trim($data['name'] ?? '');
$phone = trim($data['contactNumber'] ?? '');
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if (!$business || !$name || !$phone || !$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['success' => false, 'message' => 'Invalid registration details'], 422);
}

$hash = $password ? password_hash($password, PASSWORD_DEFAULT) : null;
$stmt = db()->prepare("SELECT id FROM users WHERE email=? LIMIT 1");
$stmt->execute([$email]);
$existingId = (int)($stmt->fetchColumn() ?: 0);

if ($existingId) {
    $stmt = db()->prepare("UPDATE users SET business_name=?, name=?, contact_number=?, password_hash=COALESCE(?, password_hash), updated_at=NOW() WHERE id=?");
    $stmt->execute([$business, $name, $phone, $hash, $existingId]);
    $userId = $existingId;
} else {
    $stmt = db()->prepare("INSERT INTO users (business_name, name, contact_number, email, password_hash) VALUES (?,?,?,?,?)");
    $stmt->execute([$business, $name, $phone, $email, $hash]);
    $userId = (int)db()->lastInsertId();
}

start_secure_session();
$_SESSION['user_id'] = $userId;
$_SESSION['is_admin'] = 0;

json_response(['success' => true, 'userId' => $_SESSION['user_id']]);
