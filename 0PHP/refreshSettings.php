<?php
session_start(); /*Start session*/

require_once "config.php";

/*Hvis man ikke er logget inn led brukeren til login siden*/
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

/*Sett datatype til UTF8 for å kunne bruke Æ, Ø og Å*/
if (!$link->set_charset("utf8")) {
    printf("", $link->error);
} else {
    printf("", $link->character_set_name());
}

/*Hente ut SESSION variablene*/
$seUser = $_SESSION["username"];
$seBrukerID = $_SESSION["id"];

/*Spørresetning for å oppdatere databasen*/
$sql = sprintf("UPDATE users SET theme='%s' WHERE id=%s",
    $link->real_escape_string($_GET["theme"]),
    $link->real_escape_string($seBrukerID)
);
$link->query($sql); /*Kjøre spørringen til databasen og oppdatere den*/
?>
<!DOCTYPE html>
<html>
<html land="en">
<head>
  <meta charset="UTF-8">
  <title>Casino Royale | Update Settings</title>
</head>
<body>

</body>
</html>
