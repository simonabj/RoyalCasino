$(function () {

    let games = [
        {
            title: "blackjack",
            image: "../games/Blackjack/banner.jpg",
            href: "../games/Blackjack/index.html",
        },
        {
            title: "roulette",
            image: "https://images.theconversation.com/files/147757/original/image-20161128-22748-1couruj.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=496&fit=clip",
            href: "../games/Roulette/index.php",
        },
        {
            title: "Crash",
            image: "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F480661%2Frising_stock_chart.jpg&w=700&op=resize",
            href: "../games/Crash/index.php",
        },
        {
            title: "Royale Adventures",
            image: "https://bonusstagemagazine.files.wordpress.com/2015/09/anime-mario-portada2.png",
            //image: "https://pm1.narvii.com/6326/b437edd56f794d316a4925316d29857e46c55eef_hq.jpg",
            href: "../games/RPG tilemap/index.html",
        },
        {
            title: "Coinflip",
            image: "https://media.istockphoto.com/photos/coin-flip-picture-id173242927?k=6&m=173242927&s=612x612&w=0&h=2xElyeRe6hOGwelEbyxLTk3GcRp-PjBVKRKwVDVOZF0=",
            //image: "https://media.istockphoto.com/photos/coin-flip-picture-id173242927?k=6&m=173242927&s=612x612&w=0&h=2xElyeRe6hOGwelEbyxLTk3GcRp-PjBVKRKwVDVOZF0=",
            href: "../games/CoinFlip/index.php",
        },
        {
            title: "Guess The Number",
            image: "https://www.funbrain.com/assets/img/content-cards/F2qRmLhRnmebc8jJAUjr_GuessTheNumber%403x.png",
            //image: "https://www.funbrain.com/assets/img/content-cards/F2qRmLhRnmebc8jJAUjr_GuessTheNumber%403x.png",
            href: "../games/GuessNumber/index.php",
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
        let buttonText = document.createElement("h2");
        buttonText.innerHTML = " PLAY NOW ";
        button.appendChild(buttonText);

        // ADDING EVENT LISTENERS ON THE BUTTON ELEMENT
        $(button).on({
            click: function () {
                // PLAYS AN ANIMATION ON EACH GAME BOX THAT ISN'T THIS ONE
                /* let tempVar = 0; for--> tempVar++; if (tempVar === 2) tempVar = 0;   if-->(notcontainer-->if     (tempVar === 0) { gameBoxes[i].classList.add("shadow-inset-center"); } else { gameBoxes[i].classList.add("shadow-inset-center"); }*/
                //container.style.transform = "scale(1.2)";
                /*
                for (let i = 0; i < gameBoxes.length; i++) {
                    if (gameBoxes[i] !== container) {
                        //gameBoxes[i].querySelector(".hubGame_image").style.filter = "";
                        gameBoxes[i].style.transform = "scale(0.95)";
                    }
                }
                */
                setTimeout(function () {
                    /*for (let i = 0; i < gameBoxes.length; i++) {
                        if (gameBoxes[i] !== container) {
                            gameBoxes[i].style.transform = "";
                        }
                    }
                    container.style.transform = "";
                    */
                    window.location.href = object.href;
                }, 150);
            },
            // BLURS OTHER GAME-IMAGES ON HOVER
            mouseenter: function () {
                // BLURS EACH GAME BOX THAT ISN'T THIS ONE
                for (let i = 0; i < gameBoxes.length; i++) {
                    if (gameBoxes[i] !== container) {
                        gameBoxes[i].querySelector(".hubGame_image").style.filter = "blur(3px)";
                    }
                }
            },
            // DE-BLURS OTHER GAME-IMAGES WHEN NO LONGER HOVERING
            mouseleave: function () {
                // DE-BLURS EACH GAME BOX THAT ISN'T THIS ONE
                for (let i = 0; i < gameBoxes.length; i++) {
                    if (gameBoxes[i] !== container) {
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
    addAllGameBoxes($("#gamesTable")[0], games, gameBoxes);


    for (let i = 0; i < gameBoxes.length; i++) {
        gameBoxes[i].style.transitionDuration = "0.5s";
    }





});