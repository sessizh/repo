<?php
header("Content-Type: application/json");
require "db.php";

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(["success" => false, "message" => "Kullanıcı ID gerekli."]);
    exit;
}

$sql = "SELECT amount, created_at FROM water_logs WHERE user_id = $user_id ORDER BY created_at DESC LIMIT 10";
$result = $conn->query($sql);

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = [
        "amount" => $row["amount"],
        "created_at" => $row["created_at"]
    ];
}

echo json_encode(["success" => true, "data" => $data]);
?>
