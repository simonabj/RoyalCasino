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

    <script src="../../0JS/RoyaleSubsystem.js"></script>
    <link href="../../0CSS/universal.css" rel="stylesheet">
    <link href="../../0CSS/classes.css" rel="stylesheet">

    <script src="../../0JS/universal_menu.js"></script>
    <link href="../../0CSS/universal_menu.css" rel="stylesheet">

    <link href="roulette.css" rel="stylesheet">
    <script src="roulette.js"></script>

    <style>

    </style>
</head>
<body>
<div id="documentWrapper">

    <div id="table">
    <button id="spinBtn" class="fancyButtonSecondary">Spin!</button>
        <div id="rouletteWheelBorder_Outer">
            <div id="rouletteWheelBorder_Inner"> <!-- not rotating -->

                <div id="rouletteWheel">

                    <div id="rouletteWheelCover"></div>

                </div> <!-- rotating -->


                <div id="ballDiv" class=""> <!-- rotating -->
                    <div id="ball"></div>
                </div>

            </div>
        </div>
    </div>




</div> <!-- end of document wrapper -->
<script>
    $(function(){

    });
</script>
</body>
</html>

