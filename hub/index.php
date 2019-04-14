<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title> Casino Royale Hub </title>
    <link rel="icon" href="https://cdn2.iconfinder.com/data/icons/interface-part-1/32/html-code-512.png">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

    <script src="../0JS/juliansUtilitiesLib.js"></script>
    <link href="../0CSS/classes.css" rel="stylesheet">

    <link href="hub.css" rel="stylesheet">
    <script src="hub.js"></script>
</head>
<body>
<script src="../0JS/RoyaleSubsystem.js"></script>

<!-- INIT SUBSYSTEM -->
<script>
    let userName = "<?php echo $_SESSION["username"]?>";
    let userMail = "<?php echo $_SESSION["mail"] ?>";
    let isLoggedIn = "<?php echo $_SESSION["loggedin"]?>";
    let user = new User(userName, userMail, isLoggedIn);
    window.onload = () => sessionStorage.setItem("casinoUser", user);
</script>

<!--<div class="container row centerCross centerMain" style="z-index: 1; height: 50px; width:100vw; top: 10px; position: fixed;">
    <button class="secondary square">1</button>
    <button class="secondary square">2</button>
    <button class="secondary square">3</button>
    <button class="secondary square">4</button>
</div>-->
<header style="position: fixed; z-index: 5;">
    <div class="column container div">
        <div class="titleDiv shape-bat blackText div" style="border-radius: 0; min-height: 50px; top: 10px;">
            <h1>
                Casino Royale!
            </h1>
        </div>

        <span class="bordershape-diamond" style="border-bottom-color: var(--secondary); display: flex; top: 75px"></span>
        <!-- alternative: when scrolling, turns into a triangle pointing up. clicking it returns the user to the top of the page. -->
        <!-- TODO: når diamond vises, kan den trykkes på (scale(1.1) on hover & 1.2@click). Da skyter toolbar menyen ut fra begge sider av den.
                To tabs til venstre, og to til høyre, og når man scroller dem vekk eller trykker på diamanten igjen så glir de tilbake inn i diamanten og skjules,
                og diamanten spiller av en liten animasjon mens den mottar tabs'ene, satisfying qubic-bezier rotateX/Y spin(ning til de er inne).-->
    </div>

</header>
<div id="documentWrapper" class="container column" style="margin-top: 250px">




    <div id="gamesContainer"></div>






<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>
<div class="space"></div>


</div> <!-- end of document wrapper -->
</body>
</html>
