<?php
declare(strict_types=1);
require_once __DIR__ . '/../session.php';
start_secure_session();
session_unset();
session_destroy();
setcookie(SESSION_NAME, '', time() - 3600, '/');
header('Location: ../../admin-login.php');
exit;
