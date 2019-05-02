

var winningAlert = document.getElementById("winningAlert");

var alert = {};


alert.won = function(wonAmount){
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
            winningAlert.classList.remove("slide-out-elliptic-bottom-bck");
        }, 700)
    }, 3500);
};

alert.lost = function(lostAmount){
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
        }, 700)
    }, 3500);
};




