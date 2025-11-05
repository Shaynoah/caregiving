<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Basic response
echo json_encode([
    'status' => 'success',
    'message' => 'PHP endpoint is working',
    'server' => $_SERVER['SERVER_SOFTWARE'],
    'php_version' => phpversion(),
    'request_method' => $_SERVER['REQUEST_METHOD'],
    'request_uri' => $_SERVER['REQUEST_URI']
]);
?>