<?php
// Include database configuration
require_once 'config.php';

// Create contacts table if it doesn't exist
$sql = "CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

try {
    if ($conn->query($sql)) {
        echo "Contacts table created successfully\n";
    } else {
        throw new Exception($conn->error);
    }
} catch (Exception $e) {
    die("Error creating table: " . $e->getMessage() . "\n");
}

$conn->close();
?>
