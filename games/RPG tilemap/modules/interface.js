/*var UIFocused = function () {
    if (document.activeElement.tagName === "input") ;
};*/



var UI = {};
UI.el = {};

UI.el.mid = {};
UI.el.mid.div = document.getElementById("UI_mid");

UI.el.mid.title = document.getElementById("UI_mid_title");
UI.el.mid.text = document.getElementById("UI_mid_text");

UI.el.mid.input = {};
UI.el.mid.input.text = document.getElementById("UI_mid_input_text");
UI.el.mid.input.textLine = document.getElementById("UI_mid_input_textLine");
UI.el.mid.input.textArea = document.getElementById("UI_mid_input_textArea");
UI.el.mid.input.select = document.getElementById("UI_mid_input_select");
UI.el.mid.input.button1 = UI.el.mid.div.querySelectorAll("button")[0];
UI.el.mid.input.button2 = UI.el.mid.div.querySelectorAll("button")[1];

UI.el.commandLineDiv = document.getElementById("UI_commandLineDiv");
UI.el.commandLine = document.getElementById("UI_commandLine");

/**
 * @method
 * @desc Hides all UI HTML elements in given object by cycling through them. Supports two layers of depth, but can easily be expanded.
 * @param object - the object in which to cycle through and hide each element.
 * @param shouldUnpause {boolean} - if true, unpauses the game after hiding all elements.
 */
UI.hideAll = function (object = this.el.mid, shouldUnpause = false) {
    for (let i = 0; i < Object.keys(object).length; i++) {
        let el = object[Object.keys(object)[i]];
        if (object[Object.keys(object)[i]].style === undefined) { //duplicate this if() statement and it's contents, inside itself, to support further depth.
            let parentObj = el;
            let length = Object.keys(parentObj).length;
            for (let i = 0; i < length; i++) parentObj[Object.keys(parentObj)[i]].hide();
        } else el.hide();
    }
    if (shouldUnpause) unpause();
};
UI.hideAll();



UI.query = {};

/**
 * @method
 * @desc Creates a dialogue box with given parameters
 * @param title {string} - the title
 * @param text {string} - the text
 * @param btnText {string} - the text on the button
 * @param btnFunct {string} - the function the button runs
 */
UI.query.dialogue = function (title, text, btnText, btnFunct) {
    pause();
    // hiding all UI.mid element
    UI.hideAll();
    UI.el.mid.div.show();

    // adding the title
    if (title) UI.el.mid.title.innerHTML = title;
    if (title) UI.el.mid.title.show();
    // adding the text
    if (text) UI.el.mid.text.innerHTML = text;
    if (text) UI.el.mid.text.show();
    // adding the button
    if (btnText) { UI.el.mid.input.button1.innerHTML = btnText } else UI.el.mid.input.button1.innerHTML = "ok";
    UI.el.mid.input.button1.show();
    // adding the button functionality
    if (btnFunct !== undefined && typeof btnFunct === "function") {
        UI.el.mid.input.button1.onclick = function () {btnFunct()};
    } else UI.el.mid.input.button1.onclick = function () {
        UI.hideAll();
        unpause();
    }
};

/**
 * @method
 * @desc Creates a dialogue box with two buttons, with given parameters
 * @param title {string} - the title
 * @param text {string} - the text
 * @param preBtnText {string} - the text to the left of the button
 * @param btnText1 {string} - the text on the first button
 * @param btnText2 {string} - the text on the second button
 * @param resultHandlingFunction {string} - the function the button runs, with parameters "a" and "b" depending on which button was pressed.
 */
UI.query.yesNo = function (title, text, preBtnText, btnText1, btnText2, resultHandlingFunction) {
    pause();
    // hiding all UI.mid element
    UI.hideAll();
    UI.el.mid.div.show();
    //console.log("hiding and pausing done");

    // adding the title
    if (title) UI.el.mid.title.innerHTML = title;
    if (title) UI.el.mid.title.show();
    //console.log("title added");
    // adding the text
    if (text) UI.el.mid.text.innerHTML = text;
    if (text) UI.el.mid.text.show();
    //console.log("text added");
    //adding the pre-input text
    if (preBtnText) UI.el.mid.input.text.innerHTML = preBtnText;
    if (preBtnText) UI.el.mid.input.text.show();
    //console.log("pre-input text added");
    // adding the buttons
    if (btnText1) { UI.el.mid.input.button1.innerHTML = btnText1; } else UI.el.mid.input.button1.innerHTML = "yes";
    if (btnText2) { UI.el.mid.input.button2.innerHTML = btnText2; } else UI.el.mid.input.button2.innerHTML = "no";
    //console.log("buttons added");
    UI.el.mid.input.button1.show();
    UI.el.mid.input.button2.show();
    //console.log("buttons shown");
    UI.el.mid.input.button1.onclick = function () {resultHandlingFunction("a")};
    UI.el.mid.input.button2.onclick = function () {resultHandlingFunction("b")};
    //console.log("onclick defined");
};

/**
 * @method
 * @desc Creates a dialogue box with a text-input, with given parameters
 * @param title {string} - the title
 * @param text {string} - the text
 * @param preInputText {string} - the text to the left of the button
 * @param btnText {string} - the text on the button
 * @param btnFunct {string} - the function the button runs, with the input value as the parameter.
 */
UI.query.textReply = function (title, text, preInputText, btnText, btnFunct) {
    pause();
    // hiding all UI.mid element
    UI.hideAll();
    UI.el.mid.div.show();
    // adding the title
    if (title) UI.el.mid.title.innerHTML = title;
    if (title) UI.el.mid.title.show();
    // adding the text
    if (text) UI.el.mid.text.innerHTML = text;
    if (text) UI.el.mid.text.show();
    // adding the pre-input text
    if (preInputText) UI.el.mid.input.text.innerHTML = preInputText;
    if (preInputText) UI.el.mid.input.text.show();
    // adding the text-input
    UI.el.mid.input.textLine.show();
    // adding the button
    if (btnText) { UI.el.mid.input.button1.innerHTML = btnText; } else UI.el.mid.input.button1.innerHTML = "confirm";
    UI.el.mid.input.button1.show();
    // adding the button's function
    if (btnFunct !== undefined && typeof btnFunct === "function") {
        UI.el.mid.input.button1.onclick = function () {btnFunct(UI.el.mid.input.textLine.value)};
    } else UI.el.mid.input.button1.onclick = function () {
        UI.hideAll();
        unpause();
    };
};

UI.query.multipleChoice = function (title, query, options, resultHandlingFunction) {
    UI.hideAll();

};



// ================ PAUSE MENU ================
var zoomOptionEnabled = true;
/**
 * @method
 * @desc opens the pause menu if the game is paused, and closes it if it isn't.
 */
UI.pauseMenu = function () {
    if (!paused) {
        pause();
        UI.hideAll();
        UI.el.mid.div.show();
        UI.el.mid.title.show();
        UI.el.mid.text.show();
        UI.el.mid.input.text.show();
        UI.el.mid.input.button1.show();
        UI.el.mid.input.button2.show();
        UI.el.mid.title.innerHTML = "Game Paused";
        UI.el.mid.text.innerHTML = "" +
            "Map: " +
            "<select id='pauseMenu_mapSelect' class='input' onchange='changeMap(maps.world1[this.options[this.selectedIndex].value]); setTimeout(function(){UI.updatePauseMenu()},250)'> " +
            "   <option value='island1_Overworld1'>World 1 - Island 1</option>" +
            "   <option value='island1_House1'>World 1 - House 1</option>" +
            "</select>" +
            "<span><p>Zoom: </p><input type='range' id='pauseMenu_zoomSlider' oninput='map.zoomLevel = this.value/100; Camera.adjustZoom()' value='" + map.zoomLevel * 100 + "' min='" + Math.floor(currMap.zoomLevel / 1.30) * 100 + "' max='1000'></span>" +
            "<span><p>Volume: </p><input type='range' id='pauseMenu_volumeSlider' oninput='map.bgMusicVolume = this.value; SFX.volume(map.bgMusic, map.bgMusicVolume)' value='50' min='0' max='100'></span>";
        let mainMenu_select = document.getElementById("pauseMenu_mapSelect");
        for (let i = 0; i < mainMenu_select.options.length; i++) {
            if (maps.world1[mainMenu_select.options[i].value] === currMap) mainMenu_select.options[i].selected = true;
        }
        document.getElementById("pauseMenu_volumeSlider").value = map.bgMusicVolume;
        if (!zoomOptionEnabled) document.getElementById("pauseMenu_zoomSlider").parentElement.innerHTML = "";
        UI.el.mid.input.text.innerHTML = "Quit?";
        UI.el.mid.input.button1.innerHTML = "Yes";
        UI.el.mid.input.button2.innerHTML = "No";
        UI.el.mid.input.button1.onclick = function () { window.location.href = "../../hub/index.php" };
        UI.el.mid.input.button2.onclick = function () { UI.pauseMenu() };
    } else {
        unpause();
        UI.hideAll();
        UI.el.mid.title.innerHTML = "";
        UI.el.mid.text.innerHTML = "";
        UI.el.mid.input.text.innerHTML = "";
        UI.el.mid.input.button1.onclick = function () {};
        UI.el.mid.input.button2.onclick = function () {};
        if(UI.isFaded) UI.fadeOut(500);
    }
};
UI.updatePauseMenu = function () {
    let volumeSlider = document.getElementById("pauseMenu_volumeSlider");
    let zoomSlider = document.getElementById("pauseMenu_zoomSlider");
    volumeSlider.value = map.bgMusicVolume;
    zoomSlider.value = map.zoomLevel * 100;
    zoomSlider.min = map.zoomLevel / 2 * 100;
    Camera.adjustZoom();
};



// ================== VISUAL EFFECTS (VFX) =================== //



// ====== FADING TO BLACK ====== //
UI.isFaded = true;

/**
 * @method
 * @desc fades a dom element over the canvas to given color over given amount of time.
 * @param color {*} the color
 * @param duration {number} the transition duration
 */
UI.fadeTo = function (color, duration = 0) {
    UI.isFaded = true;
    //document.getElementById("overlapping").style.zIndex = 1001;
    document.getElementById("curtain").style.transitionDuration = duration - 100 + "ms";
    setTimeout(function () {
        document.getElementById("curtain").style.backgroundColor = color;
    }, 100);
};

/**
 * @method
 * @desc fades a dom element over the canvas to transparent over given amount of time
 * @param duration {number} the transition duration
 */
UI.fadeOut = function (duration = 0) {
    UI.isFaded = false;
    document.getElementById("curtain").style.transitionDuration = duration - 50 + "ms";
    setTimeout(function () {
        document.getElementById("curtain").style.backgroundColor = "transparent";
        /*setTimeout(function(){
            document.getElementById("overlapping").style.transitionDuration = "0ms";
            document.getElementById("overlapping").style.zIndex = -10;
        }, duration-50);*/
    }, 50);
};
















