<?php
header("Content-Type: application/json");
require "db.php";

$data = json_decode(file_get_contents("php://input"));
$email = $data->email ?? null;
$password = $data->password ?? null;

if (!$email || !$password) {
    echo json_encode(["success" => false, "message" => "Email ve şifre zorunludur."]);
    exit;
}

$query = "SELECT id FROM users WHERE email = '$email' AND password = '$password'";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo json_encode(["success" => true, "user_id" => $user["id"]]);
} else {
    echo json_encode(["success" => false, "message" => "Geçersiz email veya şifre."]);
}
?>
