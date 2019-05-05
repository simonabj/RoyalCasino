//_______________________________________ ETC ____________________________
/** Settes til "true" om gjeldende nettleser er Google Chrome */
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);



// ___________________________________ K E Y S _____________________________________


var echoKeys = false; //if true, console.log's keydown events.

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
    if(logKeys){ if(keyLog.length > keyLog_limit) keyLog.shift(); keyLog.push(event.key); keyComboCheck(); } //{ keyLog.unshift(event.key); konamiCodeCheck(); if(keyLog.length > keyLog_limit) keyLog.pop(); }
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
    }*/
}


// ______________________________________ PROTOTYPES _________________________
String.prototype.capitalize = function () { return this[0].toUpperCase() + this.slice(1); };
String.prototype.removeQuotes = function () {
    for (let i = 0; i < this.length; i++) {
        this[i] = this[i].replace('"', '');
        this[i] = this[i].replace("'", "");
    }

};

//methods toUrl/toURL returns the given string with all spaces replaced with "%20".
String.prototype.toUrl = function () { return this.replace(/ /g, "%20"); };
String.prototype.toURL = function () { return this.replace(/ /g, "%20"); };
Element.prototype.remove = function () { this.outerHTML = ""; };
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () { this.outerHTML = ""; };


//_______________________________________ GENERAL ____________________________

/**
 * method getPos inputs an element and returns that elements absolute position on the page.
 * @param elementId {string} - id of element to get position of
 * @returns {number[]} - returns an array of two numbers, index 0 being the x-coordinates, and index 1 being the y-coordinates. [x,y]
 */
function getPos(elementId) {
    let rect = document.getElementById(elementId).getBoundingClientRect();
    posX = rect.left;
    posY = rect.top;
    return [rect.left, rect.top];
}



/**
 * method getAbsPos gets the absolute position of an element relative to the body.
 * @param element {Object} - the element to get the position of.
 * @returns {number[]} - returns [x, y] coordinates
 */
function getAbsPos(element) {
    let top = 0, left = 0;
    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);
    return [left, top];
}

/**
 * get the angle between two 2D points.
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns {number}
 */
function getAngle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}


/**
 * @method
 * @desc normalizes degree
 * @param deg {number} degree
 * @returns {number} normalized degree
 */
function toLowestDeg(deg) {
    if (deg > 360) while(deg > 360) deg = deg - 360;
    if (deg < -360) while(deg < -360) deg = deg + 360;
    return deg;
}


/**
 * method toUrl returns the given string with the spaces replaced with "%20".
 * @param string {String} - string to replace spaces with "%20" of
 * @returns {String} - string with all spaces replaced with "%20".
 */
function toUrl(string) {return string.replace(/ /g, "%20"); }



/**
 * method scrollTo scrolls the viewer to the given element.
 * @param el - element to scroll to.
 */
function scrollTo(el) {
    el.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
}



/**
 * method getCheckedRadio returns the value of the checked radio of given radioName
 * @param radioName {String} - the name attribute of the radios to get the value of
 * @returns {*} - the value of the radio of given name which is checked.
 */
function getCheckedRadio(radioName) {
    return document.querySelector("input[name='" + radioName + "']:checked").value;
}



/**
 * method capitalize capitalizes the first letter of the given string.
 * @param string {String} - string to capitalize
 * @returns {string} - capitalized string
 */
function capitalize(string) {
    if (typeof string !== "string") return;
    return string[0].toUpperCase() + string.slice(1);
}



/**
 * Inputs any type of element identifier (id, object or element) and returns only the element.
 * @param {string} elementOrId - Either the id, an element, or an object with the element inside.
 */
function elementFallback(anyElement) {
    let el = document.getElementById(anyElement);
    if (el === null) el = anyElement;
    if (el.id === anyElement) return el;
    if (el === undefined) el = anyElement[0];
    if (typeof el === "object") el = el[0]; //console.log("[0]'ed")}
    if (el === undefined) el = anyElement;

    return el;
}



/**
 * method randomItem returns the items in a random index of an array.
 * @param array - array to get a random item from
 * @returns {*} - the contents of the randomly chosen index, of given array.
 */
function randomItem(array) { return array[Math.floor(Math.random() * array.length)]; }



/**
 * method toHex inputs an array of an RGB color ([R,G,B]) and returns the hex code.
 * @param rgbArray {Array} - the array with the RGB color code, formatted as such: [R, G, B]
 * @returns {string} - the given RGB color converted to HEX format.
 */
function toHex(rgbArray) {
    let red = toOneHex(rgbArray[0]);
    let green = toOneHex(rgbArray[1]);
    let blue = toOneHex(rgbArray[2]);
    return "#" + red + green + blue;
}



/**
 * method toOneHex handles individual RGB values, and translates them into hex. I.E.: inputs the R(ed) value of an RGB code, and returns the color converted to hex, in two digits.
 * @param number {Number} - the r/g/b value.
 * @returns {string} - the translated hex value of given r/g/b value.
 */
function toOneHex(number) {
    if (number === null) return "00";
    let hex = number.toString(16);
    return (hex.length < 2) ? "0" + hex : hex; //if the number is 1 digit or less, prefixes "0".
}



//_______________________________________ ANIMATION TIMING PRESETS _______________________
/**
 * Lets you use predefined animation timings. I could just save the timings in a list and use them when i need to, but this is easier to remember and also a was decent practice (messy af tho).
 * @param elem_or_id_or_return (string/DOM element) if (elem_or_id_or_return === "return")=>returns timing as string | if("string") =>  applies timing style to element with string as id) or (an element = applies timing style to element.)
 * @param animTimingType (string) the name of the timing you want (animTimings).
 * @returns {string} if(elem_or_id_or_return==="return") < returns timing as string>
 */
function animTiming(elem_or_id_or_return, animTimingType) {
    let element = elementFallback(elem_or_id_or_return);

    let animationTimings = [
        ["bounce in", "cubic-bezier(0.38, 0.02, 0.41, 1.44)"],
        ["bounce in out", "cubic-bezier(.68,-0.55,.27,1.55)"],
        ["in back", "cubic-bezier(.6, -0.28, 0.74, 0.05)"],
        ["bounce in out smooothish", "cubic-bezier(0.24,-0.37, 0.49, 1.12)"],
    ];

    for (let i = 0; i < animationTimings.length; i++) {
        if (animationTimings[i][0] === animTimingType) {
            if (elem_or_id_or_return === "return") {
                return animationTimings[i][1];
            }
            element.style.animationTimingFunction = animationTimings[i][1] + " !important";
        }
    }
}



//_______________________________________ ARRAY/OBJECT MANIPULATION  ______________
/**
 * method getKeyByKeyValue() returns the name of the key which has the value given, in the given object.
 * @param object {Object} - navnet til objektet
 * @param verdi {String || Number} - verdien på key'en
 * @returns {String} - navnet til key'en
 */
function getKeyByKeyValue(object, verdi) {
    return String(object.keys(object).find(key => object[key] === verdi));
}



/**
 * method getObjByKey() returns the object inside an array which contains a given key with the given value
 * @param array {Array} - Name of the array containing the objects in question
 * @param key {String} - Name of the desired key
 * @param value {String | Number} - The value of the desired key
 * @returns {Object} - Returns the object.
 */
function getObjByKey(array, key, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
}



/**
 * method drawLine draws a line in given canvas of given coordinates in given color and width.
 * @param canvas {*} - The canvas element (in any format)
 * @param startX {Number} - the X position of the starting point
 * @param startY {Number} - the Y position of the starting point
 * @param endX {Number} - the X position of the ending point
 * @param endY {Number} - the Y position of the ending point
 * @param color {String} - the color of the line
 * @param width {Number} - width of line (1 is default)
 */
function drawLine(canvas, startX, startY, endX, endY, color, width = 1) {
    let G = canvas.getContext("2d");
    G.strokeStyle = color;
    G.lineWidth = width;
    G.save();
    G.beginPath();
    G.moveTo(startX, startY);
    G.lineTo(endX, endY);
    G.stroke();
    G.restore();
}



/**
 * method drawRect draws a rectangle in given canvas of given coordinates in given color and width.
 * @param canvas {*} - The canvas element (in any format)
 * @param upperLeftX {Number} - the X position of the starting point
 * @param upperLeftY {Number} - the Y position of the starting point
 * @param width {Number} - the width of the rectangle
 * @param height {Number} - the height of the rectangle
 * @param color {String} - the color of the rectangle.
 */
function drawRect(canvas, upperLeftX, upperLeftY, width, height, color) {
    G = canvas.getContext("2d");
    G.save();
    G.fillStyle = color;
    G.fillRect(upperLeftX, upperLeftY, width, height);
    G.restore();
}



//____________________________________ FIND SMALLEST NUMBER OF AN ARRAY ______________________
//var numbersArray1=[30,7,19,412,5,39,4,-3,1,0];
//numbersArray1.name = 'numbersArray1';
const minNumb = {
    index: function (array) {                     //alt: let min = Math.min.apply(null, numbers);
        for (let i = 0; i < array.length; i++) {
            if (array[i] < array[minIndex]) {
                var minIndex = i;
            }
        }
        return minIndex;
    },
    numb: function (array) {
        return array[minNumb.numb(array)];
    },
    delete: function (array) {
        let min = minNumb.numb(array);
        array.splice(array.indexOf(min), 1);
        return array;
    },
};
// f.eks. /** Overfører minste tall til et nytt array og fjerner det fra det gamle
// smallestNumbers.push(minNumb.index(numbersArray2))
// minNumb.delete(numbersArray2)



/**
 * coolDown disables given element for given amount of time, running functions "coolDownStart" at start and "coolDownEnd" at end, which I can use where I need.
 * @param elementId (string) - id of the element to cooldown
 * @param seconds (number) - duration of cooldown in seconds
 */
function coolDown(elementId, seconds) {
    coolDownStart(elementId);
    document.getElementById(elementId).disabled = true;
    setTimeout(function () {
        document.getElementById(elementId).disabled = false;
        coolDownEnd(elementId);
    }, seconds * 1000);
}



var isCoolDown = false;



function coolDownStart(elementId) {
    isCoolDown = true;
    document.getElementById(elementId).classList.add("disabled");
}



function coolDownEnd(elementId) {
    isCoolDown = false;
    document.getElementById(elementId).classList.remove("disabled");
}



// note; gjort om til prototype ( .removeQuotes();)
function removeQuotes(string) {
    for (let i = 0; i < string.length; i++) {
        string[i] = string[i].replace('"', '');
        string[i] = string[i].replace("'", "");
    }
    return string;
}



function getSelected(selectId) {
    let selector = document.getElementsById(selectId);
    let value = selector[selector.selectedIndex].value;
    console.log(value);
    return value;
}



function removeClassOnAnimationEnd(element, className) {
    element.addEventListener("animationend", function () {element.classList.remove(className);});
}







