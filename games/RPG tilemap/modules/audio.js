


var muted = false;




// ==================== PREPARED AUDIO ====================
// ==================== PREPARED AUDIO ====================
// ==================== PREPARED AUDIO ====================

var music = {


    // OUTSIDE
    island1: new Audio("sfx/music/island1.ogg"),
    cave: new Audio("sfx/music/cave.ogg"),
    //mystical: new Audio("sfx/music/twilightsBayCity.ogg"),

    // INDOOR
    home: new Audio("sfx/music/home.ogg"), //undertale
  /*  house: new Audio("sfx/music/house.ogg"),

    // SITUATIONAL
    battle: new Audio("sfx/music/battle.ogg"),
    battle2: new Audio("sfx/music/battle2.ogg"),
    healthRegained: new Audio("sfx/music/healthRegained.ogg"),
    foundTreasure: new Audio("sfx/music/foundTreasure.ogg"),
*/

};
/*
var ambient = {
    chirp: new Audio("sfx/ambient/chirp.ogg"),
    wind1: new Audio("sfx/ambient/wind1.ogg"),
    wind2: new Audio("sfx/ambient/wind2.ogg"),
    wind3: new Audio("sfx/ambient/wind3.ogg"),
};

var sfx = {

    // PLAYER
    swordSlash: new Audio("sfx/character/swordSlash.ogg"),
    step: new Audio("sfx/character/step.oog"),

    // MONSTER
    entGrunt: new Audio("sfx/monsters/grunt.ogg"),

    // ETC
    //sfx1: new Audio("sfx/"),
    //sfx2:,
    //sfx3:,
    //sfx4:,
    temp: [],
};
*/



var dialogue_audio = {
    skyrim: {
        intro1: new Audio("sfx/dialogue/skyrimOpening (1).ogg"),
        intro2: new Audio("sfx/dialogue/skyrimOpening (2).ogg"),
        intro3: new Audio("sfx/dialogue/skyrimOpening (3).ogg"),
        intro4: new Audio("sfx/dialogue/skyrimOpening (4).ogg"),
        pranked: new Audio("sfx/dialogue/pranked.ogg"),
    }
};






// ==================== SFX OBJECT ====================
// ==================== SFX OBJECT ====================
// ==================== SFX OBJECT ====================

var SFX = {};


/**
 * @method
 * @desc changes source of existing Audio object.
 * @param sound {Object} - the Audio object.
 * @param newSoundUrl {string} - the filepath of the new source
 */
SFX.change = function (sound, newSoundUrl) {
    sound = new Audio(newSoundUrl);
};

/**
 * @method
 * @desc plays existing Audio object
 * @param sound {Object} the Audio object.
 * @param volume {number} the volume [0 <= x >= 100]
 * @param doesRepeat {boolean} if true, adds event listener on "ended" which sets currentTime to 0.
 */
SFX.play = function (sound, volume = 1, doesRepeat = false) {
    //sound.pause;
    //sound.currentTime = 0;

    if (doesRepeat) sound.onended = function () {SFX.restart(sound)};
    SFX.volume(sound, volume);
    sound.play();

};


/**
 * @method
 * @desc pauses given audio.
 * @param sound {Object} - the Audio object
 */
SFX.pause = function (sound) {
    sound.pause();
};


/**
 * @method
 * @desc restarts the given audio.
 * @param sound
 */
SFX.restart = function (sound) {
    console.log("restarting " + sound.key);
    sound.pause();
    sound.currentTime = 0;
    sound.play();
};

/**
 * @method
 * @desc changes volume of given audio, with a transition if given a transition duration
 * @param sound {Object} - the audio
 * @param volume {number} - the volume
 * @param transitionDurationS {number} - the transition duration
 */
SFX.volume = function (sound, volume, transitionDurationS) {

    if(!muted){

        if (volume > 1) volume /= 100;
        if (volume < 0) volume = 0;
        if (volume > 1) volume = 1;
        //volume *= 0.5;

        if (!transitionDurationS) {
            sound.volume = volume;
        } else {
            let targetVol = volume;
            let initVol = sound.volume;
            let difference = volume - sound.volume;
            let stop = false;
            let ticking;
            /**
             * function tick()
             */
            let tick = function () {
                if ((difference > 0 && sound.volume >= targetVol - 0.1) || (difference < 0 && sound.volume <= targetVol + 0.1)) {
                    clearTimeout(ticking);
                    sound.volume = volume;
                } else {
                    console.log(sound.volume);
                    sound.volume = sound.volume - 0.01;
                    ticking = setTimeout(function () { tick(); }, 10 * transitionDurationS);
                }
            };

            tick();
        }
    } else sound.volume = 0;
};

/**
 * @method
 * @desc pauses given audio, resets currentTime, and removes "ended" eventListener to stop potential looping.
 * @param sound {Object} the Audio object.
 * @param stopRepeat {boolean} - if true, removes "ended" SFX.restart event listener.
 */
SFX.stop = function (sound, stopRepeat = false) {
    if (stopRepeat) sound.onended = undefined;//sound.removeEventListener("ended", SFX.restart(sound));
    sound.currentTime = 0;
    sound.pause();
};


/**
 * @method
 * @desc stops all audio in a given object.
 * @param list - the object containing the audio.
 */
SFX.stopAll = function (list = music) {
    for (let i = 0; i < Object.keys(list).length; i++) {
        let key = Object.keys(list)[i];
        list[key].currentTime = 0;
        list[key].pause();
    }
};




/**
 * @method
 * @desc creates a temporary audio variable from a url, stores it in sounds.temp, plays it, and removes it once the audio has ended.
 * @param soundUrl {String} - the audio url.
 * @param volume {Number} - the volume [0 <= x >= 100]
 */
SFX.playTemp = function (soundUrl, volume) {
    let slot;
    // finding the first free slot
    for (let i = 0; i < sfx.temp.length; i++) {
        if (sfx.temp[i] === undefined || sfx.temp[i] === "") {
            slot = sfx.temp[i];
            break;
        }
    }
    // creating a free slot if none are found
    if (slot === undefined) slot = sfx.temp[sfx.temp.length + 1];

    slot = new Audio(soundUrl);
    slot.currentTime = 0;
    SFX.volume(slot.volume, volume);
    slot.play();

    slot.addEventListener("ended", function () {
        slot.pause();
        slot.currentTime = 0;
        slot.removeEventListener("ended", SFX.restart(sound));
        slot = undefined; //note- vet ikke enda, men det kan hende dette skaper problem og må forandres til en "solid" value, som "" eller 0. finding the first free slot will still need to check for undefined as well however.
    });
};



