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
    <link rel="stylesheet" href="hub.css">

    <style>

        #id {}

    </style>

</head>
<body>
<!--<div class="container row centerCross centerMain" style="z-index: 1; height: 50px; width:100vw; top: 10px; position: fixed;">
    <button class="secondary square">1</button>
    <button class="secondary square">2</button>
    <button class="secondary square">3</button>
    <button class="secondary square">4</button>
</div>-->
<header style="position: fixed">


    <div class="column container div">
        <div class="titleDiv shape-bat blackText div" style="border-radius: 0; min-height: 50px; top: 10px;">
            <h1>
                Casino Royale!
            </h1>
        </div>

        <span class="bordershape-diamond"
              style="border-bottom-color: var(--secondary); display: flex; top: 85px"></span>
        <!-- alternative: when scrolling, turns into a triangle pointing up. clicking it returns the user to the top of the page. -->
        <!-- TODO: når diamond vises, kan den trykkes på (scale(1.1) on hover & 1.2@click). Da skyter toolbar menyen ut fra begge sider av den.
                To tabs til venstre, og to til høyre, og når man scroller dem vekk eller trykker på diamanten igjen så glir de tilbake inn i diamanten og skjules,
                og diamanten spiller av en liten animasjon mens den mottar tabs'ene, satisfying qubic-bezier rotateX/Y spin(ning til de er inne).-->
    </div>

</header>
<div id="documentWrapper" class="container column" style="margin-top: 300px !important;">




    <h1>test</h1>


    <div class="secondary">
        <pre>












 yoohoo


























     dette er langt nede gitt





































































































         fy fasan så langt







        </pre>
    </div>

</div> <!-- end of document wrapper -->
<script>
    $(function () {

        // When the user scrolls down 50px from the top of the document, resize the header's font size
        // alternative - ha en vanlig square header, men når bruker scroller ned, bytt class til bookmarkesque triangle header & make small.
        let header = document.querySelector("header");
        let div = header.getElementsByClassName("titleDiv")[0];
        let symbol = header.querySelector("span");
        let headerToggled = false;
        let headerTransitionDuration = 0.5;
        header.style.transitionDuration = headerTransitionDuration + "s";
        div.style.transitionDuration = headerTransitionDuration + "s";
        symbol.style.transitionDuration = headerTransitionDuration + "s";


        /**
         * The follinw geventlistener animates the <header> tag when the page has been scrolled down to below "shrinkOn" pixels.
         */
        window.onscroll = function () {
            let distanceY = window.pageYOffset || document.documentElement.scrollTop;
            let shrinkOn = 200;

            if (distanceY > shrinkOn && headerToggled === false) {
                headerToggled = true;

                symbol.classList.add("spin");
                header.style.fontSize = "10px";
                symbol.style.width = 0;
                symbol.style.height = 0;
                symbol.style.borderWidth = 0;
                    symbol.style.opacity = 0;

                setTimeout(function () {
                    header.style.clipPath = "polygon(0 0, 100% 0, 50vw 40%, 0 calc(50% - 50%))";
                    header.style.padding = 0;
                    header.style.height = "50px";

                    div.style.top = "-25px";
                    div.classList.remove("shape-bat");
                    div.classList.add("shape-bat-top");

                }, 250);


            } else if (distanceY < shrinkOn && headerToggled) {
                headerToggled = false;
                symbol.classList.remove("spin");
                header.style.clipPath = "polygon(0 0, 100% 0, 50vw 100%, 0 calc(50% - 50%))";
                header.style.padding = "initial";
                header.style.height = "initial";
                div.style.height = "initial";
                div.classList.remove("shape-bat-top");
                div.classList.add("shape-bat");

                setTimeout(function () {
                    div.style.position = "fixed";
                    div.style.top = "10px";

                    header.style.fontSize = "initial";
                    symbol.style.width = 0;
                    symbol.style.height = 0;
                    symbol.style.borderWidth = "50px";
                    symbol.style.opacity = 1;
                }, 250);

            }
        }

        // When the window is scrolled, triggers resizeHeaderOnScroll().


    });
</script>
</body>
</html>
