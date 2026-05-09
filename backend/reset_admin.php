<?php
require_once __DIR__ . '/config.php';

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    $username = 'admin';
    $password = 'password';
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("UPDATE users SET password_hash = ? WHERE username = ?");
    $stmt->execute([$password_hash, $username]);

    echo "SUCCESS: Admin password updated! <br>";
    echo "Username: <b>admin</b> <br>";
    echo "Password: <b>password</b>";

} catch (PDOException $e) {
    echo "FAILURE: " . $e->getMessage();
}
?>
