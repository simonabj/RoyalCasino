<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title> Roulette | Casino Royale</title>
    <link rel="icon" href="../../resources/redChip.png">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>

    <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet">

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
        <h1 class="title">Roulette</h1>
        <div class="space"></div>
        <div class="space"></div>
        <div class="space"></div>
        <div id="rouletteWheelBorder_Outer">
            <div id="rouletteWheelBorder_Inner"> <!-- not rotating -->
                <div id="rouletteWheel"> <!-- rotating -->
                    <div id="rouletteWheelCover"></div>
                </div>

                <div id="ballDiv" class=""> <!-- rotating -->
                    <div id="ball" class="ball"></div>
                </div>

                <div id="bettingAlert"><h3>yet</h3></div>

            </div>
        </div>

        <div class="container">
            <input id="whatNumbers" type="text"> <span><p>What numbers will you bet on? Separate with commas.<br>
                    (Remember, the fewer you bet on, the more you win)</p></span>
            <input id="howMuch" type="number"> <span><p>You have <span id="tokenCount">501</span> tokens, how many will you bet?</p></span>
            <script>$(function(){if(affectUser){document.getElementById("tokenCount").innerHTML = getUser().tokenManager.getCount();}})</script>
            <button id="spinBtn" class="retroButton">Spin the wheel!</button>
        </div>

    </div>

    <div id="winningAlert" class="smoothEdges"> <h1></h1> </div>




</div> <!-- end of document wrapper -->
<script>
    affectUser = false;
    $(function () {
        if(affectUser) init_royale();
        setTimeout(function(){rmh_openAfter(3);},250);

    });
</script>
</body>
</html>

