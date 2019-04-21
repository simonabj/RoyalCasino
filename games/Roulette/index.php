<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title> Roulette | Casino Royale</title>
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
    <!--<button id="spinBtn" class="fancyButtonSecondary">Spin!</button>-->
        <div id="rouletteWheelBorder_Outer">
            <div id="rouletteWheelBorder_Inner"> <!-- not rotating -->
                <div id="rouletteWheel"> <!-- rotating -->
                    <div id="rouletteWheelCover"></div>
                </div>

                <div id="ballDiv" class=""> <!-- rotating -->
                    <div id="ball"></div>
                </div>
            </div>
        </div>

        <div class="container">
            <input id="whatNumbers" type="text"> <span><p>What number will you bet on? Separate with commas. (Remember, the fewer you bet on, the more you win)</p></span>
            <input id="howMuch" type="number"> <span><p>How much will you bet?</p></span>
            <button id="spinBtn" class="retroButton">Spin the roulette</button>
        </div>

    </div>





</div> <!-- end of document wrapper -->
<script>
    $(function(){
        init_royale();
        //rmh_openAfter(2);



    });        
</script>
</body>
</html>

