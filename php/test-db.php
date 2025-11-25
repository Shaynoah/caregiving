<?php
/**
 * Test DB connection. Temporary file for debugging on Hostinger.
 * Usage: https://carebridgekenya.com/php/test-db.php
 * IMPORTANT: Remove this file after debugging.
 */

require_once 'config.php';

header('Content-Type: application/json');

$result = [
    'success' => false,
    'message' => ''
];

if (!isset($conn) || !($conn instanceof mysqli)) {
    $result['message'] = 'No DB connection object available.';
    error_log('test-db: $conn not set');
    echo json_encode($result);
    exit;
}

if ($conn->connect_error) {
    $result['message'] = 'DB connection failed.';
    $result['error'] = $conn->connect_error;
    error_log('test-db: ' . $conn->connect_error);
    echo json_encode($result);
    exit;
}

if ($res = $conn->query('SELECT 1')) {
    $result['success'] = true;
    $result['message'] = 'DB connection OK';
    $result['server_info'] = $conn->server_info;
    $res->close();
} else {
    $result['message'] = 'Query failed';
    $result['error'] = $conn->error;
    error_log('test-db query error: ' . $conn->error);
}

echo json_encode($result);

$conn->close();
?>
