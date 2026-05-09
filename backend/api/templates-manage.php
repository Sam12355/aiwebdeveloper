<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';
require_admin();

$data = input_json();
$action = $data['action'] ?? 'list';

if ($action === 'save') {
    $key = trim((string)($data['templateKey'] ?? 'tpl-' . time()));
    $stmt = db()->prepare("INSERT INTO website_templates (template_key,name,category,image,demo_url,status,notes,sort_order)
      VALUES (?,?,?,?,?,?,?,?)
      ON DUPLICATE KEY UPDATE name=VALUES(name), category=VALUES(category), image=VALUES(image), demo_url=VALUES(demo_url), status=VALUES(status), notes=VALUES(notes), sort_order=VALUES(sort_order), updated_at=NOW()");
    $stmt->execute([
      $key,
      trim((string)($data['name'] ?? 'Template')),
      trim((string)($data['category'] ?? 'Business')),
      trim((string)($data['image'] ?? '')),
      trim((string)($data['demoUrl'] ?? '')),
      trim((string)($data['status'] ?? 'Active')),
      trim((string)($data['notes'] ?? '')),
      (int)($data['sortOrder'] ?? 0)
    ]);
}

$rows = db()->query("SELECT * FROM website_templates ORDER BY sort_order ASC, id DESC")->fetchAll();
json_response(['success'=>true, 'templates'=>$rows]);
