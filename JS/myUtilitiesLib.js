//_______________________________________ ETC ____________________________
/**
 * Settes til "true" om gjeldende nettleser er Google Chrome
 * @type {boolean}
 */
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (isChrome) console.log("Du bruker Chrome");







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
 * method digit inputs a number, and returns the number with the given amount of digits.
 * @param number {Number} - The number to change the amount of digits of.
 * @param digits {Number} - The amount of digits to return the number with.
 * @returns {Number} - The resulting 'number' number, with 'digits' amount of digits
 */
function digit(number, digits) {
    return Number(number).toFixed(digits);
} /* vanskelig å gjøre til prototype pga Math i javascript. */

String.prototype.capitalize = function () {
    return this[0].toUpperCase() + this.slice(1);
};
String.prototype.removeQuotes = function () {
    for (let i = 0; i < this.length; i++) {
        this[i] = this[i].replace('"', '');
        this[i] = this[i].replace("'", "");
    }
};
String.prototype.toUrl = function () { return this.replace(/ /g, "%20"); };
String.prototype.toURL = function () { return this.replace(/ /g, "%20"); };



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
//note; noen millisekund saktere enn å gå direkte med element id, tror jeg.
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



//_______________________________________ KEYSTROKES ____________________________
document.addEventListener("keypress", function () { keyIsPressed(event.keyCode); });
document.addEventListener("keydown", function () { if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) { keyIsPressed(event.keyCode) } });
var echoKeys = false;



/**
 * Method keyIsPressed inputs a unicode number and outputs the associated character, as well as triggers a secondary function with the pressed button as a parameter.
 * @param keyCode (number) - unicode koden til key'en som er presset.
 */
function keyIsPressed(keyCode) {

    //aborts operation if an input or textArea element is in focus.
    if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") return;

    let thePressedKey;
    if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {
        if (keyCode === 37) thePressedKey = "left";
        if (keyCode === 38) thePressedKey = "up";
        if (keyCode === 39) thePressedKey = "right";
        if (keyCode === 40) thePressedKey = "down";
        if (echoKeys) console.log("↓ " + thePressedKey);
        // function i can create anywhere.
        if (typeof keyPressed === "function") keyPressed(thePressedKey, keyCode);
        if (typeof keyWasPressed === "function") keyWasPressed(thePressedKey, keyCode);
        if (typeof slideshowKeyWasPressed === "function") slideshowKeyWasPressed(thePressedKey, keyCode);
    } else {
        thePressedKey = String.fromCharCode(keyCode);
        if (echoKeys) console.log("↓ " + thePressedKey);
        if (typeof keyPressed === "function") keyPressed(thePressedKey, keyCode);
        if (typeof keyWasPressed === "function") keyWasPressed(thePressedKey, keyCode);
        if (typeof slideshowKeyWasPressed === "function") slideshowKeyWasPressed(thePressedKey, keyCode);
    }
}



// _________________________ COLOR THIEF _____________________

if (isChrome) console.log("!_!_! ERROR !_!_! - As you're using Chrome, color-thief.js won't work properly." +
    "This is because of Chrome's cross-origin policies that, when you're viewing the website from your local files instead of it being web-hosted, mistakenly judges images as cross-origin." +
    "This means that the extraction of primary colors from images won't work, and thusly the functions dependant on that won't either. Color thief is therefore disabled.");

var thiefEcho = false;



/**
 * method getColor returns the main color, or color palette, in an array in RGB format, of given image element.
 * @param imgELorID - The element of which to return the color(s). Can be an ID, element, or object.
 * @param mode - optional - either "palette" or "main", if "palette"=> returns an array of the main colors, if "main"=> only returns the main color.
 * @param colorCount - optional - if "mode" is "palette", this sets the amount of colors to return.
 * @returns {Array} - an array of RGB values, formatted like this: [R, G, B]. or if palette: [[R,G,B],[R,G,B],[R,G,B], ...]
 */
function getColor(imgELorID, mode = "main", colorCount = "5") {
    let colorThief = new ColorThief();
    let sourceImage = elementFallback(imgELorID);
    //if all went correct, sourceImage should be [object HTMLImageElement].

    //let sourceImage = document.getElementById(imgELorID);
    //on chrome its getting here with the correct image, but fucks up inside this function

    console.log("getColour mode = " + mode);

    if (isChrome) return;
    if (mode === "main") return colorThief.getColor(sourceImage, 0);
    if (mode === "palette") return colorThief.getPalette(sourceImage, colorCount);
}







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







//_______________________________________ REMOVE ELEMENTS ____________________________
/**
 * Når et element oppgis med ".remove()" suffix, kjøres en funksjon som definerer outerHTML (hele elementet, inkludert tags) til ingenting.
 */
Element.prototype.remove = function () { this.outerHTML = ""; };
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () { this.outerHTML = ""; };
// f.eks.: document.getElementById("mainImage").remove();  /  document.getElementsByClassName("fancyDiv").remove();



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









//_______________________________________ AUDIO _______________
var echoAudio = false; //if echoAudio=true, reports audio events i konsoll
var currentlyPlayingAudio = new Audio(); //global variabel som følgende audio funksjoner definerer audio til, for å kunne manipulere lyd som en global variable i stedet for lokal.
// Hindrer ikke simultane lyder, men lar deg bare påvirke den nyeste lyden som blir spilt.

// TODO - Gjør om til audio classes.

/** Method playAudio() plays sound file with given filepath, once.
 * @param filePath {String} - file path with source audio + file extension. */
function playAudio(filePath) {
    currentlyPlayingAudio = new Audio(filePath);

    currentlyPlayingAudio.play();
    if (echoAudio === true) console.log("♪ started");
    endOfAudio = false;
    audioFallback(filePath);

}



/** Method playAudioEz() plays sound file from the folder "Resources/audio" with given filepath, once.
 * @param file {String} - file/file path with source audio + file extension.
 * Time-saving method for when I need to play a lot of audio, and the audio is in the resources/audio folder. */
function playAudioEz(file) {
    currentlyPlayingAudio = new Audio("Resources/audio/" + file);
    currentlyPlayingAudio.play();
    if (echoAudio === true) console.log("♪ started");
    endOfAudio = false;
    audioFallback();

}



/** method stopAudio() pauses currentlyPlayingAudio and sets it's time to 0, meaning currentlyPlayingAudio will be played from the beginning if unpaused. */
function stopAudio() {
    currentlyPlayingAudio.currentTime = 0;
    currentlyPlayingAudio.pause();
    if (echoAudio === true) console.log("♪ stopped");
}



/** method pauseAudio() pauses currentlyPlayingAudio without resetting time. */
function pauseAudio() {
    if (isAudioPlaying() === true) {
        currentlyPlayingAudio.pause();
        if (echoAudio === true) console.log("♪ paused");
    } else if (isAudioPlaying() === false) {
        currentlyPlayingAudio.play();
        if (echoAudio === true) console.log("♪ unpaused")
    }
}



/** Method isAudioPlaying() returns "true" if currentlyPlayingAudio is not paused, false if it is. */
function isAudioPlaying() {
    return !currentlyPlayingAudio.paused; //returns true if currentlyPlayingAudio is not paused
}



/** Catches audio if it fails, and replays it. Fixes some errors, like some instances of "Uncaught (in promise) DOMException" , which frequents in Chrome. */
function audioFallback() {
    const playPromise = currentlyPlayingAudio.play();
    if (playPromise !== null) {
        playPromise.catch(() => {
            currentlyPlayingAudio.play();
        });
    }
}



/** variable endOfAudio is set to true when currentlyPlayingAudio ends, and endOfAudioFunction is also triggered, to be used where needed. */
var endOfAudio = false;
currentlyPlayingAudio.onended = function () {
    console.log("♪ ended.");
    endOfAudio = true;
    audioEnded(currentlyPlayingAudio);
    currentlyPlayingAudio = "";
};



/** method fastForward adds (seconds) amount of seconds to currentlyPlayingAudio's current time.
 * @param seconds (number) - the amount of seconds to skip forwards */
function fastForward(seconds) {
    let prevTime = currentTime();

    currentlyPlayingAudio.currentTime += seconds;

    console.log(prevTime + "  ->  +" + seconds + "s  ->  " + currentTime());
}



/**
 * method currentTime returns the currentTime of the most recently played audio in minutes and seconds.
 * @returnAs {String} - if("string") returns current time as string; if("array") returns current time as an array.
 * @returns {*} - returns current time in format (minutes)m(seconds)s if returnAs==="string", or in format [minutes, seconds] if returnAs==="array".
 */
function currentTime(returnAs = "string") {
    let time = currentlyPlayingAudio.currentTime;
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60); //.toString().slice(0,-7)

    if (minutes.toString().length < 2) minutes = "0" + minutes;
    if (seconds.toString().length < 2) seconds = "0" + seconds;

    if (returnAs === "string") return minutes + "m" + seconds + "s";
    if (returnAs === "array") return [minutes, seconds];
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




