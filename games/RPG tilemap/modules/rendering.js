


// ==================== # Currently Selected Map ====================
/**
 * @var
 * @desc variable currMap is the map object from which to relay the information unto "map" variable.
 * @type {maps.<WORLD NAME>.<MAP NAME>|{tilemapWidth, tilesize, layers, rows, cols, tilemap}}
 */
var currMap = maps.world1.island1_Overworld1;

/**
 * @var
 * @desc contains all the information for the current map.
 * @type {{zoomLevel: *, getTile: (function(number, number, number): (*|number)), getCol: (function(number): number), side: map.side, tilemapWidth: (*|number), tilesize: (*|number), rows: (*|number|HTMLCollectionOf<HTMLTableRowElement>|SQLResultSetRowList|string), movementSpeed: *, getRow: (function(number): number), startPos: *, tilemap: (*|string), isSolid: map.isSolid, getX: (function(number): number), getY: (function(number): number), bgMusicVolume: *, solidTiles: *, layers: (*|number[][]), bgMusic: *, cols: (*|number|string), getTilePos: (function(number, number, number): number[])}}
 */
var map = {
    cols: currMap.cols,
    rows: currMap.rows,
    tilesize: currMap.tilesize,
    tilemapWidth: currMap.tilemapWidth,

    startPos: currMap.startPos,
    zoomLevel: currMap.zoomLevel,
    movementSpeed: currMap.movementSpeed,

    bgMusic: currMap.bgMusic,
    bgMusicVolume: currMap.bgMusicVolume,

    solidTiles: currMap.solidTiles,
    tilemap: currMap.tilemap,
    layers: currMap.layers,
    //temp: 0,

    /**
     * @method
     * @desc returns tilesheet index of tile at given layer, column and row.
     * @param layer {number} - the layer of the map's layers to get
     * @param col {number} - the column
     * @param row {number} - the row
     * @returns {number} - the tilesheet index of selected tile
     */
    getTile: function (layer, col, row) { return this.layers[layer][row * map.cols + col]; },
    /**
     * @method
     * @desc - gets the XY position of given tile
     * @param layer {number} - the layer of the map's layers to check in
     * @param col {number} - the column
     * @param row {number} - the row
     * @returns {number[]} - an array with values X and Y.
     */
    getTilePos: function (layer, col, row) {
        let x, y, tileNumb = this.layers[layer][row * map.cols + col];


        //for bugfixing: this.temp++; if (this.temp > 500000) { this.temp = 0; console.log("tileNumb=" + tileNumb + " layer=" + layer + " row=" + row + " col=" + col); }

        // calculates X coordinate of the selected tile number
        x = (tileNumb % this.tilemapWidth) * this.tilesize;
        // calculates Y coordinate of the selected tile number
        y = Math.floor(tileNumb / this.tilemapWidth) * this.tilesize;
        return [x, y];
    },
    /**
     * @method
     * @desc returns column of given x coordinate
     * @param x {number} - x coordinate
     * @returns {number} - column number
     */
    getCol: function (x) {return Math.floor(x / this.tilesize)},
    /**
     * @method
     * @desc returns row of given y coordinate
     * @param y {number} - y coordinate
     * @returns {number} - row number
     */
    getRow: function (y) {return Math.floor(y / this.tilesize)},
    /**
     * @method
     * @desc returns the x coordinate of given column
     * @param col {number} - column
     * @returns {number} - x coordinate
     */
    getX: function (col) {return col * this.tilesize},
    /**
     * @method
     * @desc returns y coordinate of given row
     * @param row {number} - column
     * @returns {number} - y coordinate
     */
    getY: function (row) {return row * this.tilesize},
    /**
     * @method
     * @desc checks if given position has a tile that is solid or not, by comparing it to current map's solidTiles lookup array.
     * @param x {number} - the x position to check
     * @param y {number} - the y position to check
     * @returns {boolean} - whether or not the tile at given position is solid.
     */
    isSolid: function (x, y) {
        let column = Math.floor(x / this.tilesize);
        let row = Math.floor(y / this.tilesize), tile;
        for (let layer = 0; layer < this.layers.length; layer++) {
            tile = this.getTile(layer, column, row);
            if (this.solidTiles.includes(tile)) return true;
        }
    },
    /**
     * @method
     * @desc Returns which side of thingy A is colliding with thingy B
     * @param ah - height(A)
     * @param aw - width(A)
     * @param ax - x position(A)
     * @param ay - y position(A)
     * @param bh - height(B)
     * @param bw - width(B)
     * @param bx - x position(B)
     * @param by - y position(B)
     * @returns {String} - the side of A which is colliding with B. ("left"/"right"/"top"/"bottom")
     */
    side: function (ah, aw, ax, ay, bh, bw, bx, by) {
        //legend: h = height, w = width, x = x coord, y = y coord.
        let diffX = (ax + aw / 2) - (bx + bw / 2);
        let diffY = (ay + ah / 2) - (by + bh / 2);
        let width = (aw + bw) / 2;
        let height = (ah + bh) / 2;
        let crossWidth = width * diffY;
        let crossHeight = height * diffX;
        let collision = 'none';
        // the following code: If close enough to be colliding, checks which side.
        if (Math.abs(diffX) <= width && Math.abs(diffY) <= height) {
            if (crossWidth >= crossHeight) {
                collision = (crossWidth >= (-crossHeight)) ? 'top' : 'right';
            } else {
                collision = (crossWidth >= -(crossHeight)) ? 'left' : 'bottom';
            }

            let overlapPX;
            if (collision === "left") overlapPX = (vw - ax + aw) - bx;
            if (collision === "right") overlapPX = ax - (vw - bx + bw);
            if (collision === "top") overlapPX = (vh - ay + ah) - by;
            if (collision === "bottom") overlapPX = ay - (vh - by + bh);
            return collision; //, Math.abs(overlapPX)];
        }
        return false;
    },

};



// ==================== # Changing Map ====================
/**
 * @method
 * @desc Changes the map to given map, and handles all the transitions.
 * @param newMap {Object} - the new map-object.
 */
function changeMap(newMap) {

    // changing active image to black
    //Game.patternTable = imgHandler.getImage('black');

    UI.fadeTo("black", 150);
    setTimeout(function () {

        SFX.stop(map.bgMusic, true);

        currMap = newMap;

        // ADJUSTING THE MAP VARIABLES (they only need updating when changing the map)
        // (so instead of using 'get' functions in the map object, which runs a function each time a variable is called,
        // I make the variables static, until they need to be changed again, saving on performance.)
        map.zoomLevel = currMap.zoomLevel;
        map.tilemap = currMap.tilemap;
        map.tilesize = currMap.tilesize;
        map.tilemapWidth = currMap.tilemapWidth;
        map.solidTiles = currMap.solidTiles;
        map.layers = currMap.layers;
        map.cols = currMap.cols;
        map.rows = currMap.rows;
        map.startPos = currMap.startPos;
        map.movementSpeed = currMap.movementSpeed;
        map.bgMusic = currMap.bgMusic;
        map.bgMusicVolume = currMap.bgMusicVolume;

        // re-initializing the player with the new map
        Game.player = new Player(map, map.startPos[0], map.startPos[1]);
        Player.SPEED = map.movementSpeed;

        // re-initializing the camera with the new map
        Game.camera = new Camera(map, vw, vh);
        Game.camera.follow(Game.player);
        Camera.adjustZoom();

        loading = true;
        // changing the image with the key "tiles" to the current map's tilesheet.
        imgHandler.loadImage('tiles', map.tilemap);

        setTimeout(function () {
            Game.patternTable = imgHandler.getImage('tiles');
            Game.render();
            SFX.play(map.bgMusic, map.bgMusicVolume, true);
            UI.fadeOut(500);
        }, 250);
    }, 250);
}



// ==================== # Camera ====================
// ==================== # Camera ====================
// ==================== # Camera ====================

/**
 * @method
 * @desc Initializes the camera
 * @param map {Object} - The map object for the camera to show
 * @param width {number} - The width of the frame
 * @param height {number} - The height of the frame
 */
function Camera(map, width, height) {
    this.x = map.startPos[0] - canvas.width / 2;
    this.y = map.startPos[1] - canvas.height / 2;
    this.maxX = map.cols * map.tilesize; //- width;
    this.maxY = map.rows * map.tilesize; //- height;
    this.width = width; //width of canvas
    this.height = height; //height of canvas
}


/**
 * @method
 * @desc binds a sprite to the camera for it to follow
 * @param sprite {Object} - the sprite object to follow (usually just the player)
 */
Camera.prototype.follow = function (sprite) {
    this.following = sprite;
    sprite.screenX = 0;
    sprite.screenY = 0;
};


/**
 * @method
 * @desc updates the camera's values so that it is positioned with it's this.following object's coordinates in the center of the frame.
 */
Camera.prototype.update = function () {
    // assumes followed sprite is in the center of the screen
    this.following.screenX = canvas.width / 2;
    this.following.screenY = canvas.height / 2;

    // updating camera position to sprite's.
    this.x = this.following.x - this.following.screenX;
    this.y = this.following.y - this.following.screenY;

    // restricting the values
    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));

    // adjusting the camera if the player reaches the map corners
    // if left or right side reached
    if (this.following.x < this.width / 2 || this.following.x > this.maxX + this.width / 2) this.following.screenX = this.following.x - this.x;
    // if top or bottom side reached
    if (this.following.y < this.height / 2 || this.following.y > this.maxY + this.height / 2) this.following.screenY = this.following.y - this.y;

};



/**
 *
 * @param zoomLevel
 */
Camera.adjustZoom = function (zoomLevel = map.zoomLevel) {
    canvas.height = vh / zoomLevel;
    canvas.width = vw / zoomLevel;
    if (Game.camera) Game.camera.height = vh;
    if (Game.camera) Game.camera.width = vw;
};



function Player(map, x, y) {
    this.map = map;
    this.x = x;
    this.y = y;
    this.width = map.tilesize;
    this.height = map.tilesize;
    this.maxX = this.map.cols * this.map.tilesize;
    this.maxY = this.map.rows * this.map.tilesize;
    this.image = imgHandler.getImage("player");
}



Player.SPEED = map.movementSpeed;
Player.prototype.move = function (delta, dirx, diry) {

    if(dirx!==0) diry = 0;
    if(diry!==0) dirx = 0;

    let desiredX = dirx * Player.SPEED * delta;
    let desiredY = diry * Player.SPEED * delta;
    let collision = this._collide(desiredX, desiredY);


    if (collision) {
            if (collision === "right"){
                if (dirx < 0) this.x += dirx * Player.SPEED * delta;
                //this.y += diry * Player.SPEED * delta;
            }
            if (collision === "left"){
                if (dirx > 0) this.x += dirx * Player.SPEED * delta;
                //this.y += diry * Player.SPEED * delta;
            }
            if (collision === "bottom"){
                if (diry < 0) this.y += diry * Player.SPEED * delta;
                //this.x += dirx * Player.SPEED * delta;
            }
            if (collision === "top") {
                if (diry > 0) this.y += diry * Player.SPEED * delta;
                //this.x += dirx * Player.SPEED * delta;
            }
    } else {
        this.x += dirx * Player.SPEED * delta;
        this.y += diry * Player.SPEED * delta;
    }

    //restricting values
    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));

    if (map.bgMusic.paused && (dirx !== 0 || diry !== 0)) SFX.play(map.bgMusic, map.bgMusicVolume, true);

};


Player.prototype._collide = function (dirx, diry) {
    let left = this.x - this.width / 2;
    let right = this.x + this.width / 2 - 1;
    let top = this.y - this.height / 2;
    let bottom = this.y + this.height / 2 - 1;

    let collision = this.map.isSolid(left, top) || this.map.isSolid(right, top) || this.map.isSolid(left, bottom) || this.map.isSolid(right, bottom);

    if (collision) {
        let side = map.side(this.height, this.width, this.x, this.y, 16, 16, this.map.getX(this.map.getCol(right)), this.map.getY(this.map.getRow(bottom)));
        //if (dirx > 0/* && side === "right" */) this.x = -1 - this.width / 2 + this.map.getX(this.map.getCol(right));
        //if (dirx < 0/* && side === "left" */) this.x = 1 + this.width / 2 + this.map.getX(this.map.getCol(left) + 1);
        //if (diry > 0/* && side === "bottom" */) this.y = -1 - this.height / 2 + this.map.getY(this.map.getRow(top) + 1);
        //if (diry < 0/* && side === "top" */) this.y = 1 + this.height / 2 + this.map.getY(this.map.getRow(bottom));

        return side;
    } else return false;
};


/**
 * @method
 * @desc loads up the current map's tilemap, and the player image file (which is going to be changed into a canvas drawn animation based on player actions, but i aint got time)
 * @returns {*[]}
 */
Game.load = function () {
    return [
        imgHandler.loadImage('tiles', map.tilemap),
        imgHandler.loadImage('player', "gfx/player.png"),
    ];
};

/**
 * @method
 * @desc init initializes the player object, the camera, and the background image tilesets.
 */
Game.init = function () {
    this.player = new Player(map, map.startPos[0], map.startPos[1]);
    this.patternTable = imgHandler.getImage('tiles');
    this.camera = new Camera(map, vw, vh);
    this.camera.follow(this.player);
    Camera.adjustZoom();
    //UI.fadeOut(500); // - commented out as it's handled by the introductory dialogue
};

/**
 * @method
 * @param delta - the difference in pixels
 */
Game.update = function (delta) {
    // only proceeds if not paused
    if (!paused) {
        var dirx = 0;
        var diry = 0;
        if (document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
            if (keys.a || keys.arrowleft || keys.j) dirx = -1;
            if (keys.d || keys.arrowright || keys.l) dirx = 1;
            if (keys.w || keys.arrowup || keys.i) diry = -1;
            if (keys.s || keys.arrowdown || keys.k) diry = 1;

            if ((keys.a && keys.d) || (keys.arrowleft && keys.arrowright)) dirx = 0;
            if ((keys.w && keys.s) || (keys.arrowdown && keys.arrowup)) diry = 0;
        }

        this.player.move(delta, dirx, diry);
        this.camera.update();
        //Hero.move(delta, dirx, diry);
        //this.camera.update();

    }
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
                    this.patternTable, // image
                    map.getTilePos(layer, c, r)[0],// tilemap-tile x
                    map.getTilePos(layer, c, r)[1],// tilemap-tile y
                    map.tilesize, // tilemap-tile width
                    map.tilesize, // tilemap-tile height
                    Math.round(x),  // target x
                    Math.round(y), // target y
                    map.tilesize, // target width
                    map.tilesize, // target height
                );
            }
        }
    }
};

Game.render = function () {
    for (let i = map.layers.length - 1; i >= 0; i--) {
        this._drawLayer(i);
    }
    this.ctx.drawImage(
        this.player.image,
        this.player.screenX - this.player.width / 2,
        this.player.screenY - this.player.height / 2,
    );

    //this._drawLayer(map.layers[map.layers.length-1]);

    // draw main character
    /*this.ctx.drawImage(
        this.hero.image,
        this.hero.screenX - this.hero.width / 2,
        this.hero.screenY - this.hero.height / 2);*/

    // draw map top layer
    //this._drawLayer(1);

    //this._drawGrid();
};










