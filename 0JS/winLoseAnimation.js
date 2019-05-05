var container = document.createElement("span");
container.style.width = "100vw";
container.style.height = "100vh";
container.style.position = "absolute";
container.style.top = "0";
container.style.zIndex = "-100";
container.style.margin = "0";
container.style.display = "flex";
container.style.flexDirection = "row";
container.style.justifyContent = "center";
container.style.alignItems = "center";


var winningAlert = document.createElement("div");
winningAlert.id = "winningAlert";
winningAlert.innerHTML = "<h1></h1>"
window.addEventListener("load", function () {
    container.appendChild(winningAlert);
    document.body.appendChild(container);
});

var alert = {};

/**
 * @method
 * @desc shows a pop-up displaying amount of tokens won
 * @param wonAmount {number} - won amount
 */
alert.won = function (wonAmount) {
    container.style.zIndex = "100";
    winningAlert.classList.remove("bounce-in-top");
    winningAlert.querySelector("h1").innerHTML = "YOU WON " + wonAmount + " TOKENS!";
    winningAlert.style.display = "block";
    winningAlert.style.backgroundColor = "rgba(71, 15, 121, 0.95)";

    //sliding in
    winningAlert.classList.add("slide-in-elliptic-top-fwd");
    //sliding out
    setTimeout(function () {
        winningAlert.classList.remove("slide-in-elliptic-top-fwd");
        winningAlert.classList.add("slide-out-elliptic-bottom-bck");
        setTimeout(function () {
            winningAlert.style.display = "none";
            container.style.zIndex = "-100";
            winningAlert.classList.remove("slide-out-elliptic-bottom-bck");
        }, 700)
    }, 3500);
};

/**
 * @method
 * @desc shows a pop-up displaying amount of tokens lost
 * @param lostAmount {number} - lost amount
 */
alert.lost = function (lostAmount) {
    container.style.zIndex = "100";
    winningAlert.classList.remove("slide-in-elliptic-top-fwd");
    winningAlert.querySelector("h1").innerHTML = "You lost " + lostAmount + " tokens :( ";
    winningAlert.style.display = "block";
    winningAlert.style.backgroundColor = "rgba(121, 18, 21, 0.95)";

    //sliding in
    winningAlert.classList.add("bounce-in-top");

    //sliding out
    setTimeout(function () {
        winningAlert.classList.remove("bounce-in-top");
        winningAlert.classList.add("slide-out-bck-bottom");
        setTimeout(function () {
            winningAlert.style.display = "none";
            winningAlert.classList.remove("slide-out-bck-bottom");
            container.style.zIndex = "-100";
        }, 700)
    }, 3500);
};


winningAlert.addEventListener("animationend", function () {
    winningAlert.classList.remove("slide-in-elliptic-top-fwd");
    winningAlert.classList.remove("bounce-in-top");
});



