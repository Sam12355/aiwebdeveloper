<?php
declare(strict_types=1);
require_once __DIR__ . '/config.php';

function start_secure_session(): void {
    if (session_status() === PHP_SESSION_ACTIVE) return;

    ini_set('session.use_strict_mode', '1');
    ini_set('session.cookie_httponly', '1');
    ini_set('session.cookie_samesite', 'Lax');

    if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
        ini_set('session.cookie_secure', '1');
    }

    session_name(SESSION_NAME);
    session_start();

    if (!isset($_SESSION['created_at'])) {
        $_SESSION['created_at'] = time();
    }

    if (isset($_SESSION['last_activity']) && (time() - (int)$_SESSION['last_activity']) > SESSION_LIFETIME) {
        session_unset();
        session_destroy();
        session_name(SESSION_NAME);
        session_start();
    }

    $_SESSION['last_activity'] = time();
}

function require_login(): void {
    start_secure_session();
    if (empty($_SESSION['user_id'])) {
        json_response(['success' => false, 'message' => 'Unauthorized'], 401);
    }
}

function require_admin(): void {
    start_secure_session();
    if (empty($_SESSION['is_admin'])) {
        json_response(['success' => false, 'message' => 'Admin access required'], 403);
    }
}

function require_login_page(): void {
    start_secure_session();
    if (empty($_SESSION['user_id'])) {
        header('Location: login.php');
        exit;
    }
}

function require_admin_page(): void {
    start_secure_session();
    if (empty($_SESSION['is_admin'])) {
        header('Location: admin-login.php');
        exit;
    }
}
