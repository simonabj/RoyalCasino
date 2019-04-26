<?php
session_start(); /*Starte session og hente session stored values*/

require_once "0PHP/config.php"; /*Koble seg til config*/
/*Hvis ikke logget inn*/
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: 0PHP/login.php");
    exit;
}

/*Hvis logget inn*/
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: /hub/");
    exit;
}

?>

<!DOCTYPE html>
<html>
<head>    
    <meta charset="UTF-8"> 
	<title> Casino Royale </title>
    <link rel="icon" href="https://cdn2.iconfinder.com/data/icons/interface-part-1/32/html-code-512.png">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <script src="0JS/RoyaleSubsystem.js"></script>
</head>
<body>
<script>
    init_royale();
    window.location.replace("/0PHP/login.php");
</script>
</body>
</html>
