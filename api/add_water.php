<?php
header("Content-Type: application/json");
require "db.php";

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->user_id) || !isset($data->amount)) {
    echo json_encode([
        "success" => false,
        "message" => "Kullanıcı ID ve su miktarı gereklidir."
    ]);
    exit;
}

$user_id = (int)$data->user_id;
$amount = (int)$data->amount;

if ($user_id <= 0 || $amount <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Geçersiz kullanıcı ID veya miktar."
    ]);
    exit;
}

$sql = "INSERT INTO water_logs (user_id, amount, created_at) VALUES ($user_id, $amount, NOW())";
if ($conn->query($sql)) {
    echo json_encode([
        "success" => true,
        "message" => "Su başarıyla eklendi."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Veritabanı hatası: " . $conn->error
    ]);
}
?>
