<?php
$host = '127.0.0.1';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec("DROP DATABASE IF EXISTS tenuedyali");
    $pdo->exec("CREATE DATABASE tenuedyali");
    echo "Recreated DB tenuedyali";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
