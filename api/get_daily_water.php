<?php
header("Content-Type: application/json");
require "db.php";

$user_id = isset($_GET["user_id"]) ? intval($_GET["user_id"]) : 0;

if ($user_id <= 0) {
    echo json_encode(["success" => false, "message" => "Geçersiz kullanıcı ID."]);
    exit;
}

$today = date('Y-m-d');

$sql = "SELECT SUM(amount) as total FROM water_logs WHERE user_id = $user_id AND DATE(created_at) = '$today'";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

$total = isset($row['total']) ? (int)$row['total'] : 0;

echo json_encode(["success" => true, "total" => $total]);
?>
