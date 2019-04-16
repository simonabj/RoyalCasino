<?php
session_start(); /*Start Session*/

require_once "config.php"; /*Hent konfigurasjonsfilen*/

/*Ta en sjekk på om brukeren er logget inn, hvis ikke skal brukeren tas til login siden*/
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

/*Sette siden til utf8*/
if (!$link->set_charset("utf8")) {
    printf($link->error, "");
} else {
    printf($link->character_set_name(), "");
}

/*Definere session variablene til lettere bruk senere i filen*/
$seUser = $_SESSION["username"];
$seBrukerID = $_SESSION["id"];
$seMail = $_SESSION["mail"];

/*Generering av et 6 tegn langt passord*/
$new_password = "";
$length = 6;
$characters = array_merge(range('A','Z'), range('a','z'), range('0','9'));
$max = count($characters) - 1;
for ($i = 0; $i < $length; $i++) {
	$rand = mt_rand(0, $max);
	$new_password .= $characters[$rand];
}

/*Sending av mail om nytt passord*/
ini_set( 'display_errors', 1 );
error_reporting( E_ALL );
$from = "vidrate@rateateachernorway.com";
$to = "$seMail";
$subject = "Casino Royale | Your user has been hacked";
$message = "Hey, $seUser you have just registered that someone else has logged into your profile! Your new password is $new_password. Sorry for the inconvenience. Make sure to change your password after you logged in by going to Settings->Change Password";
$headers = "From:" . $from;
mail($to,$subject,$message, $headers);

/*Kryptering av nytt passord*/
$hashedPassword = password_hash($new_password, PASSWORD_DEFAULT);

/*Spørresetning som setter nytt passord i databasen*/
$sql = sprintf("UPDATE users SET password='%s' WHERE id = '%s'",
  $link->real_escape_string($hashedPassword),
  $link->real_escape_string($seBrukerID)
);
$link->query($sql); /*Utførelse av nytt passord*/

$_SESSION = array();
session_destroy(); /*Ødelegg session så man må logge inn igjen*/
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Casino Royale | User Compromised</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css"> <!-- CSS Eksternt stilark -->
    <link href="stilark.css" rel="stylesheet" type="text/css"> <!-- Lokalt stilark CSS -->
    <style>
        body{
            font: 14px sans-serif;
            text-align: center;
        }
        h1 {
            color: white;
        }
    </style>
</head>
<body>

<!-- Informere brukeren om hva som skjer nå utifra hva som er registrert-->
<h2 style="width:99%; text-align: left; margin-left:auto; margin-right:auto; font-size:20px; color:#337ab7;">Administratorer har nå blitt advart om at noen har logget seg inn på brukeren din, sjekk mailen din for et nytt passord. Husk å endre passordet ditt til et nytt et etter innlogging. (Finner du ikke mailen? Sjekk spam mappen)</a></h2>

</body>
</html>
