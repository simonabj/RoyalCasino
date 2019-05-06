/*//::::::::::::::::::::::::::::::::::::::::::::
//# Global variables
//::::::::::::::::::::::::::::::::::::::::::::

var map = {
    cols: 80,
    rows: 80,
};


//::::::::::::::::::::::::::::::::::::::::::::
//# Initializing
//::::::::::::::::::::::::::::::::::::::::::::

window.onload = function() {
    //initStage();
};


//::::::::::::::::::::::::::::::::::::::::::::
//# Initialization method
//::::::::::::::::::::::::::::::::::::::::::::

function init
*/


// ==================== # Currently Selected Map ====================
/**
 * variable currMap decides which map to display. Changing it changes the selected map to render (though at the moment the map doesn't change because of it, use changeMap() to do so.).
 * @type {maps.<WORLD NAME>.<MAP NAME>|{tilemapWidth, tilesize, layers, rows, cols, tilemap}}
 */
var currMap = maps.world1.island1_Overworld1;


var map = {
    cols: currMap.cols,
    rows: currMap.rows,
    tilesize: currMap.tilesize,
    tilemapWidth: currMap.tilemapWidth,
    zoomLevel: currMap.zoomLevel,
    movementSpeed: currMap.movementSpeed,
    bgMusic: currMap.bgMusic,

    tilemap: currMap.tilemap,
    layers: currMap.layers,
    //temp: 0,

    getTile: function (layer, col, row) {
        return this.layers[layer][row * map.cols + col];
    },
    getTilePos: function (layer, col, row) {
        let x, y, tileNumb = this.layers[layer][row * map.cols + col];

        // debugging
        //this.temp++; if (this.temp > 500000) { this.temp = 0; console.log("tileNumb=" + tileNumb + " layer=" + layer + " row=" + row + " col=" + col); }

        // calculates X coordinate of the selected tile number
        x = (tileNumb % this.tilemapWidth) * this.tilesize;
        // calculates Y coordinate of the selected tile number
        y = Math.floor(tileNumb / this.tilemapWidth) * this.tilesize;

        return [x, y];
    }
};

var loading;
function changeMap(newMap = currMap) {
    loading = true;

    // changing active image to black
    //Game.tileAtlas = imgHandler.getImage('black');

    SFX.stop(map.bgMusic, true);
    currMap = newMap;

    // ADJUSTING THE MAP VARIABLES (they only need updating when changing map)
    // (so instead of using 'get' functions in the map object, which runs a function each time a variable is called,
    // I make the variables more static, saving performance.)
    map.cols = currMap.cols;
    map.rows = currMap.rows;
    map.tilesize = currMap.tilesize;
    map.tilemapWidth = currMap.tilemapWidth;
    map.zoomLevel = currMap.zoomLevel;
    map.movementSpeed = currMap.walkSpeed;
    map.bgMusic = currMap.bgMusic;
    map.tilemap = currMap.tilemap;
    map.layers = currMap.layers;


    imgHandler.loadImage('tiles', map.tilemap);
    setTimeout(function(){

        Game.tileAtlas = imgHandler.getImage('tiles');

        // Game.load();
        Game.camera = new Camera(map, vw, vh);
        Camera.adjustZoom();

        loading = false;
        console.log("changing to "+map.name);
        Game.render();

        SFX.play(map.bgMusic,1,true);

    }, 100);

}



/*

function Camera(map, width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.maxX = map.cols * map.tilesize;
    this.maxY = map.rows * map.tilesize;
}

Camera.SPEED = function () {
    let ppx;
    if(map.movementSpeed === "running") ppx = 125;
    if(map.movementSpeed === "walking") ppx = 100;
    if(map.movementSpeed === "indoor") ppx = 75;
    if(map.movementSpeed === "slow") ppx = 50;

    return ppx;
    // pixels per second

};

Camera.prototype.move = function (delta, dirx, diry) {
    // move camera
    this.x += dirx * Camera.SPEED * delta;
    this.y += diry * Camera.SPEED * delta;
    // clamp values
    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));
};
*/
//https://github.com/mozdevs/gamedev-js-tiles/blob/gh-pages/square/logic-grid.js


Camera.adjustZoom = function (zoomLevel = map.zoomLevel) {
    canvas.width = vw / zoomLevel;
    canvas.height = vh / zoomLevel;
};

Game.load = function () {
    return [
        imgHandler.loadImage('tiles', map.tilemap),
    ];
};

Game.init = function () {/*
    Keyboard.listenForEvents(
        [Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);*/
    this.tileAtlas = imgHandler.getImage('tiles');
    this.camera = new Camera(map, vw, vh);
    Camera.adjustZoom();
    Camera.speed = function(){
        if(map.movementSpeed === "walking")
    }
};

Game.update = function (delta) {
    // handle ~~camera~~ hero movement with arrow keys
    var dirx = 0;
    var diry = 0;

    //performance improvement possible
    if(keys.arrowleft||keys.a) dirx = -1;
    if(keys.arrowright||keys.d) dirx = 1;

    if(keys.arrowup||keys.w) diry = -1;
    if(keys.arrowdown||keys.s) diry = 1;

    this.hero.move(delta, dirx, diry);
    this.camera.update();


};

let temp = 999;

Game._drawLayer = function (layer) {
    var startCol = Math.floor(this.camera.x / map.tilesize);
    var endCol = startCol + (this.camera.width / map.tilesize);
    var startRow = Math.floor(this.camera.y / map.tilesize);
    var endRow = startRow + (this.camera.height / map.tilesize);
    var offsetX = -this.camera.x + startCol * map.tilesize;
    var offsetY = -this.camera.y + startRow * map.tilesize;

    for (var c = startCol; c <= endCol; c++) {
        for (var r = startRow; r <= endRow; r++) {
            var tile = map.getTile(layer, c, r);
            var x = (c - startCol) * map.tilesize + offsetX;
            var y = (r - startRow) * map.tilesize + offsetY;
            if (tile !== -1) { // -1 => empty tile
                this.ctx.drawImage(
                    this.tileAtlas, // image
                    map.getTilePos(layer, c, r)[0],// tilemap-tile x
                    map.getTilePos(layer, c, r)[1],// tilemap-tile y
                    map.tilesize, // tilemap-tile width
                    map.tilesize, // tilemap-tile height
                    Math.round(x),  // target x
                    Math.round(y), // target y
                    map.tilesize, // target width
                    map.tilesize // target height
                );
            }
        }
    }
};

Game.render = function () {
    for (let i = map.layers.length - 1; i > -1; i--) {
        this._drawLayer(i);
    }
    // draw main character
    this.ctx.drawImage(
        this.hero.image,
        this.hero.screenX - this.hero.width / 2,
        this.hero.screenY - this.hero.height / 2);

    // draw map top layer
    this._drawLayer(1);

    //this._drawGrid();
};

Game.fadeInDOMOverlay = function(transDur){

};

Game.fadeOutDOMOverlay = function(transDur){

};

Game.textBoxObject = function(text,x="50%",y="50%"){

};

Game.textBoxFloating = function(text){

};

Game.removeTextBoxes = function(){

};









