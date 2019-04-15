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
$seMail = $_SESSION["mail"];

$new_password = "";
$length = 6;
$characters = array_merge(range('A','Z'), range('a','z'), range('0','9'));
$max = count($characters) - 1;
for ($i = 0; $i < $length; $i++) {
	$rand = mt_rand(0, $max);
	$new_password .= $characters[$rand];
}

ini_set( 'display_errors', 1 );
error_reporting( E_ALL );
$from = "vidrate@rateateachernorway.com";
$to = "$seMail";
$subject = "Casino Royale | Your user has been hacked";
$message = "Hey, $seUser you have just registered that someone else has logged into your profile! Your new password is $new_password. Sorry for the inconvenience. Make sure to change your password after you logged in by going to Settings->Change Password";
$headers = "From:" . $from;
mail($to,$subject,$message, $headers);

$hashedPassword = password_hash($new_password, PASSWORD_DEFAULT);

$sql = sprintf("UPDATE users SET password='%s' WHERE id = '%s'",
  $tilkobling->real_escape_string($hashedPassword),
  $tilkobling->real_escape_string($seBrukerID)
);
$tilkobling->query($sql);

$_SESSION = array();
session_destroy();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Casino Royale | User Compromised</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <link href="stilark.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <style>
        body{
            font: 14px sans-serif;
            text-align: center;
        }
        h1 {
            color: white;
        }
        .fa, .fas, .far {
            font-weight: 1000;
        }
    </style>
</head>
<body>

<h2 style="width:99%; text-align: left; margin-left:auto; margin-right:auto; font-size:20px; color:#337ab7;">Administratorer har nå blitt advart om at noen har logget seg inn på brukeren din, sjekk mailen din for et nytt passord. Husk å endre passordet ditt til et nytt et etter innlogging. (Finner du ikke mailen? Sjekk spam mappen)</a></h2>

</body>
</html>
