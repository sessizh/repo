<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");

include "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = isset($_POST["email"]) ? $_POST["email"] : "";
    $password = isset($_POST["password"]) ? $_POST["password"] : "";

    if ($email && $password) {
        $sql = "SELECT id, username, password FROM users WHERE email = '$email'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if (password_verify($password, $row["password"])) {
                echo json_encode(["message" => "Giriş başarılı", "user_id" => $row["id"], "username" => $row["username"]]);
            } else {
                echo json_encode(["error" => "Şifre yanlış"]);
            }
        } else {
            echo json_encode(["error" => "Kullanıcı bulunamadı"]);
        }
    } else {
        echo json_encode(["error" => "Lütfen tüm alanları doldurun"]);
    }
} else {
    echo json_encode(["error" => "Bu sayfa sadece POST isteği alır"]);
}
?>