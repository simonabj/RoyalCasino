let affectUser = true;

// DOCUMENT LOAD
$(function () {
    let title = $("#table .title")[0];
    setTimeout(function () {
        title.style.opacity = 1;
        title.classList.add("tracking-in-expand");
    }, 500);

    /**
     * method normalizeAngle returns the lowest possible degree with which to describe the given degree, between 0 and 359.
     * @param deg {Number} - The degree to normalize.
     * @returns {Number} - The degree, normalized to a number which is 0 < x < 359.
     */
    function normalizeAngle(deg) {
        let newDeg = deg;
        while (newDeg <= 0) newDeg += 360;
        while (newDeg > 360) newDeg -= 360;
        return newDeg;
    }

    /*function getAngle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    }*/


    class Rotatable {
        constructor(initEl, initDeg = 0) {
            this.deg = initDeg;
            this.el = initEl;
        }

        rotate(deg) {
            this.deg += deg;
            this.el.style.transform = "rotate(" + normalizeAngle(this.deg) + "deg)";
        }

        rotateTo(deg) {
            this.deg = deg;
            this.el.style.transform = "rotate(" + normalizeAngle(this.deg) + "deg)";
        }
    }


    // _______ VARIABLES _______
    let rotateVelMax = 6; /* 4 is best for 144hz */
    let rotateVel = 0;
    // THE BALL
    let ball = new Rotatable($("#ballDiv")[0]);
    let ballHeightMax = 600;
    let ballHeight = ballHeightMax;
    ball.el.style.height = ballHeight + "px";

    // THE WHEEL
    let rWheel = new Rotatable($("#rouletteWheel")[0]);




    // ________ GAMELOOP ________
    function gameloop() {

        // RETURNING VALUES TO MAX SMOOTHLY (Makes the rotation and ball return to correct velocity and height smoothly).
        if (rotateVel < rotateVelMax && !stop) rotateVel += 0.4;
        if (ballHeight < ballHeightMax && !stop) ballHeight += 10;

        // ROTATING
        rWheel.rotate(rotateVel * 0.4);
        ball.rotate(-rotateVel);
        ball.el.style.height = ballHeight + "px";

        // STOPPING
        if (stop) {

            rotateVel *= 0.99;

            // BREAKS THE GAMELOOP IF THE BALL HAS STOPPED.
            if (rotateVel < 0.03) {
                rotateVel = 0;
                console.log("stopped");
                stopped();
                spinning = false;
                return false;
            }
            // LOWERS THE BALL UNTIL IT'S WITHIN A 360 PIXEL RADIUS OF THE CENTER
            if (ballHeight > 360) { ballHeight = ballHeight * 0.975; } /* 0.99 is best for 144hz */
        }
        requestAnimationFrame(gameloop);
    }




    // SIGNIFYING WHEN TO STOP
    let stop, stopTime, spinning = false, sfx_spinning, betInput = $("#howMuch")[0], numberInput = $("#whatNumbers")[0],
        bettingAlert = $("#bettingAlert"), winningAlert = $("#winningAlert")[0];
    numberInput.addEventListener("animationend", function () {numberInput.classList.remove("jello-horizontal");});
    numberInput.addEventListener("animationend", function () {betInput.classList.remove("jello-horizontal");});


    function spin() {
        if (!spinning && betInput.value !== "" && numberInput.value !== "") {

            winningAlert.style.display = "none";
            // If the user has betted on more than 17 numbers, prevents spinning.
            if ($("#whatNumbers")[0].value.split(',').map(Number).length > 17) {
                numberInput.classList.remove("jello-horizontal");
                betInput.classList.remove("jello-horizontal");
                bettingAlert[0].classList.add("shake-horizontal");
                bettingAlert.show();
                bettingAlert[0].querySelector("h3").innerHTML = "You can't bet on more than 18 numbers.";
                numberInput.classList.add("jello-horizontal");
                return false;
            }

            console.log("");
            console.log("Spinning");
            spinning = true;
            stop = false;
            stopTime = Math.random() * 6000 + 1500;
            console.log("The wheel will spin for " + (stopTime / 1000).toFixed(1) + " seconds.");

            // stopping the roulette wheel
            setTimeout(function () {
                // signifies it's time to stop, for the gameloop.
                stop = true;
                // plays the end of the spinning audio.
                sfx_spinning.pause();
                sfx_spinning.currentTime = 0;
                sfx_spinning = new Audio("sfx/spinning_stopping.ogg");
                sfx_spinning.play();
            }, stopTime);

            rotateVel = 0;

            ball.el.style.height = ballHeight + "px";

            sfx_spinning = new Audio("sfx/spinning.ogg");
            sfx_spinning.volume = 0.5;
            sfx_spinning.play();

            betInput.disabled = true;
            numberInput.disabled = true;
            betInput.classList.add("shadow-inset-center");
            numberInput.classList.add("shadow-inset-center");
            bettingAlert[0].classList.remove("shake-horizontal");
            bettingAlert.hide();

            gameloop();

        } else if (betInput.value === "" || numberInput.value === "") {

            winningAlert.style.display = "none";

            numberInput.classList.remove("jello-horizontal");
            betInput.classList.remove("jello-horizontal");

            bettingAlert[0].classList.add("shake-horizontal");
            bettingAlert.show();

            setTimeout(function () {

                if (numberInput.value === "" && betInput.value === "") {

                    bettingAlert[0].querySelector("h3").innerHTML = "You need to bet something on something.";

                    numberInput.classList.add("jello-horizontal");
                    betInput.classList.add("jello-horizontal");

                } else if (numberInput.value === "") {

                    bettingAlert[0].querySelector("h3").innerHTML = "You need to bet on something.";

                    numberInput.classList.add("jello-horizontal");

                } else if (betInput.value === "") {

                    bettingAlert[0].querySelector("h3").innerHTML = "You need to bet something.";

                    betInput.classList.add("jello-horizontal");

                }
            }, 100);

        }
    }



    $("#spinBtn").click(function () {spin();});
    $("#rouletteWheelCover").click(function () {spin();});



    let ballEndDeg, wheelEndDeg, difference, realValue;

    betInput.addEventListener("animationend", function () { betInput.classList.remove("flip-scale-up-hor"); });

    //winningAlert.addEventListener("animationend", function () { winningAlert.classList.remove("slide-in-elliptic-top-fwd"); winningAlert.classList.remove("bounce-in-top"); });


    function stopped() {
        wheelEndDeg = normalizeAngle(rWheel.deg).toFixed(0);
        ballEndDeg = normalizeAngle(ball.deg).toFixed(0);
        difference = normalizeAngle(wheelEndDeg - ballEndDeg);
        console.log("");
        console.log("Difference = " + difference + "deg");

        // Loops through the real values from the bottom, and the first time differenceDeg is smaller than the current realValues starting-degree, it breaks the loop and sets realValue to the previous realValues real-value.
        // This is because, when the difference(deg) is smaller than the starting-degree of one of the roulette-table-value-cells, it means that the previous roulette-table-value-cell is the one the ball landed on, as the ball's degree is between the current and previous cell.
        for (let i = 0; i < realValues.length; i++) {
            if (difference < realValues[i][0]) {
                realValue = realValues[i - 1][2];
                break;
            }
        }

        console.log("Your ball landed on " + realValue);

        // WINNING OR LOSING

        let bet, bettedValues, wonAmount;

        bet = betInput.value;
        betInput.disabled = false;
        numberInput.disabled = false;
        betInput.classList.remove("shadow-inset-center");
        numberInput.classList.remove("shadow-inset-center");
        bettedValues = $("#whatNumbers")[0].value.split(',').map(Number);

        // __ WINNING __
        if (bettedValues.includes(realValue)) {
            console.log("YOU WON!");

            //let payoffRatio =  bettedValues.length
            //let payoff = function () { for (let i = 0; i < betPayoffs.length; i++) { /* tod o - make work or something */ if (bettedValues.length < betPayoffs[i][0]) return betPayoffs[i - 1]; } return 5; //fallback return value if no match found (as it would return if it did).};

            wonAmount = (bet * (35 / bettedValues.length)).toFixed(0); //there are 38 slots, so on average you will lose by a little bit.
            if (isNaN(wonAmount) || wonAmount === undefined) wonAmount = 0;
            console.log("You won " + wonAmount + " tokens!");


            betInput.classList.add("flip-scale-up-hor");
            betInput.value = "";

            winningAlert.classList.remove("bounce-in-top");
            winningAlert.style.display = "block";
            winningAlert.style.backgroundColor = "rgba(71, 15, 121, 0.95)";
            winningAlert.querySelector("h1").innerHTML = "YOU WON " + wonAmount + " TOKENS!";
            winningAlert.classList.add("slide-in-elliptic-top-fwd");

            // __ ADDING THE WON TOKENS TO THE USERS BALANCE __
            if (affectUser) {
                user.tokenManager.addTokenAmount(wonAmount);
                saveUser(user); //Updates session storage
                updateSQL(); // Updates database
                document.getElementById("tokenCount").innerText = "" + getUser().tokenManager.getCount(); //Updates the token count display with the new token balance.
            }

        } else {
            // __ LOSING __

            console.log("YOU LOST " + bet + " TOKENS :(");
            // tokenmanager.remove shit tokens yeet
            betInput.classList.add("flip-scale-up-hor");
            betInput.value = "";

            winningAlert.classList.remove("slide-in-elliptic-top-fwd");
            winningAlert.style.display = "block";
            winningAlert.style.backgroundColor = "rgba(121, 18, 21, 0.95)";
            winningAlert.querySelector("h1").innerHTML = "You lost " + bet + " tokens :( ";
            winningAlert.classList.add("bounce-in-top");

            // __ REMOVING THE BET TOKENS FROM THE USERS BALANCE __
            if (affectUser) {
                user.tokenManager.subTokenAmount(bet);
                saveUser(user); // Updates session storage
                updateSQL(); // Updates database
                document.getElementById("tokenCount").innerText = "" + getUser().tokenManager.getCount(); //Updates the token count display with the new token balance.
            }


        }

        console.log("You're betting " + bet + " tokens on " + bettedValues);

        console.log("");

        //can currently just change number when you see what its gonna land on, make the bets bve set and disabled at spin. todo.

    }




    // [startDeg, endDeg, realValue]
    let realValues = [
        [0, 5, 0],
        [5, 14, 1],
        [14, 24, 13],
        [24, 33, 36],
        [33, 43, 24],
        [43, 52, 3],
        [52, 62, 15],
        [62, 71, 34],
        [71, 80, 22],
        [80, 90, 5],
        [90, 100, 17],
        [100, 109, 32],
        [109, 118, 20],
        [118, 128, 7],
        [128, 137, 11],
        [137, 147, 30],
        [147, 156, 26],
        [156, 165, 9],
        [165, 175, 28],
        [175, 184, 0],
        [184, 194, 2],
        [194, 203, 14],
        [203, 213, 35],
        [213, 222, 23],
        [222, 232, 4],
        [232, 241, 16],
        [241, 251, 33],
        [251, 260, 21],
        [260, 270, 6],
        [270, 279, 18],
        [279, 289, 31],
        [289, 298, 19],
        [298, 308, 8],
        [308, 317, 12],
        [317, 327, 29],
        [237, 336, 25],
        [336, 346, 10],
        [346, 355, 27],
        [355, 5, 0],
        [361, 5, 0]
    ];

    /*let betPayoffs = [
        [1, 35],
        [2, 17],
        [3, 11],
        [4, 8],
        [6, 5],
    ];*/

});

