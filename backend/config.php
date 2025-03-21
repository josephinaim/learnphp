<?php
$host = "localhost";
$dbname = "blog_db";
$username = "root";
$password = "password";


try {
    // Create a PDO instance
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
} catch (PDOException $e) {
    // Handle connection errors
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
}
?>
