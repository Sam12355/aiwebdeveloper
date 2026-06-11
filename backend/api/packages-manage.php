<?php
declare(strict_types=1);
require_once __DIR__ . '/../security.php';
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../session.php';

$data = input_json();
$action = $data['action'] ?? ($_SERVER['REQUEST_METHOD'] === 'POST' ? 'save' : 'list');

// Writes require admin; reads (list) are public so customer pages can sync pricing
if (in_array($action, ['save', 'delete'], true)) {
    start_secure_session();
    if (empty($_SESSION['is_admin'])) {
        json_response(['success' => false, 'message' => 'Admin access required'], 403);
    }
}

function pkg_value(array $data, string $key, string $default = ''): string {
    return isset($data[$key]) ? trim((string)$data[$key]) : $default;
}

$pdo = db();

/**
 * Add V54 columns if an older database is used.
 */
try {
    $pdo->query("ALTER TABLE package_prices ADD COLUMN details TEXT NULL");
} catch (Throwable $e) {}
try {
    $pdo->query("ALTER TABLE package_prices ADD COLUMN sort_order INT DEFAULT 0");
} catch (Throwable $e) {}

if ($action === 'delete') {
    $key = pkg_value($data, 'packageKey');
    if ($key === '') $key = pkg_value($data, 'id');
    if ($key !== '') {
        $stmt = $pdo->prepare("DELETE FROM package_prices WHERE package_key = ?");
        $stmt->execute([$key]);
    }
    json_response(['success' => true, 'deleted' => $key]);
}

if ($action === 'save') {
    $type = pkg_value($data, 'packageType', 'Standard Business web design');
    $name = pkg_value($data, 'packageName', 'Starter');
    $key = pkg_value($data, 'packageKey');
    if ($key === '') {
        $key = strtolower(preg_replace('/[^a-z0-9]+/i','-', $type . '-' . $name));
    }

    $stmt = $pdo->prepare("INSERT INTO package_prices
      (package_key,package_type,package_name,starting_price,pages,hosting,email_accounts,details,status,sort_order)
      VALUES (?,?,?,?,?,?,?,?,?,?)
      ON DUPLICATE KEY UPDATE
        package_type=VALUES(package_type),
        package_name=VALUES(package_name),
        starting_price=VALUES(starting_price),
        pages=VALUES(pages),
        hosting=VALUES(hosting),
        email_accounts=VALUES(email_accounts),
        details=VALUES(details),
        status=VALUES(status),
        sort_order=VALUES(sort_order),
        updated_at=NOW()");
    $stmt->execute([
      $key,
      $type,
      $name,
      (float)($data['startingPrice'] ?? $data['price'] ?? 0),
      pkg_value($data, 'pages'),
      pkg_value($data, 'hosting'),
      pkg_value($data, 'emailAccounts', pkg_value($data, 'emails')),
      pkg_value($data, 'details', pkg_value($data, 'description')),
      pkg_value($data, 'status', 'Active'),
      (int)($data['sortOrder'] ?? $data['sort_order'] ?? 0)
    ]);
}

$rows = $pdo->query("SELECT
  package_key,
  package_type,
  package_name,
  starting_price,
  pages,
  hosting,
  email_accounts,
  details,
  status,
  sort_order,
  created_at,
  updated_at
  FROM package_prices
  ORDER BY sort_order ASC, package_type ASC, starting_price ASC")->fetchAll();

json_response(['success'=>true, 'packages'=>$rows]);
