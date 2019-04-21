$(function () {



    let games = [
        {
            title: "roulette",
            image: "https://images.theconversation.com/files/147757/original/image-20161128-22748-1couruj.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=496&fit=clip",
            href: "../games/Roulette/index.php",
        },
        {
            title: "blackjack",
            image: "/games/Blackjack/banner.jpg",
            href: "../games/Blackjack/",
        },
        {
            title: "monty Hall",
            image: "https://media.boingboing.net/wp-content/uploads/2017/10/monty-hall.jpg",
            href: "../games/montyHall/index.php",
        },
        {
            title: "Crash",
            image: "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F480661%2Frising_stock_chart.jpg&w=700&op=resize",
            href: "../games/Crash/crash.php",
        },
        {
            title: "Royale Bros",
            image: "https://bonusstagemagazine.files.wordpress.com/2015/09/anime-mario-portada2.png",
            href: "reddit.com",
        },
        {
            title: "Royale Adventures",
            image: "https://pm1.narvii.com/6326/b437edd56f794d316a4925316d29857e46c55eef_hq.jpg",
            href: "http://nogginclontith.co.uk/index.htm",
        },

    ];



    // ____________________________________ DISPLAYING GAMES ___________________________________
    /**
     * method createGameBox(object) creates and returns a HTML element containing an image, title and link from given object.
     * @param object {Object} - The object of which to fetch the image url, title and link.
     * @returns {HTMLElement} - The HTML element generated.
     */
    function createGameBox(object) {

        // CREATING THE CONTAINER FOR THE GAME
        let container = document.createElement("div");
        container.classList.add("hubGame_container");

        // CREATING THE CONTAINER FOR THE IMAGE AND IT'S TITLE
        let imageContainer = document.createElement("div");
        imageContainer.classList.add("hubGame_imageContainer");

        // CREATING THE IMAGE
        let image = document.createElement("div");
        image.classList.add("hubGame_image");
        image.style.backgroundImage = "url(" + object.image + ")";

        //CREATING THE TITLE AND IT'S CONTAINER
        let imageTitleContainer = document.createElement("div");
        imageTitleContainer.classList.add("hubGame_imageTitleContainer");
        let title = document.createElement("h1");
        title.innerHTML = object.title.capitalize();
        imageTitleContainer.appendChild(title);

        // CREATING THE BUTTON AND IT'S TEXT
        let button = document.createElement("button");
        button.onclick = function () { setTimeout(function () {window.location.href = object.href}, 100)};
        let buttonText = document.createElement("h2");
        buttonText.innerHTML = " PLAY NOW ";
        button.appendChild(buttonText);

        // ADDING EVENT LISTENERS ON THE BUTTON ELEMENT
        $(button).on({

            // BLURS OTHER GAME IMAGES ON HOVER
            mouseenter: function () {
                //image.style.filter = "blur(5px)"

                // BLURS EACH GAME BOX THAT ISNT THIS ONE
                for (let i = 0; i < gameBoxes.length; i++) {
                    if(gameBoxes[i] !== container){
                        gameBoxes[i].querySelector(".hubGame_image").style.filter = "blur(4px)";
                    }
                }

            },

            // DE-BLURS OTHER GAME IMAGES WHEN NO LONGER HOVERING
            mouseleave: function () {
                //image.style.filter = "";

                // DE-BLURS EACH GAME BOX THAT ISNT THIS ONE
                for (let i = 0; i < gameBoxes.length; i++) {
                    if(gameBoxes[i] !== container){
                        gameBoxes[i].querySelector(".hubGame_image").style.filter = "";
                    }
                }

            },

        });

        //APPENDING THE IMAGE AND IT'S TITLE TO THEIR CONTAINER
        imageContainer.appendChild(image);
        imageContainer.appendChild(imageTitleContainer);

        //APPENDING THE IMAGE CONTAINER AND THE BUTTON TO THE GAME CONTAINER
        container.appendChild(imageContainer);
        container.appendChild(button);

        //RETURNING THE GAME CONTAINER
        return container;
    }



    /*
    - STRUCTURE:
    <div class="hubGame_container">
        <div class="hubGame_imageContainer">
            <div class="hubGame_image" style="background-image: url(' [IMAGE URL] ')"></div>
            <div class="hubGame_imageTitleContainer">
                <h1> [TITLE] </h1>
            </div>
        </div>
        <button> <h2> PLAY NOW </h2> </button>
    </div>
    */


    /**
     * method addAllGameBoxes(container, array) creates a HTML element for each object of given array, using method createGameBox, and appends each element to the given container.
     * @param container {HTMLElement} - The container in which to append the created HTML elements.
     * @param array {Array} - The array from where to fetch the values used for creating the elements with method createGameBox. Should contain "title", "image" and "href".
     */
    function addAllGameBoxes(container, array, outputArray) {
        //kan alternativt velge hvor mange kolonner en skal generere, men det er mer flexible å i stedet bare bruke max-width på container.
        for (let i = 0; i < array.length; i++) {
            //if (array[i] === undefined) break; - breaks the lop if the given array element for some reason is undefined. Was more relevant when I was using the define-number-of-rows method when a row couldn't be filled, but it does no harm to keep.
            let gameContainer = createGameBox(games[i]);
            container.appendChild(gameContainer);
            outputArray[i] = gameContainer;
        }

    }



    let gameBoxes = [];

    // Creates and appends all game-boxes into the div with id "gamesContainer", and puts each game box element into the array "gameBoxes".
    addAllGameBoxes($("#gamesContainer")[0], games, gameBoxes);


    for (let i = 0; i < gameBoxes.length; i++) {
        gameBoxes[i].style.transitionDuration = "0.5s";
    }








    // _____________________________________ SCROLLING ______________________________________

    let headerTransitionDuration = 0.25;
    let header = document.querySelector("header");
    let div = document.getElementsByClassName("titleDiv")[0];
    let symbol = document.getElementById("headerSymbol");
    header.style.transitionDuration = headerTransitionDuration + "s";
    div.style.transitionDuration = headerTransitionDuration + "s";
    symbol.style.transitionDuration = headerTransitionDuration + 0.2 + "s";
    let headerToggled = false;
    let shrinkOn = 25;

    let doesFooterHide = false;
    let footer = document.getElementById("footer");
    let footerToggled = false;
    (doesFooterHide===true) ? footer.style.opacity = 0 : footer.style.opacity = 1;

    let textBox1 = document.getElementById("framedTextBox");



    // SCROLLING
    window.onscroll = function () {

        /** distanceY is the distance in pixels scrolled from the top of the document. */
        let distanceY = window.pageYOffset || document.documentElement.scrollTop;

        //HEADER
        /** If scrolled distance is larger than shrinkOn, styles the header to minimize it, else, styles the header back to initial values. */
        // CLOSING HEADER
        if (distanceY > shrinkOn && headerToggled === false) {
            $("#toolbarTooltip").hide();
            headerToggled = true;
            //header.style.fontSize = "10px";
            div.querySelector("h1").style.fontSize = "20pt";

            closeToolbar("no animation");
            //symbol.style.top = "160px";
            symbol.classList.add("symbolHideAnimation");

            setTimeout(function () {
                symbol.style.opacity = 0;
                //document.getElementById("gamesContainer").scrollIntoView({block: "center", behavior: "smooth"});
                header.style.clipPath = "polygon(0 0, 100% 0, 50vw 35%, 0 calc(50% - 50%))";
                header.style.padding = 0;
                header.style.height = "50px";
                div.style.top = "-25px";
                div.classList.remove("shape-bat");
                div.classList.add("shape-bat-top");
                setTimeout(function(){
                    symbol.style.top = "-15px";
                }, 250)
            }, 250);

            // OPENING HEADER
        } else if (distanceY < shrinkOn && headerToggled) {

            headerToggled = false;
            header.style.clipPath = "polygon(0 0, 100% 0, 50vw 100%, 0 calc(50% - 50%))";
            header.style.padding = "initial";
            header.style.height = "initial";
            div.style.height = "initial";
            div.classList.remove("shape-bat-top");
            div.classList.add("shape-bat");
            //symbol.style.top = "40px";
            //symbol.style.transform = "scale(0.2)";

            setTimeout(function () {
                symbol.style.opacity = 1;
                div.style.position = "fixed";
                div.style.top = "4px";
                div.querySelector("h1").style.fontSize = "27pt";
                //header.style.fontSize = "initial";
                symbol.classList.add("symbolShowAnimation");
                setTimeout(function(){
                    symbol.style.top = "160px";
                    symbol.style.transform = "";
                }, 200)
            }, 200);

        }


        // FOOTER
        /** If bottom of page reached, footer opacity is set to 1, else, footer opacity is set to 0. */
        if (doesFooterHide && footerToggled === false && document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {
            footer.style.opacity = 1;
            footerToggled = true;
        } else if (doesFooterHide && footerToggled) {
            footer.style.opacity = 0;
            footerToggled = false;
        }

        //TEXT BOX
        /** If textBox1 reached, remove the class "leanUpPermaMild", else, add class "leanUpPermaMild". */
        (distanceY > textBox1.getBoundingClientRect().top + 1250/*textBox1.getBoundingClientRect().height*/) ? textBox1.classList.remove("leanUpPermaMild") : textBox1.classList.add("leanUpPermaMild");
    };



    // _______________ TOOLBAR ___________________



    let toolbarLeft = document.getElementById("toolbarLeft");
    let toolbarRight = document.getElementById("toolbarRight");
    toolbarLeft.justifyContent = "space-around";
    toolbarRight.justifyContent = "space-around";
    let toolbarItem = $(".toolbarItem");
    let openedClipPath = "polygon(100% 0%, 85% 50%, 100% 100%, 25% 75%, 15% 50%, 25% 25%)";
    let closingClipPath = "polygon(50% 0%, 30% 50%, 50% 100%, 25% 75%, 15% 50%, 25% 25%)";
    let closedClipPath = "polygon(25% 4.5%, 15% 50%, 25% 95.5%, 20.5% 75%, 15% 50%, 20.5% 25%)";
    let isToolbarOpen = false;

    /**
     * method closeToolbar plays appropriate animation and hides the toolbar.
     */
    function closeToolbar() {
        isToolbarOpen = false;
        toolbarLeft.style.right = "33%";
        toolbarRight.style.left = "33%";
        toolbarItem[0].style.transitionDuration = "0.30s";
        toolbarItem[1].style.transitionDuration = "0.30s";
        toolbarItem[0].style.transitionTimingFunction = "linear";
        toolbarItem[1].style.transitionTimingFunction = "linear";
        toolbarItem[0].style.clipPath = closedClipPath;
        toolbarItem[1].style.clipPath = closedClipPath;
        $("#logoutButton").hide();
    }



    /**
     * method openToolbar plays appropriate animation and shows the toolbar.
     */
    function openToolbar() {
        isToolbarOpen = true;
        toolbarLeft.style.right = "55%";
        toolbarRight.style.left = "55%";
        toolbarItem[0].style.transitionDuration = "0.350s";
        toolbarItem[1].style.transitionDuration = "0.350s";
        toolbarItem[0].style.clipPath = openedClipPath;
        toolbarItem[1].style.clipPath = openedClipPath;
        toolbarLeft.style.opacity = 1;
        toolbarRight.style.opacity = 1;
    }



    closeToolbar();



    /**
     * method toolbarToggle opens the toolbar if it's closed, and vice-versa.
     */
    function toolbarToggle(animation) {

        if (!isToolbarOpen) {

            symbol.classList.remove("toolbarCloseAnimation");
            symbol.classList.remove("toolbarOpenAnimation");
            openToolbar();
            if (animation !== "no animation") symbol.classList.add("toolbarOpenAnimation");
            isToolbarOpen = true;

        } else {

            symbol.classList.remove("toolbarOpenAnimation");
            symbol.classList.remove("toolbarCloseAnimation");
            if (animation !== "no animation") symbol.classList.add("toolbarCloseAnimation");
            setTimeout(function () {
                closeToolbar();
                isToolbarOpen = false;
            }, 200);
        }
    }



    // RUNS FUNCTION toolbarToggle() WHEN THE HEADER IS CLICKED.
    document.getElementById("headerSymbol").onclick = function () {toolbarToggle(); /*$("#toolbarTooltip").hide()*/};

    symbol.addEventListener("animationend", function() {
        symbol.classList.remove("toolbarOpenAnimation");
        symbol.classList.remove("toolbarCloseAnimation");
        symbol.classList.remove("symbolShowAnimation");
        symbol.classList.remove("symbolHideAnimation");
    });





    let isProfileHover = false;
    $("#profileSettings").on({
        click: function(){
            window.location.href="https://visitjulian.com";
        },
        mouseenter: function(){
            isProfileHover = true;
            $("#logoutButton").show();
        },
        mouseleave: function(){
            isProfileHover = false;
            setTimeout(function(){
                if(!isLogoutHover && !isProfileHover){
                    $("#logoutButton").hide();
                }
            }, 750);
        }
    });
    let isLogoutHover = false;
    $("#logoutButton").on({
        click: function(){
            window.location.href="/0PHP/logout.php";
        },
        mouseenter: function(){
            isLogoutHover = true;
        },
        mouseleave: function(){
            isLogoutHover = false;
            $("#logoutButton").hide();
        }
    });


});
