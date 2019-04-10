<?php
session_start();

require_once "config.php";

$tilkobling = mysqli_connect("localhost","u201393012_film","abc123cba","u201393012_film");

if (!$tilkobling->set_charset("utf8")) {
    printf("", $tilkobling->error);
} else {
    printf("", $tilkobling->character_set_name());
}

$seUser = $_SESSION["username"];
$seUserID = $_SESSION["id"];
$IP = $_SERVER['REMOTE_ADDR'];

$ip = $_SERVER['REMOTE_ADDR'];
$details = json_decode(file_get_contents("http://ipinfo.io/{$ip}"));
$country = $details->country;
$region = $details->region;
$city = $details->city;

$iPod    = stripos($_SERVER['HTTP_USER_AGENT'],"iPod");
$iPhone  = stripos($_SERVER['HTTP_USER_AGENT'],"iPhone");
$iPad    = stripos($_SERVER['HTTP_USER_AGENT'],"iPad");
$Android = stripos($_SERVER['HTTP_USER_AGENT'],"Android");
$NokiaSymbian = stripos($_SERVER['HTTP_USER_AGENT'],"NokiaSymbian");
$BlackBerry9down = stripos($_SERVER['HTTP_USER_AGENT'],"BlackBerry9down");
$BlackBerry10 = stripos($_SERVER['HTTP_USER_AGENT'],"BlackBerry10");

if ($iPod) {
    $deviceUsed = 'iPod';
} else if ($iPhone) {
    $deviceUsed = 'iPhone';
} else if ($iPad) {
    $deviceUsed = 'iPad';
} else if ($Android) {
    $deviceUsed = 'Android';
} else if ($NokiaSymbian) {
    $deviceUsed = 'Nokia';
} else if ($BlackBerry9down || $BlackBerry10) {
    $deviceUsed = 'BlackBerry';
} else {
    $deviceUsed = 'Computer';
}

$browser = $_SERVER['HTTP_USER_AGENT'];

$sql = sprintf("INSERT INTO userLogin(IP, userLogged, countryConnection, regionConnection, cityConnection, device, browser) VALUES('%s','%s','%s','%s','%s','%s','%s')",
        $tilkobling->real_escape_string($IP),
        $tilkobling->real_escape_string($seUserID),
        $tilkobling->real_escape_string($country),
        $tilkobling->real_escape_string($region),
        $tilkobling->real_escape_string($city),
        $tilkobling->real_escape_string($deviceUsed),
        $tilkobling->real_escape_string($browser)
        );
$tilkobling->query($sql);

header('Location: hub/index.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CASINO ROYALE | SECURE PROFILE</title>
</head>
<body>
    
</body>
</html>
