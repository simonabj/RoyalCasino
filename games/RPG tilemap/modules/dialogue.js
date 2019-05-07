var Dialogues = {};


// =========== INTRODUCTORY QUERY SEGMENT ============= //
/**
 * @method
 * @desc starts the introductory dialogue segment
 */
Dialogues.intro = function () {
    unpause();

    // FADING IN THE DIALOGUE BOX
    UI.el.mid.div.style.opacity = 0;
    UI.el.mid.div.style.transitionDuration = "1000ms";
    setTimeout(function () {UI.el.mid.div.style.opacity = 1;}, 50);


    UI.query.dialogue("The Kingdom is in Danger!", "" +
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit! <br><br>" +
        "Main Menu: [Esc]               <br>" +
        "Movement:  [W][A][S][D]        <br>" + //Press [Esc] to open the main menu, [W][A][S][D] to move, and the space bar to attack.
        "<span style='font-size: 8pt'>Konami Code: [up][up][down][down][left][right][left][right][b][a]</span><br>",
        "Got it",
        function () {
            UI.query.textReply("Lorem Ipsum Doler!", "You're now ready to set out, but before you do, what's your name?", undefined, "confirm",
                function (reply) {
                    unpause();
                    console.log(reply);
                    window.name = reply;
                    UI.hideAll();
                    UI.fadeOut(1500);
                    UI.query.dialogue("Have fun!");
                });
        });
}();





// =========== SKYRIM SEGMENT ============= //

/**
 * @function
 * @desc starts a dialogue segment based off the Elder Scroll 5 - Skyrim's intro sequence.
 */
Dialogues.skyrimSegment = function () {

    UI.fadeTo("black");
    setTimeout(function () {UI.fadeOut(5000);}, 500);

    SFX.volume(map.bgMusic, 0, 2);
    SFX.play(dialogue_audio.skyrim.intro1, 200);
    UI.query.dialogue("Hey, you.", "You're finally awake", "yes", function () {
        SFX.stop(dialogue_audio.skyrim.intro1);
        //SFX.stop(map.bgMusic);
        SFX.play(dialogue_audio.skyrim.intro2);
        UI.query.dialogue(undefined, "You were trying to cross the border, right? Walked right into that Imperial ambush, " +
            "same as us, and that thief over there.", "...", function () {
            SFX.stop(dialogue_audio.skyrim.intro2);
            SFX.play(dialogue_audio.skyrim.intro3);
            UI.query.dialogue(undefined, "Damn you Stormcloaks. Skyrim was fine until you came along. " +
                "Empire was nice and lazy. If they hadn't been looking for you, I could've stolen that horse and be halfway to Hammerfell.", "...", function () {
                SFX.stop(dialogue_audio.skyrim.intro3);
                SFX.play(dialogue_audio.skyrim.intro4);
                UI.query.textReply(undefined, "You there. You and me - we shouldn't be here. It's these Stormcloaks the Empire wants. " +
                    "We're all brothers and sisters in binds now, thief. <br><br> *Guard interrupts* <br><br> You, what's your name?", "It's", "confirm", function (name) {
                    if (name) {
                        window.name = name;
                        UI.query.dialogue(undefined, name + "? A suitable name for a <select class='input' style='margin: 0' onchange='window.profession = this.options[this.selectedIndex].text'><option selected disabled hidden>...</option><option>thief</option><option>mage</option><option>ranger</option><option>warrior</option></select>.", "...", function () {
                            if (window.profession) {
                                SFX.stop(dialogue_audio.skyrim.intro4);
                                UI.query.yesNo("A choice", "Tell me, " + window.profession + ", what is best, Jarlsberg or Norvegia?", "Uhh, ", "Jarlsberg", "Norvegia", function (choice) {
                                    let answer, title, buttonText;
                                    if (choice === "a") {
                                        answer = "Thank the gods, for a moment there I was even afraid you were imperial, " + window.name + ".";
                                        title = "Good choice.";
                                        buttonText = "Naturally, I'm not a monster.";
                                    }
                                    if (choice === "b") {
                                        answer = "STOP! You have violated the law! Pay the court a fine or serve your sentence!";
                                        title = "Never should've come here!";
                                        buttonText = "Aw shucks, guess I deserve it for being a MONSTER.";
                                        UI.fadeTo("darkred", 15000);
                                        //setTimeout(SFX.volume(map.bgMusic, 0, 32500);
                                        setTimeout(function () {
                                            UI.fadeOut(5000);
                                            SFX.play(dialogue_audio.skyrim.pranked);
                                            UI.query.dialogue("Just kidding", "I forgive you", "Jarlsberg is still the best tho");
                                            SFX.volume(map.bgMusic, map.bgMusicVolume, 1000);
                                        }, 14000)
                                    }
                                    UI.query.dialogue(title, answer, buttonText, function () {
                                        UI.hideAll();
                                        unpause();
                                        SFX.volume(map.bgMusic, map.bgMusicVolume, 1000);
                                        if (choice === "b") setTimeout(function () {SFX.volume(map.bgMusic, 0.1, 14000)}, 1000);
                                    });
                                });
                            }
                        });
                    }
                });
            });
        });
    });
};



// This is Helgen... I used to be sweet on a girl from here. I wonder if Velod is still making that mead with juniper berries mixed in... Funny, when I was a boy Imperial walls and towers used to make me feel so safe. 'Get these prisoners out of the cart!' Why are we stopping? Why do you think? End of the line. stands up Let’s go, we shouldn’t keep the gods waiting for us.


/**
 * @method
 * @desc turns the character in given string into an array separated by spaces, and returns it as a string.
 * @param string {string} - string
 * @returns {string} - the string with characters separated by spaces
 */
function stringListify(string) {
    let arr = string.split(" ");
    for (let i = 0; i < arr.length; i++) arr[i] = '"' + arr[i] + '"';
    return arr.join(",");
}



let keyCombos = [
    konamiCode = {
        string: stringListify("ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a"),
        funct: function () { Dialogues.skyrimSegment(); },
    },
    toggleZoom = {
        string: stringListify("t o g g l e z o o m"),
        funct: function () {
            zoomOptionEnabled = !zoomOptionEnabled;
            UI.query.dialogue("", "Zoom option toggled");
        },
    },
    goHome = {
        string: stringListify("h o m e"),
        funct: function () {
            changeMap(maps.world1.island1_House1)
        }
    },
    goBack = {
        string: stringListify("b a c k"),
        funct: function () {
            changeMap(maps.world1.island1_Overworld1)
        }
    },
    mute = {
        string: stringListify("m u t e"),
        funct: function () {
            muted = !muted;
            (muted) ? SFX.volume(map.bgMusic, 0) : SFX.volume(map.bgMusic, map.bgMusicVolume);
        }
    },
    respawn = {
        string: stringListify("r e s p a w n"),
        funct: function () {changeMap(map)}
    }
];

/**
 * @method
 * @desc compares each key combination in keyCombos with the key-log, runs associated functions if it finds a match, and clears the key-log.
 */
function keyComboCheck() {
    for (let i = 0; i < keyCombos.length; i++) {
        if (JSON.stringify(keyLog).includes(keyCombos[i].string)) {
            keyCombos[i].funct();
            keyLog = [];
        }
    }
}



