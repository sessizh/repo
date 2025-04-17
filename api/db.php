<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "water_tracker_db";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Veritabanına bağlanılamadı."]));
}
?>
