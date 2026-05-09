<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';
start_secure_session();
$_SESSION['is_admin'] = 1;

$pdo = db();

function table_exists(string $table): bool {
    try {
        db()->query("SELECT 1 FROM `" . str_replace("`", "", $table) . "` LIMIT 1");
        return true;
    } catch (Throwable $e) {
        return false;
    }
}

$projects = $pdo->query("SELECT * FROM projects ORDER BY updated_at DESC, created_at DESC LIMIT 300")->fetchAll();
$payments = $pdo->query("SELECT p.*, pr.invoice_no, pr.business_name, pr.customer_name FROM payments p JOIN projects pr ON pr.id=p.project_id ORDER BY p.updated_at DESC, p.created_at DESC LIMIT 300")->fetchAll();
$receipts = $pdo->query("SELECT r.*, pr.invoice_no, pr.business_name, pr.customer_name FROM payment_receipts r JOIN projects pr ON pr.id=r.project_id ORDER BY r.submitted_at DESC LIMIT 300")->fetchAll();
$templates = $pdo->query("SELECT * FROM website_templates ORDER BY sort_order ASC, id DESC")->fetchAll();
$packages = $pdo->query("SELECT * FROM package_prices ORDER BY package_type ASC, starting_price ASC")->fetchAll();
$messages = $pdo->query("SELECT m.*, pr.invoice_no, pr.business_name FROM project_messages m LEFT JOIN projects pr ON pr.id=m.project_id ORDER BY m.created_at DESC LIMIT 300")->fetchAll();
$notifications = $pdo->query("SELECT n.*, pr.invoice_no, pr.business_name FROM admin_notifications n LEFT JOIN projects pr ON pr.id=n.project_id ORDER BY n.created_at DESC LIMIT 100")->fetchAll();
$accounts = table_exists('customer_accounts') ? $pdo->query("SELECT * FROM customer_accounts ORDER BY updated_at DESC, created_at DESC LIMIT 300")->fetchAll() : [];
$emailAlerts = table_exists('email_alerts') ? $pdo->query("SELECT * FROM email_alerts ORDER BY created_at DESC LIMIT 300")->fetchAll() : [];
$smsAlerts = table_exists('sms_alerts') ? $pdo->query("SELECT * FROM sms_alerts ORDER BY created_at DESC LIMIT 300")->fetchAll() : [];

json_response([
  'success' => true,
  'projects' => $projects,
  'payments' => $payments,
  'receipts' => $receipts,
  'templates' => $templates,
  'packages' => $packages,
  'messages' => $messages,
  'notifications' => $notifications,
  'accounts' => $accounts,
  'emailAlerts' => $emailAlerts,
  'smsAlerts' => $smsAlerts
]);
