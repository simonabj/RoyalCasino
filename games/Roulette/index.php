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

                <div id="bettingAlert"><h3></h3></div>

            </div>
        </div>

        <div class="container">
            <input id="whatNumbers" type="text">
            <div class="container"><p>What numbers will you bet on? Separate with commas, up to 18.</p>
                <p class="smallText">(Remember, the fewer you bet on, the more you'll gain)</p>
                <p class="smallText">(But the more numbers you bet on, the more often you'll win.)</p>
            </div>
            <input id="howMuch" type="number"> <span><p>You have <span id="tokenCount">501</span> tokens, how many will you bet?</p></span>
            <script>$(function () {if (affectUser) document.getElementById("tokenCount").innerHTML = getUser().tokenManager.getCount();})</script>
            <button id="spinBtn" class="retroButton">Spin the wheel!</button>
            <div class="space"></div>
            <div class="space"></div>


        </div>
    </div>

    <div id="cheatModeDiv" class="opaqueOnHover50 black whiteText">
        <img src="http://www.stickpng.com/assets/images/588a64d8d06f6719692a2d0f.png" alt="">
        <div class="row container">
            <p>Practice mode</p>
            <label class="toggle">
                <input type="checkbox" id="practiceModeToggle"/>
                <span class="slider"></span>
            </label>
        </div>
        <p id="practiceModeTip" class="smallText">When enabled, you won't lose or gain any tokens.</p>
    </div>

    <div id="winningAlert" class="smoothEdges"><h1></h1></div>




</div> <!-- end of document wrapper -->
<script>
    $(function () {
        if (affectUser) init_royale();
        setTimeout(function(){rmh_openAfter(2);},1000);

    });
</script>
</body>
</html>

