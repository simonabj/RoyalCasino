$(function () {



    let games = [
        {
            title: "roulette",
            image: "https://images.theconversation.com/files/147757/original/image-20161128-22748-1couruj.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=496&fit=clip",
            href: "../games/roulette/index.html",
        },
        {
            title: "blackjack",
            image: "http://getgmailaccount.com/wp-content/uploads/2019/01/Panduan-Mudah-Bermain-Di-Situs-Poker-Online.jpg",
            href: "../games/blackjack/index.html",
        },
        {
            title: "monty Hall",
            image: "https://media.boingboing.net/wp-content/uploads/2017/10/monty-hall.jpg",
            href: "../games/montyHall/index.html",
        },
        {
            title: "DIO",
            image: "https://hugelolcdn.com/i/596578.jpg",
            href: "https://hugelol.com",
        },
        {
            title: "Royale Bros",
            image: "https://bonusstagemagazine.files.wordpress.com/2015/09/anime-mario-portada2.png",
            href: "reddit.com",
        },
        {
            title: "The Link to the Rich",
            image: "https://pm1.narvii.com/6326/b437edd56f794d316a4925316d29857e46c55eef_hq.jpg",
            href: "vg.no",
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
            // BLURS THE GAME IMAGE ON HOVer
            mouseenter: function () {
                image.style.filter = "blur(5px)"
            },
            // DE-BLURS THE GAME IMAGE WHEN NO LONGER HOVERING
            mouseleave: function () {
                image.style.filter = "";
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
    function addAllGameBoxes(container, array) {
        //kan alternativt velge hvor mange kolonner en skal generere, men det er mer naturlig å bare bruke max-width på container.
        for (let i = 0; i < array.length; i++) {
            if (array[i] === undefined) break;
            let gameContainer = createGameBox(games[i]);
            container.appendChild(gameContainer);
        }
    }



    // Creates and appends all game-boxes into the div with id "gamesContainer".
    addAllGameBoxes($("#gamesContainer")[0], games);



    // _____________________________________ SCROLLING ______________________________________

    let headerTransitionDuration = 0.25;
    let header = document.querySelector("header");
    let div = header.getElementsByClassName("titleDiv")[0];
    let symbol = document.getElementById("headerSymbol");
    header.style.transitionDuration = headerTransitionDuration + "s";
    div.style.transitionDuration = headerTransitionDuration + "s";
    symbol.style.transitionDuration = headerTransitionDuration + 0.2 + "s";
    let headerToggled = false;
    let shrinkOn = 25;

    let footer = document.getElementById("footer");
    let footerToggled = false;
    footer.style.opacity = 0;

    let textBox1 = document.getElementById("framedTextBox");



    // SCROLLING
    window.onscroll = function () {

        /** distanceY is the distance in pixels scrolled from the top of the document. */
        let distanceY = window.pageYOffset || document.documentElement.scrollTop;

        //HEADER
        /** If scrolled distance is larger than shrinkOn, styles the header to minimize it, else, styles the header back to initial values. */
        // CLOSING HEADER
        if (distanceY > shrinkOn && headerToggled === false) {
            headerToggled = true;
            symbol.classList.add("spin");
            header.style.fontSize = "10px";
            symbol.style.borderWidth = 0;
            symbol.style.opacity = 0;

            closeToolbar();
            setTimeout(function () {
                //document.getElementById("gamesContainer").scrollIntoView({block: "center", behavior: "smooth"});
                header.style.clipPath = "polygon(0 0, 100% 0, 50vw 35%, 0 calc(50% - 50%))";
                header.style.padding = 0;
                header.style.height = "50px";
                div.style.top = "-25px";
                div.classList.remove("shape-bat");
                div.classList.add("shape-bat-top");
            }, 250);

        // OPENING HEADER
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
                symbol.style.opacity = 1;
                symbol.style.borderWidth = "50px";
                header.style.fontSize = "initial";
            }, 200);
        }


        // FOOTER
        /** If bottom of page reached, footer opacity is set to 1, else, footer opacity is set to 0. */
        if (footerToggled === false && document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {
            footer.style.opacity = 1;
            footerToggled = true;

        } else if (footerToggled) {
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
        toolbarRight.style.left = "33.5%";
        toolbarItem[0].style.transitionDuration = "0.30s";
        toolbarItem[1].style.transitionDuration = "0.30s";
        toolbarItem[0].style.transitionTimingFunction = "linear";
        toolbarItem[1].style.transitionTimingFunction = "linear";
        toolbarItem[0].style.clipPath = closedClipPath;
        toolbarItem[1].style.clipPath = closedClipPath;
    }


    /**
     * method openToolbar plays appropriate animation and shows the toolbar.
     */
    function openToolbar() {
        isToolbarOpen = true;
        toolbarLeft.style.right = "50%";
        toolbarRight.style.left = "50.5%";
        toolbarItem[0].style.transitionDuration = "0.350s";
        toolbarItem[1].style.transitionDuration = "0.350s";
        toolbarItem[0].style.clipPath = openedClipPath;
        toolbarItem[1].style.clipPath = openedClipPath;
        toolbarLeft.style.opacity = 1;
        toolbarRight.style.opacity = 1;
    }



    openToolbar();



    /**
     * method toolbarToggle opens the toolbar if it's closed, and vice-versa.
     */
    function toolbarToggle() {
        console.log(isToolbarOpen);
        if (!isToolbarOpen) {
            openToolbar();
            isToolbarOpen = true;
            symbol.classList.add("toolbarOpenAnimation");
            symbol.classList.remove("toolbarCloseAnimation");
        } else {
            symbol.classList.add("toolbarCloseAnimation");
            symbol.classList.remove("toolbarOpenAnimation");
            setTimeout(function () {
                closeToolbar();
                isToolbarOpen = false;
            }, 200);
        }
    }



    // RUNS FUNCTION toolbarToggle() WHEN THE HEADER IS CLICKED.
    document.getElementById("headerSymbol").onclick = function () {toolbarToggle()};

    //symbol.addEventListener("animationend", function() {symbol.classList.remove("toolbarSymbolAnimation");});


});
