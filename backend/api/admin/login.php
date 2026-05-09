<?php
declare(strict_types=1);
require_once dirname(__DIR__, 2) . '/security.php';
require_once dirname(__DIR__, 2) . '/db.php';
require_once dirname(__DIR__, 2) . '/session.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

$data = input_json();
$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');

// Admin credentials — match admin-login.js
// In production, replace with DB lookup + password_verify()
$ADMIN_USER = 'YaK077wd';
$ADMIN_PASS = '@YKwdLK##%$$';

if ($username === $ADMIN_USER && $password === $ADMIN_PASS) {
    start_secure_session();
    $_SESSION['is_admin']   = true;
    $_SESSION['admin_user'] = $username;
    json_response(['success' => true, 'message' => 'Admin session started']);
} else {
    json_response(['success' => false, 'message' => 'Invalid admin credentials'], 401);
}
