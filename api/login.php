<?php
header("Content-Type: application/json");
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

$query = "SELECT id FROM users WHERE email='$email' AND password='$password'";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode([
        "success" => true,
        "message" => "Giriş başarılı.",
        "user_id" => $row["id"]
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Geçersiz email veya şifre."
    ]);
}
?>
