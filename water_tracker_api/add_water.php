<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");

include "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userId = isset($_POST["user_id"]) ? $_POST["user_id"] : "";
    $amount = isset($_POST["amount"]) ? $_POST["amount"] : "";

    if ($userId && $amount) {
        $sql = "INSERT INTO water_intake (user_id, amount, date) VALUES ('$userId', '$amount', NOW())";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Su içme bilgisi kaydedildi"]);
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