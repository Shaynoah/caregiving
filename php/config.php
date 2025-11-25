<?php
// Load .env file
$env_file = __DIR__ . '/.env';
if (!file_exists($env_file)) {
    // Fail early with a neutral message — the real errors are logged on the server
    error_log('.env file missing: ' . $env_file);
    die(json_encode([
        'success' => false,
        'message' => 'Service temporarily unavailable (missing configuration)'
    ]));
}

$config = parse_ini_file($env_file);
if (!$config) {
    error_log('Failed to parse .env file at ' . $env_file);
    die(json_encode([
        'success' => false,
        'message' => 'Service temporarily unavailable (invalid configuration)'
    ]));
}

$db_host = $config['DB_HOST'] ?? '';
$db_user = $config['DB_USER'] ?? '';
$db_pass = $config['DB_PASS'] ?? '';
$db_name = $config['DB_NAME'] ?? '';

// Create database connection
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]));
}
?>
