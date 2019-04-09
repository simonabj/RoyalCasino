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
<header style="position: fixed">
    <div class="column container">

        <div class="titleDiv" style="border-radius: 500px; min-height: 50px;">
            <h1>
                Casino Royale!
            </h1>
        </div>

        <span class="shape-diamond" style="border-bottom-color: var(--secondary); display: flex; top: 85px"></span>
        <!-- alternative: when scrolling, turns into a triangle pointing up. clicking it returns the user to the top of the page. -->
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
        let div = header.querySelector("div");
        let text = div.querySelector("h1");
        let symbol = header.querySelector("span");
        let toggled = false;


        /**
         * method resizeHeaderOnScroll animates the <header> tag when the page has been scrolled down to below "shrinkOn" pixels.
         */
        function resizeHeaderOnScroll() {
            let distanceY = window.pageYOffset || document.documentElement.scrollTop;
            console.log(distanceY);
            console.log(toggled);
            let shrinkOn = 200;

            if (distanceY > shrinkOn && toggled === false) {
                toggled = true;
                console.log("enabling");

                header.style.fontSize = "10px";
                symbol.style.width = 0;
                symbol.style.height = 0;
                symbol.style.borderWidth = 0;
                symbol.style.opacity = 0;

                setTimeout(function () {
                    header.style.clipPath = "polygon(0 0, 100% 0, 50vw 60%, 0 calc(50% - 50%))";
                    header.style.padding = 0;
                    header.style.height = "50px";
                    div.style.height = "50px";
                    div.style.top = "10px";
                }, 500);


            } else if (distanceY < shrinkOn && toggled) {
                toggled = false;
                console.log("disabling");
                    header.style.clipPath = "polygon(0 0, 100% 0, 50vw 100%, 0 calc(50% - 50%))";
                    header.style.padding = "initial";
                    header.style.height = "initial";
                    div.style.height = "initial";

                setTimeout(function () {
                div.style.position = "fixed";
                    div.style.top = "35px";

                    header.style.fontSize = "initial";
                    symbol.style.width = 0;
                    symbol.style.height = 0;
                    symbol.style.borderWidth = "50px";
                    symbol.style.opacity = 1;
                }, 500);

            }
        }

        // When the window is scrolled, triggers resizeHeaderOnScroll().
        window.onscroll = function () {resizeHeaderOnScroll()};

    });
</script>
</body>
</html>
