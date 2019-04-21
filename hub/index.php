

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title> Casino Royale - Hub </title>
    <link rel="icon" href="../resources/redChip.png">

    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet">
    <!--|Montserrat|Open+Sans|Raleway|Roboto-->
    <script src="../0JS/jquery-3.4.0.min.js"></script>
    <script src="../0JS/RoyaleSubsystem.js"></script>

    <script src="../0JS/oddUtilities.js"></script>
    <link href="../0CSS/classes.css" rel="stylesheet">
    <link href="../0CSS/universal.css" rel="stylesheet">

    <!--<link rel="stylesheet" href="../0CSS/universal_menu.css">
    <script src="../0JS/universal_menu.js">rmh_href = "../0PHP/login.php";</script>-->

    <link href="hub.css" rel="stylesheet">
    <script src="hub.js"></script>
</head>
<body>


<!-- HEADER -->
<span id="headerSpan" class="clipPathShadow">
    <header style="position: fixed; z-index: 5;" class="clipPathShadow">
        <div class="column container div clipPathShadow"></div>
    </header>
</span>
<!-- END OF HEADER -->


<!-- TOOLBAR -->
<div id="toolbarLeft" class="toolbar">
    <div class="toolbarItem">
        <p id="tokenCount">Tokens: 3</p>
        <script> $(function(){setTimeout(function(){document.getElementById("tokenCount").innerText = "Tokens: " + getUser().tokenManager.getCount();}},100) </script>

        <button onclick="/*switch to + material icon, redirecting to money-buying-place*/" class="retroButton" style="background-color: purple; color: yellow; margin: 0 0 4px 15px">BUY</button>
        <!-- todo: redirect til buying place?  eller:når man trykker på "BUY" knappen så vises en meny med fem options til høyre, man trykker på en option for å kjøpe. -->
    </div>
</div>

<div id="toolbarRight" class="toolbar">
    <div id="profileSettings" class="toolbarItem"> <p>Profile Settings</p> </div>
    <div id="logoutButton"> <p>logout</p> </div>
</div>
<!-- END OF TOOLBAR -->


<!-- DOCUMENT WRAPPER -->
<div id="documentWrapper" class="container column" style="margin-top: 325px">


    <!-- HEADER ELEMENTS -->
    <img id="headerSymbol" src="../resources/redChip.png" draggable="false">

    <div id="toolbarTooltip" class="speech-bubble" style="display: none"> <p>Click me to open the toolbar.</p> </div>
    <script> $(function(){if (get("firstTime")){ $("#toolbarTooltip").fadeIn(); $("#headerSymbol")[0].addEventListener("click", function (){$("#toolbarTooltip").hide();});}}); </script>

    <div class="titleDiv shape-bat blackText div" style="border-radius: 0; min-height: 50px; top: 10px;">
        <h1>Casino Royale!</h1>
    </div>
    <!-- END OF HEADER ELEMENTS -->



    <!-- the games -->
    <div id="gamesContainer"></div>



    <!-- text box -->
    <span><br><br><br><br><br><br><br><br></span>
    <div id="framedTextBox" class="whiteFrame whiteText"
            style="width: 600px; background-color: var(--red); transition-duration: 1s">
        <h1>Lorem Ipsum</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. Consequat semper viverra nam
            libero justo laoreet. Et pharetra pharetra massa massa ultricies mi quis hendrerit. Ultrices gravida dictum
            fusce ut. Ipsum consequat nisl vel pretium lectus quam. Aenean et tortor at risus. Risus pretium quam
            vulputate dignissim. Cursus metus aliquam eleifend mi in. Metus dictum at tempor commodo ullamcorper.
            Facilisis sed odio morbi quis commodo odio.</p>
        <p>Interdum velit laoreet id donec ultrices. In mollis nunc sed id semper. Neque vitae tempus quam pellentesque
            nec nam. Venenatis lectus magna fringilla urna porttitor. Turpis massa tincidunt dui ut ornare lectus. Eget
            egestas purus viverra accumsan in nisl nisi scelerisque eu. Consectetur adipiscing elit pellentesque
            habitant morbi tristique senectus et. Quis enim lobortis scelerisque fermentum dui faucibus in ornare quam.
            Morbi blandit cursus risus at ultrices mi tempus imperdiet nulla. Massa tempor nec feugiat nisl pretium
            fusce id velit ut. Porta non pulvinar neque laoreet suspendisse interdum consectetur. Mauris pellentesque
            pulvinar pellentesque habitant morbi tristique senectus. Sed nisi lacus sed viverra tellus in. Orci a
            scelerisque purus semper eget duis at tellus at. Dui id ornare arcu odio ut sem nulla pharetra diam. Nunc
            eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Et pharetra pharetra massa massa ultricies mi.
            Nulla facilisi nullam vehicula ipsum a arcu cursus. Porta lorem mollis aliquam ut porttitor leo a diam
            sollicitudin.</p>
    </div>
    <span><br><br><br><br><br><br><br><br></span>


    <!-- footer -->
    <div id="footer">

        <div class="lowBound">
            <p>CSS by Julian</p>
            <p>Subsystems by Simon B</p>
        </div>

        <div class="column square secondaryVariant">
            <p contenteditable="true"> This is a footer! Isn't it neat? </p>
            <p> ロイヤルカジノ™</p>
        </div>

        <div class="lowBound">
            <p>PHP by Simon L</p>
            <p>Games by everyone</p>
        </div>

    </div>

</div> <!-- end of document wrapper -->
<script>
    init_royale();
</script>
</body>
</html>
