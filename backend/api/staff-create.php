<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';
require_admin();

$data = input_json();
$name = trim($data['name'] ?? '');
$role = trim($data['role'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');

if (!$name || !$role) json_response(['success'=>false,'message'=>'Name and role required'],422);

$stmt = db()->prepare("INSERT INTO staff_members (name, role, email, phone) VALUES (?,?,?,?)");
$stmt->execute([$name, $role, $email, $phone]);

json_response(['success'=>true,'staffId'=>db()->lastInsertId()]);
