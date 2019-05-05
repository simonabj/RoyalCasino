


var paused = false;
/**
 * @method
 * @desc Sets the paused variable to true, and shows the cursor.
 */
function pause() {
    showCursor();
    paused = true;
}

/**
 * @method
 * @desc Sets the paused variable to false, and hides the cursor.
 */
function unpause() {
    hideCursor();
    paused = false;
}

/**
 * @method
 * @desc shows the cursor (by setting the body's "cursor" style to the cursor file, with default fallback.)
 */
function showCursor(){document.body.style.cursor = "url(\"gfx/curs.cur\"), default";}

/**
 * @method
 * @desc hides the cursor (by setting the body's "cursor" style to "none")
 */
function hideCursor(){document.body.style.cursor = "none";}

/**
 * @method
 * @desc hides given element
 */
Object.prototype.hide = function(){ this.style.display = "none"; };
/**
 * @method
 * @desc shows given element
 */
Object.prototype.show = function(){ this.style.display = ""; };



//
    // ==================== K E Y B O A R D   H A N D L E R ====================
        // ==================== K E Y B O A R D   H A N D L E R ====================
            // ==================== K E Y B O A R D   H A N D L E R ====================
                //
var echoKeys = false; //if true, console.log's keydown events.
var logKeys = true; //if true, logs keys in keyLog array.

/** 'keys' is an object containing the states of all until-now pressed keys.
 * when a key is pressed, it's name is put into the object and given the value "true".
 * when a key is released, it's given the value "false".
 * The keys are stored as object-keys with the name of they key as its name.
 * Use " keys.<keyName> " to return true or false.
 * F.eks.: "if(keys.shift){ <do stuff> }"
 * directional keys = "arrow"+direction
 */

var keys = {}; //all lowercase
var keysCS = {}; //CaSE SeNsItIvE
var keyLog = [];
var keyLog_limit = 100;

/**
 * @function
 * @desc logs the pressed key into keys and keysCS with value true, and runs keys_preventCombinations
 * @param event {event} - the event
 */
window.addEventListener("keydown", function (event) {
    keys[event.key.toLowerCase()] = true;
    keysCS[event.key] = true;
    keys_preventCombinations(event);
    if (echoKeys) console.log("↓ " + event.key);
});
/**
 * @function
 * @desc sets value of unpressed key to false in keys and keysCS, and runs various functions.
 * @param event {event} - the event
 */
window.addEventListener("keyup", function (event) {
    keys[event.key.toLowerCase()] = false;
    keysCS[event.key] = false;
    if(event.key === "Escape") UI.pauseMenu();
    if(logKeys){ if(keyLog.length > keyLog_limit) keyLog.shift(); keyLog.push(event.key); keyComboCheck(); } //{ keyLog.unshift(event.key); konamiCodeCheck(); if(keyLog.length > keyLog_limit) keyLog.pop(); }
    if(paused && event.key === "Enter") UI.el.mid.input.button1.click();
});

/**
 * @function
 * @desc used to prevent default handlings of certain events.
 * @param event {event} - the event
 */
function keys_preventCombinations(event) {
    /*if (keys.control) {
        event.preventDefault(event);
        console.log("prevented ctrl");
    }
    if (keys.shift) {
        event.preventDefault(event);
        console.log("prevented shift");
    }*/
}











// ============================= IMAGE HANDLER ======================= /
/**
 * @var
 * @desc Contains the currently loaded images
 * @type {{images: {}}}
 */
var imgHandler = {
    // all loaded images:
    images: {},
};

/**
 * @method
 * @desc Handles and loads an image so that it isn't .
 * @param key - the keyword to retrieve the image with
 * @param src - the image sourcefile
 * @returns {Promise<any>}
 */
imgHandler.loadImage = function (key, src) {
    let img = new Image();

    let promise = new Promise(function (callback) {
        img.onload = function () {
            this.images[key] = img;
            callback(img);
        }.bind(this);
    }.bind(this));

    img.src = src;
    return promise;
};

/**
 * @method
 * @desc Returns image with given key
 * @param key - the keyword of the desired image
 * @returns {*} - the image sourcefile
 */
imgHandler.getImage = function (key) { return this.images[key]};





/**
 * @var
 * @desc contains the game's methods and values
 * @type {{}}
 */
var Game = {};
/**
 * @method
 * @desc "Boots up" the game's by initializing it and it's gameloop (tick).
 * @param context
 */
Game.run = function (context) {
    this.ctx = context;
    this.prevElapsed = 0;

    // promise så det kjører async
    let p = this.load();
    Promise.all(p).then(function (loaded) {
        this.init();
        // requestanimationframe venter til neste ledige frame, for smoothest animations.
        window.requestAnimationFrame(this.tick);
    }.bind(this));
};

/**
 * @method
 * @desc Handles the gameloop, runs requestAnimationFrame and caps the framerate to not make it run faster on higher-refresh-rate monitors
 * @type {{new(...args: any[][]): any} | ((...args: any[][]) => any) | ((...args: any[]) => any) | any | {new(...args: any[]): any}}
 */
Game.tick = function (elapsed) {
    window.requestAnimationFrame(this.tick);

    // clear previous frame
    this.ctx.clearRect(0, 0, vw, vh);

    // calculates and caps the difference in time
    var delta = (elapsed - this.prevElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // max time difference is 250ms
    // stores the elapsed time for use in next tick
    this.prevElapsed= elapsed;

    this.update(delta);
    this.render();

}.bind(Game);


var canvas, context;
var vh = document.documentElement.clientHeight;
var vw = document.documentElement.clientWidth;

/**
 * @method
 * @desc adjusts the canvas to the viewport size, and adjusts the camera's zoom.
 */
function fitCanvasToScreen() {
    vw = document.documentElement.clientWidth;
    vh = document.documentElement.clientHeight;
    canvas.style.width = vw + "px";
    canvas.style.height = vh + "px";
    Camera.adjustZoom();
}


window.onload = function () {

    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');
    context.imageSmoothingEnabled = false;
    fitCanvasToScreen();
    // RUNS fitCanvasToScreen() on window resize
    window.onresize = function () {
        fitCanvasToScreen();
        console.log("Window size was changed, adjusting canvas.");
    };
    Game.run(context);
};






// ============== OTHER FUNCTIONS ============ //
// ============== OTHER FUNCTIONS ============ //
// ============== OTHER FUNCTIONS ============ //









// ============== FULLSCREEN ============ //







/**
 * @method
 * opens fullscreen and removes itself from the "keypress" event.
 * @private
 */
function _openFullscreenAndRemoveEventListener() {
    openFullscreen();
    document.removeEventListener("keypress", _openFullscreenAndRemoveEventListener)
}
/* (fullscreen event needs to be fired at an user action, or else, due to browser security reasons, the browser won't allow it.) */
/* Opening fullscreen when key is pressed, and removing the event listener afterwards. */
setTimeout(function () { document.addEventListener("keypress", _openFullscreenAndRemoveEventListener); }, 500);

/**
 * @method
 * @desc - enters fullscreen (must be triggered by user action)
 */
function openFullscreen() {
    let elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}
// since browsers handle fullscreen so differently, a lot of fallbacks are necessary

/**
 * @method
 * @desc - exits fullscreen (must be triggered by user action)
 */
function closeFullscreen() {
    let elem = document.documentElement;
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
}




