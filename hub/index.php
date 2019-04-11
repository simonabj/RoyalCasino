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

        <span class="bordershape-diamond"
              style="border-bottom-color: var(--secondary); display: flex; top: 75px"></span>
        <!-- alternative: when scrolling, turns into a triangle pointing up. clicking it returns the user to the top of the page. -->
        <!-- TODO: når diamond vises, kan den trykkes på (scale(1.1) on hover & 1.2@click). Da skyter toolbar menyen ut fra begge sider av den.
                To tabs til venstre, og to til høyre, og når man scroller dem vekk eller trykker på diamanten igjen så glir de tilbake inn i diamanten og skjules,
                og diamanten spiller av en liten animasjon mens den mottar tabs'ene, satisfying qubic-bezier rotateX/Y spin(ning til de er inne).-->
    </div>

</header>
<div id="documentWrapper" class="container column" style="margin-top: 325px">


    <div id="gamesContainer"></div>

    <span><br><br><br><br><br><br><br><br></span>

    <div id="framedTextBox" class="whiteFrame" style="width: 600px; background-color: darkred; transition-duration: 0.5s">
        <h1>Lorem Ipsum</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. Consequat semper viverra nam libero justo laoreet. Et pharetra pharetra massa massa ultricies mi quis hendrerit. Ultrices gravida dictum fusce ut. Ipsum consequat nisl vel pretium lectus quam. Aenean et tortor at risus. Risus pretium quam vulputate dignissim. Cursus metus aliquam eleifend mi in. Metus dictum at tempor commodo ullamcorper. Facilisis sed odio morbi quis commodo odio.</p>
        <p>Interdum velit laoreet id donec ultrices. In mollis nunc sed id semper. Neque vitae tempus quam pellentesque nec nam. Venenatis lectus magna fringilla urna porttitor. Turpis massa tincidunt dui ut ornare lectus. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. Quis enim lobortis scelerisque fermentum dui faucibus in ornare quam. Morbi blandit cursus risus at ultrices mi tempus imperdiet nulla. Massa tempor nec feugiat nisl pretium fusce id velit ut. Porta non pulvinar neque laoreet suspendisse interdum consectetur. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Sed nisi lacus sed viverra tellus in. Orci a scelerisque purus semper eget duis at tellus at. Dui id ornare arcu odio ut sem nulla pharetra diam. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Et pharetra pharetra massa massa ultricies mi. Nulla facilisi nullam vehicula ipsum a arcu cursus. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin.</p>
    </div>

    <span><br><br><br><br><br><br><br><br></span>



    <div id="footer">
        <div class="column square secondaryVariant">
            <p contenteditable="true"> This is a footer! Isn't it neat? </p>
            <p> ロイヤルカジノ™</p>
        </div>
    </div>
</div> <!-- end of document wrapper -->
</body>
</html>
