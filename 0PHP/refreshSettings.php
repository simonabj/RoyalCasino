<?php
session_start(); /*Start session*/

require_once "config.php";

/*Hvis man ikke er logget inn led brukeren til login siden*/
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

$tilkobling = mysqli_connect("mysql.hostinger.com", "u201393012_cr", "1EjjQpVKmAMa", "u201393012_cr"); /*Database connection*/

/*Sett datatype til UTF8 for å kunne bruke Æ, Ø og Å*/
if (!$tilkobling->set_charset("utf8")) {
    printf("", $tilkobling->error);
} else {
    printf("", $tilkobling->character_set_name());
}

/*Hente ut SESSION variablene*/
$seUser = $_SESSION["username"];
$seBrukerID = $_SESSION["id"];

/*Spørresetning for å oppdatere databasen*/
$sql = sprintf("UPDATE users SET theme='%s' WHERE id=%s",
    $tilkobling->real_escape_string($_GET["theme"]),
    $tilkobling->real_escape_string($seBrukerID)
);
$tilkobling->query($sql); /*Kjøre spørringen til databasen og oppdatere den*/
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
