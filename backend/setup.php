<?php
declare(strict_types=1);
require_once __DIR__ . '/config.php';

$steps = [];
$errors = [];

function step(string $msg): void { global $steps; $steps[] = $msg; }
function fail(string $msg): void { global $errors; $errors[] = $msg; }

// 1. Connect without selecting a database
$pdo = null;
try {
    $dsn = 'mysql:host=' . DB_HOST . ';charset=utf8mb4';
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    step('Connected to MySQL server at ' . DB_HOST . '.');
} catch (PDOException $e) {
    fail('Cannot connect to MySQL: ' . $e->getMessage());
}

// 2. Create database
if ($pdo && empty($errors)) {
    try {
        $pdo->exec("CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        $pdo->exec("USE `" . DB_NAME . "`");
        step("Database `" . DB_NAME . "` created or already exists.");
    } catch (PDOException $e) {
        fail('Failed to create/select database: ' . $e->getMessage());
    }
}

// 3. Run schema.sql
if ($pdo && empty($errors)) {
    $schemaFile = __DIR__ . '/schema.sql';
    if (!file_exists($schemaFile)) {
        fail('schema.sql not found at ' . $schemaFile);
    } else {
        $sql = file_get_contents($schemaFile);
        // Split by semicolons, filter empty lines and comment-only blocks
        $statements = array_filter(
            array_map('trim', explode(';', $sql)),
            fn($s) => strlen($s) > 5 && !preg_match('/^--/', $s)
        );
        $ok = 0;
        $skipped = 0;
        foreach ($statements as $stmt) {
            // Skip SET statements (they require special handling)
            if (preg_match('/^SET\s/i', $stmt)) { $skipped++; continue; }
            try {
                $pdo->exec($stmt);
                $ok++;
            } catch (PDOException $e) {
                $code = (string)$e->getCode();
                // 42S21 = column exists, 42000 duplicate key on INSERT IGNORE = ok
                if (in_array($code, ['42S21', '23000'])) { $skipped++; continue; }
                fail('Schema error: ' . $e->getMessage() . ' [stmt: ' . substr($stmt, 0, 100) . ']');
            }
        }
        step("Schema applied: {$ok} statements executed, {$skipped} skipped (already exist).");
    }
}

// 4. Create uploads directory
if (empty($errors)) {
    $uploadsDir = __DIR__ . '/uploads/';
    if (!is_dir($uploadsDir)) {
        mkdir($uploadsDir, 0755, true);
        // Protect the directory
        file_put_contents($uploadsDir . '.htaccess', "Options -Indexes\nphp_flag engine off\n");
        step('Created backend/uploads/ directory.');
    } else {
        step('backend/uploads/ directory already exists.');
    }
}

// 5. Create api directory
if (empty($errors)) {
    $apiDir = __DIR__ . '/api/';
    if (!is_dir($apiDir)) {
        mkdir($apiDir, 0755, true);
        step('Created backend/api/ directory.');
    }
    $apiAdminDir = __DIR__ . '/api/admin/';
    if (!is_dir($apiAdminDir)) {
        mkdir($apiAdminDir, 0755, true);
        step('Created backend/api/admin/ directory.');
    }
}

// 6. Verify tables exist
if ($pdo && empty($errors)) {
    try {
        $pdo->exec("USE `" . DB_NAME . "`");
        $result = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
        step('Tables in database: ' . implode(', ', $result));
    } catch (PDOException $e) {
        fail('Could not list tables: ' . $e->getMessage());
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Database Setup | Webdeveloper.lk</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',sans-serif;background:#f0f4ff;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:40px 20px}
    .card{background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(13,31,89,.10);padding:40px;width:100%;max-width:720px}
    h1{font-size:22px;font-weight:800;color:#081339;margin-bottom:4px}
    .sub{font-size:13px;color:#5a6886;margin-bottom:24px}
    .step{display:flex;align-items:flex-start;gap:10px;background:#f4fff8;border:1px solid #b6f0cc;border-radius:10px;padding:12px 14px;margin-bottom:10px;font-size:14px;color:#1a5c38}
    .step .icon{font-size:16px;margin-top:1px;flex-shrink:0}
    .error{background:#fff4f4;border-color:#ffc5c5;color:#c22}
    .summary{margin-top:20px;padding:16px;border-radius:12px;font-size:15px;font-weight:700;text-align:center}
    .summary.ok{background:#eafff2;color:#1a5c38}
    .summary.fail{background:#fff0f0;color:#c22}
    .actions{margin-top:24px;display:flex;gap:12px;flex-wrap:wrap}
    .btn{padding:12px 22px;border-radius:12px;text-decoration:none;font-size:14px;font-weight:700;border:none;cursor:pointer}
    .btn-primary{background:linear-gradient(135deg,#1d5cff,#0b42d8);color:#fff}
    .btn-outline{background:#fff;color:#1d5cff;border:2px solid #c8d8ff}
  </style>
</head>
<body>
<div class="card">
  <h1>Webdeveloper.lk — Database Setup</h1>
  <p class="sub">Run once to create the MySQL database and tables. Safe to re-run.</p>

  <?php foreach ($steps as $s): ?>
    <div class="step"><span class="icon">✓</span><span><?= htmlspecialchars($s) ?></span></div>
  <?php endforeach; ?>
  <?php foreach ($errors as $e): ?>
    <div class="step error"><span class="icon">✗</span><span><?= htmlspecialchars($e) ?></span></div>
  <?php endforeach; ?>

  <?php if (empty($errors)): ?>
    <div class="summary ok">✓ Setup complete! Database is ready.</div>
    <div class="actions">
      <a href="../index.php" class="btn btn-primary">Go to Homepage</a>
      <a href="../admin-dashboard.php" class="btn btn-outline">Open Admin Dashboard</a>
      <a href="test_conn.php" class="btn btn-outline">Test Connection</a>
    </div>
  <?php else: ?>
    <div class="summary fail">✗ Setup had errors. Fix the issues above and refresh this page.</div>
  <?php endif; ?>
</div>
</body>
</html>
