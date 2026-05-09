<?php
// Webdeveloper.lk backend configuration.
// Update these values after creating the MySQL database in cPanel.
declare(strict_types=1);

define('DB_HOST', 'localhost');
define('DB_NAME', 'webdeveloper_local');
define('DB_USER', 'root');
define('DB_PASS', '');

define('APP_URL', 'http://localhost/ecom');
define('UPLOAD_DIR', __DIR__ . '/uploads/');
define('MAX_UPLOAD_BYTES', 5 * 1024 * 1024);

define('SESSION_NAME', 'wdlk_secure_session');
define('SESSION_LIFETIME', 7200); // 2 hours

// Payment gateway placeholders. Add real credentials from your payment provider.
define('PAYMENT_GATEWAY_MODE', 'sandbox');
define('PAYMENT_MERCHANT_ID', 'CHANGE_MERCHANT_ID');
define('PAYMENT_SECRET', 'CHANGE_SECRET');
define('PAYMENT_RETURN_URL', APP_URL . '/payment-success.php');
define('PAYMENT_NOTIFY_URL', APP_URL . '/backend/api/payment-webhook.php');

// Notification sender.
define('MAIL_FROM', 'no-reply@webdeveloper.lk');
define('ADMIN_EMAIL', 'admin@webdeveloper.lk');
