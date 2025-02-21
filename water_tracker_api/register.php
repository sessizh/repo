<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");

include "config.php";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $username = isset($data["username"]) ? $data["username"] : "";
    $email = isset($data["email"]) ? $data["email"] : "";
    $password = isset($data["password"]) ? password_hash($data["password"], PASSWORD_DEFAULT) : "";

    if ($username && $email && $password) {
        $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Kullanıcı başarıyla kaydedildi"]);
        } else {
            echo json_encode(["error" => "Hata: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Lütfen tüm alanları doldurun"]);
    }
} else {
    echo json_encode(["error" => "Bu sayfa sadece POST isteği alır"]);
}
?>
