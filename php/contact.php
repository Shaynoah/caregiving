<?php
require_once 'config.php';

// CORS: Allow the site's origin or localhost for testing (add domains as needed)
$allowed_origins = [
    'https://carebridgekenya.com',
    'https://www.carebridgekenya.com',
    'http://localhost',
    'http://127.0.0.1'
];
if (isset($_SERVER['HTTP_ORIGIN'])) {
    $origin = $_SERVER['HTTP_ORIGIN'];
    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: " . $origin);
    }
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]));
}

// Get POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

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
$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$service_type = $data['service'];
$message = $data['message'];

// Use prepared statement to insert safely
$stmt = $conn->prepare(
    "INSERT INTO contacts (name, email, phone, service_type, message) VALUES (?, ?, ?, ?, ?)"
);

if (!$stmt) {
    die(json_encode([
        'success' => false,
        'message' => 'Prepare failed: ' . $conn->error
    ]));
}

// Bind parameters and execute
$stmt->bind_param("sssss", $name, $email, $phone, $service_type, $message);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully.'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to save your message: ' . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
