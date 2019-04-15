<?php
session_start();

require_once "config.php";
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

$tilkobling = mysqli_connect("mysql.hostinger.com", "u201393012_cr", "1EjjQpVKmAMa", "u201393012_cr");

if (!$tilkobling->set_charset("utf8")) {
    printf("", $tilkobling->error);
} else {
    printf("", $tilkobling->character_set_name());
}

$seUser = $_SESSION["username"];
$seBrukerID = $_SESSION["id"];

$sql = sprintf("UPDATE users SET theme='%s' WHERE id=%s",
    $tilkobling->real_escape_string($_GET["theme"]),
    $tilkobling->real_escape_string($seBrukerID)
);
$tilkobling->query($sql);
?>
<!DOCTYPE html>
<html>
<html land="en">
<head>
  <meta charset="UTF-8">
  <title>Casino Royale | Update Settings</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
</head>
<body>

</body>
</html>
