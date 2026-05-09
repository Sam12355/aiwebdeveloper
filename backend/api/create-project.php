<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';
require_login();

$data = input_json();
$invoice = 'WD-' . date('ymd') . '-' . random_int(1000, 9999);

$stmt = db()->prepare("INSERT INTO projects
(user_id, invoice_no, business_type, business_name, business_description, main_services, page_count, business_model, website_path, theme_name, theme_category, theme_image, status, stage)
VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
$stmt->execute([
    $_SESSION['user_id'],
    $invoice,
    $data['businessType'] ?? '',
    $data['businessName'] ?? '',
    $data['businessDescription'] ?? '',
    $data['mainServices'] ?? '',
    $data['pageCount'] ?? '',
    $data['businessModel'] ?? '',
    $data['websitePath'] ?? '',
    $data['themeName'] ?? '',
    $data['themeCategory'] ?? '',
    $data['themeImage'] ?? '',
    'Lead',
    'lead'
]);

json_response(['success' => true, 'projectId' => db()->lastInsertId(), 'invoiceNo' => $invoice]);
