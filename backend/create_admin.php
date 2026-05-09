<?php
require_once __DIR__ . '/config.php';

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    $pdo->exec("DELETE FROM users WHERE username = 'admin' OR email = 'admin@webdeveloper.lk'");

    $business_name = 'Webdeveloper Admin';
    $name = 'Admin User';
    $username = 'admin';
    $email = 'admin@webdeveloper.lk';
    $password = 'password'; 
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $is_admin = 1;

    $stmt = $pdo->prepare("INSERT INTO users (business_name, name, username, email, password_hash, is_admin) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$business_name, $name, $username, $email, $password_hash, $is_admin]);

    echo "SUCCESS: Admin user created! <br>";
    echo "Username: <b>admin</b> <br>";
    echo "Password: <b>password</b>";

} catch (PDOException $e) {
    echo "FAILURE: " . $e->getMessage();
}
?>
