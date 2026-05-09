<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';

$data = input_json();
$login = trim($data['login'] ?? '');
$password = trim($data['password'] ?? '');

$stmt = db()->prepare("SELECT * FROM users WHERE email = ? OR contact_number = ? LIMIT 1");
$stmt->execute([$login, $login]);
$user = $stmt->fetch();

if (!$user) json_response(['success' => false, 'message' => 'User not found'], 404);
if (!empty($user['password_hash']) && !password_verify($password, $user['password_hash'])) {
    json_response(['success' => false, 'message' => 'Invalid password'], 401);
}

start_secure_session();
$_SESSION['user_id'] = (int)$user['id'];
$_SESSION['is_admin'] = (int)$user['is_admin'];

json_response(['success' => true, 'user' => ['id'=>$user['id'], 'name'=>$user['name'], 'businessName'=>$user['business_name'], 'isAdmin'=>(int)$user['is_admin']]]);
