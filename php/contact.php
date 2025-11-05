<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set error log file
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/debug.log');

// Log the request
error_log("Request received from: " . $_SERVER['HTTP_ORIGIN'] ?? 'Unknown origin');
error_log("Request method: " . $_SERVER['REQUEST_METHOD']);

// Enable CORS for all origins in development
$allowed_origins = array(
    'http://localhost',
    'http://127.0.0.1',
    'http://localhost:5500',
    'http://127.0.0.1:5500'
);

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $origin);
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    error_log("Handling OPTIONS request");
    http_response_code(200);
    exit();
}

// Only allow POST method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error_log("Invalid method: " . $_SERVER['REQUEST_METHOD']);
    http_response_code(405);
    die(json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]));
}

// Include database configuration
require_once 'config.php';

// Get POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

error_log("Received data: " . print_r($data, true));

// Validate required fields
$required = ['name', 'email', 'phone', 'service', 'message'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        die(json_encode([
            'success' => false,
            'message' => "Missing required field: $field"
        ]));
    }
}

// Sanitize input
$name = $conn->real_escape_string($data['name']);
$email = $conn->real_escape_string($data['email']);
$phone = $conn->real_escape_string($data['phone']);
$service_type = $conn->real_escape_string($data['service']); // Will be saved as service_type in DB
$message = $conn->real_escape_string($data['message']);

// Insert into database
$sql = "INSERT INTO contacts (name, email, phone, service_type, message) 
        VALUES ('$name', '$email', '$phone', '$service_type', '$message')";

try {
    if ($conn->query($sql)) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your message has been sent successfully.'
        ]);
    } else {
        throw new Exception($conn->error);
    }
} catch (Exception $e) {
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to save your message. Please try again.'
    ]);
}

$conn->close();
?>
