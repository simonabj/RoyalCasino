$(function () {



    // ____________________________________ DISPLAYING GAMES ___________________________________

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
            href: "https://hugelol.com"
        }
    ];


    //IMPORTANT - comment
    /**
     *
     * @param object
     */
    function addGameBox(object) {

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
        button.onclick = function () { setTimeout(function(){window.location.href = object.href}, 100)};
        let buttonText = document.createElement("h2");
        buttonText.innerHTML = " PLAY NOW ";
        button.appendChild(buttonText);

        //APPENDING THE IMAGE AND IT'S TITLE TO THEIR CONTAINER
        imageContainer.appendChild(image);
        imageContainer.appendChild(imageTitleContainer);

        //APPENDING THE IMAGE CONTAINER AND THE BUTTON TO THE GAME CONTAINER
        container.appendChild(imageContainer);
        container.appendChild(button);

        //RETURNING THE GAME CONTAINER
        return container;
    }



    function addAllGameBoxes(container, array) {
        for (let i = 0; i < array.length; i++) {

            if (array[i] === undefined) break;
            let gameContainer = addGameBox(games[i]);
            container.appendChild(gameContainer);
        }
    }

    addAllGameBoxes($("#gamesContainer")[0], games);


    /*
    <div class="hubGame_container">
            <div class="hubGame_imageContainer">
                <div class="hubGame_image" style="background-image: url('https://images.theconversation.com/files/147757/original/image-20161128-22748-1couruj.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=496&fit=clip')"></div>
                <div class="hubGame_imageTitleContainer">
                    <h1> Roulette </h1>
                </div>
            </div>
            <button> <h2> PLAY NOW </h2> </button>
        </div>
     */



    // _____________________________________ SCROLLING MINIMIZES HEADER _________________________________


    // When the user scrolls down 50px from the top of the document, resize the header's font size
    // alternative - ha en vanlig square header, men når bruker scroller ned, bytt class til bookmarkesque triangle header & make small.
    let header = document.querySelector("header");
    let div = header.getElementsByClassName("titleDiv")[0];
    let symbol = header.querySelector("span");
    let headerToggled = false;
    let headerTransitionDuration = 0.25;
    header.style.transitionDuration = headerTransitionDuration + "s";
    div.style.transitionDuration = headerTransitionDuration + "s";
    symbol.style.transitionDuration = headerTransitionDuration + 0.2 + "s";

    /**
     * The following geventlistener animates the <header> tag when the page has been scrolled down to below "shrinkOn" pixels.
     */
    window.onscroll = function () {
        let distanceY = window.pageYOffset || document.documentElement.scrollTop;
        let shrinkOn = 25;

        if (distanceY > shrinkOn && headerToggled === false) {
            headerToggled = true;
            symbol.classList.add("spin");
            header.style.fontSize = "10px";
            symbol.style.width = 0;
            symbol.style.height = 0;
            symbol.style.borderWidth = 0;
            symbol.style.opacity = 0;

            setTimeout(function () {
                header.style.clipPath = "polygon(0 0, 100% 0, 50vw 35%, 0 calc(50% - 50%))";
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
            }, 200);

        }
    }
    // When the window is scrolled, triggers resizeHeaderOnScroll().
});