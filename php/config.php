<?php
// Enable error reporting in development, disable in production
if ($_SERVER['SERVER_NAME'] === 'localhost') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Database configuration - Change these for Hostinger
$db_host = 'localhost';     // Usually 'localhost' on Hostinger
$db_user = 'root';         // Your Hostinger database username
$db_pass = '';             // Your Hostinger database password
$db_name = 'carebridge';   // Your Hostinger database name

// Create database connection
try {
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

    // Check connection
    if ($conn->connect_error) {
        error_log("Database connection failed: " . $conn->connect_error);
        throw new Exception('Database connection failed');
    }
} catch (Exception $e) {
    header('Content-Type: application/json');
    die(json_encode([
        'success' => false,
        'message' => 'Service temporarily unavailable'
    ]));
}
?>
