<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$host = "localhost";
$username = "root";
$password = "";
$database = "contact_db";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["message" => "Database connection failed"]));
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['name']) && !empty($data['email']) && !empty($data['message'])) {
    $name = $conn->real_escape_string($data['name']);
    $email = $conn->real_escape_string($data['email']);
    $message = $conn->real_escape_string($data['message']);

    $sql = "INSERT INTO messages (name, email, message) VALUES ('$name', '$email', '$message')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Message sent successfully!"]);
    } else {
        echo json_encode(["message" => "Failed to send message."]);
    }
} else {
    echo json_encode(["message" => "Invalid input data."]);
}

$conn->close();
?>
