<?php
session_start(); /*Starte en session for å hente verdiene lagret*/

require_once "config.php"; /*Hente konfigurasjonsbitene*/

$tilkobling = mysqli_connect("mysql.hostinger.com","u201393012_cr","1EjjQpVKmAMa","u201393012_cr"); /*Koble seg til database*/

/*Dobbeltsjekke og mulig endre filtypen til utf8*/
if (!$tilkobling->set_charset("utf8")) {
    printf("", $tilkobling->error);
} else {
    printf("", $tilkobling->character_set_name());
}

/*Definere hvilken bruker som logger inn og iden, også IP'en*/
$seUser = $_SESSION["username"];
$seUserID = $_SESSION["id"];
$IP = $_SERVER['REMOTE_ADDR'];

/*Finne stedet innloggingen skjer fra*/
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

/*Finne ut hvilken enhet man logger seg på med*/
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

/*Lage en spørresetning for å legge til verdiene til databasen*/
$sql = sprintf("INSERT INTO userLogin(IP, userLogged, countryConnection, regionConnection, cityConnection, device, browser) VALUES('%s','%s','%s','%s','%s','%s','%s')",
        $tilkobling->real_escape_string($IP),
        $tilkobling->real_escape_string($seUserID),
        $tilkobling->real_escape_string($country),
        $tilkobling->real_escape_string($region),
        $tilkobling->real_escape_string($city),
        $tilkobling->real_escape_string($deviceUsed),
        $tilkobling->real_escape_string($browser)
        );
$tilkobling->query($sql); /*Oppdatere verdiene til databasen*/

header('Location: ../hub/index.php'); /*Ta deg videre til en indexen*/
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
