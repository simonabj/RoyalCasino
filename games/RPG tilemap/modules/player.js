

var Player = {
    tilesheet: "sheets/player.png",
    x: 0,
    y: 0,
    speed: 0,
    speedMode: "walking",

};

Player.init = function(){

};

Player.loop

Player.speed = function(){
    if(map.movementSpeed === undefined || map.movementSpeed === "free"){
        if(Player.movementSpeed === "running") ppx = 125;
        if(Player.movementSpeed === "walking") ppx = 100;
        if(Player.movementSpeed === "indoor") ppx = 75;
        if(Player.movementSpeed === "slow") ppx = 50;
    }
    return ppx;
};







