<?php
header("Content-Type: application/json");
require "db.php";

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)) {
    echo json_encode([
        "success" => false,
        "message" => "Email ve şifre zorunludur."
    ]);
    exit;
}

$email = $conn->real_escape_string($data->email);
$password = $conn->real_escape_string($data->password);

// Aynı e-posta ile daha önce kayıt olmuş mu?
$check = $conn->query("SELECT id FROM users WHERE email = '$email'");
if ($check->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Bu email zaten kayıtlı."
    ]);
    exit;
}

// Yeni kullanıcıyı ekle
$sql = "INSERT INTO users (email, password) VALUES ('$email', '$password')";
if ($conn->query($sql)) {
    $user_id = $conn->insert_id;
    echo json_encode([
        "success" => true,
        "message" => "Kayıt başarılı.",
        "user_id" => $user_id
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Kayıt başarısız. Lütfen tekrar deneyin."
    ]);
}
?>
