<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include "db.php"; // Include database connection

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['firstName'], $data['lastName'], $data['dob'], $data['gender'], $data['qualification'], $data['mobile'], $data['email'], $data['password'])) {
    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $dob = $data['dob'];
    $gender = $data['gender'];
    $qualification = $data['qualification'];
    $mobile = $data['mobile'];
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT); // Hash password

    $query = $conn->prepare("INSERT INTO users (firstName, lastName, dob, gender, qualification, mobile, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $query->bind_param("ssssssss", $firstName, $lastName, $dob, $gender, $qualification, $mobile, $email, $password);

    if ($query->execute()) {
        echo json_encode(["status" => "success", "message" => "User registered successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Registration failed. Email might be in use."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
}
?>
