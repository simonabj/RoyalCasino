<?php
session_start();

require_once "../../0PHP/config.php";
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: .0PHP/login.php");
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title> Casino Royale - Roulette </title>
    <link rel="icon" href="../../resources/redChip.png">

    <script src="../../0JS/jquery-3.3.1.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

    <script src="../../0JS/RoyaleSubsystem.js"></script>
    <script src="../../0JS/juliansUtilitiesLib.js"></script>
    <link href="../../0CSS/universal.css" rel="stylesheet">
    <link href="../../0CSS/classes.css" rel="stylesheet">

    <link href="roulette.css" rel="stylesheet">
    <script src="roulette.js"></script>

    <script src="universal_menu.js"></script>
    <link href="universal_menu.css" rel="stylesheet">

    <style>

    </style>
</head>
<body>


<div id="rmh" class="container">

        <img id="rmh_handle" src="../../resources/redChip.png">

        <div id="rmh_bar">

            <div class="pointer rmh_item">
                <h1 onclick="window.location.href='../../hub/index.php'">🏠</h1>
            </div>

            <div class="rmh_item" id="rmh_tokenCountItem">
                <div class="container row">
                    <img src="../../resources/redChip.png" alt="token" class="rmh_token">
                    <p id="rmh_tokenCount"> x 400</p>
                    <script> document.getElementById("tokenCount").innerHTML = "x "+getUser().tokenManager.getCount(); </script>
                </div>
                <button class="retroButton" onclick="">get more</button>
            </div>

        </div>
    </div>



<div id="documentWrapper">

</div> <!-- end of document wrapper -->
</body>
</html>

