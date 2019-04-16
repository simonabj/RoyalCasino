/**
 * @namespace
 * @name RoyaleSubsystem
 * @desc Contains the core classes and logic for the Casino Royale System
 * @see {@link https://imgur.com/FAHWgQ6|Class Diagram} for further information
 */


///////////////////////////////////////
//                                   //
//  -----=====  STORAGE  =====-----  //
//                                   //
///////////////////////////////////////

/**
 * Store an object at the given location
 * @memberOf RoyaleSubsystem
 * @param key {string} - The key to save the object as
 * @param object {*} - The object to save
 * @param location {string} - Where to save the object
 */
const save = (key, object, location="session") => {
    if(location === "session") {
        sessionStorage.setItem(key, JSON.stringify(object));
    } else if(location === "local") {
        localStorage.setItem(key, JSON.stringify(object));
    } else {
        console.error("Save location '"+ location +"' is invalid!");
    }
};

/**
 * Return a stored object from given location
 * @memberOf RoyaleSubsystem
 * @param key {string} - Key to get from storage
 * @param parent {*} - Parent class. Used to fix prototype issues from serialization
 * @param location {string} - Location from which to retrieve value. Either 'session' or 'local'.
 * @returns {*} - Object from storage
 */
const get = (key, parent = undefined, location = "session") => {
    if(location === "session") {
        let result = JSON.parse(sessionStorage.getItem(key));
        if(parent !== undefined) {
            console.assert(result instanceof parent, "Parent must be class of expected result!");
            result.__proto__ = parent.prototype;
        }
        return result;
    }
    else if(location === "local")
        return JSON.parse(localStorage.getItem(key));
    else console.error("Location '" + location + "' is invalid!");
};

/**
 * Returns the user, and fixes prototype issues from serialization.
 * @memberOf RoyaleSubsystem
 * @returns {User} - The user object
 */
const getUser = () => {
    let result = JSON.parse(sessionStorage.getItem("user"));
    result.tokenManager.__proto__ = TokenManager.prototype;
    console.assert(result.tokenManager instanceof TokenManager, "tokenManager not instance of TokenManager!");
    return result;
};

//////////////////////////////////////
//                                  //
//  -----=====  CONFIG  =====-----  //
//                                  //
//////////////////////////////////////

/**
 * @desc Contains configuration values for the system
 * @name System
 * @memberOf RoyaleSubsystem
 * @constant
 */
const System = {
    /**
     * @type {number}
     * @desc Value of each token in NOK
     */
    TokenValue: 1.25
};

//////////////////////////////////////
//                                  //
//  -----=====  TOKENS  =====-----  //
//                                  //
//////////////////////////////////////

/**
 * @class
 * @desc Represents a token used as currency
 * @memberOf RoyaleSubsystem
 */
class Token {
    /**
     * @constructor
     * @method
     * @param tokenValue {number} - Value of token in units
     */
    constructor(tokenValue = 1) {
        console.assert(typeof (tokenValue) === "number", "Token value must be a number");
        this.tokenValue = tokenValue;
    }

    /**
     * @desc Get the value of a token
     * @method
     * @returns {number}
     */
    getValue() {return this.tokenValue;}

    /**
     * @desc Set the value of a token
     * @method
     * @param value {number} - Set the value of the token
     */
    setValue(value = 1) {
        console.assert(typeof (value) === "number", "Token value must be a number");
        this.tokenValue = value;
    }
}

/**
 * @enum
 * @desc Enumeration of token values
 * @name TokenValues
 * @constant
 * @memberOf RoyaleSubsystem
 */
const TokenValues = {
    /**
     * @type {number}
     * @desc Token of value 1
     */
    TOKEN_1: 0,

    /**
     * @type {number}
     * @desc Token of value 5
     */
    TOKEN_5: 1,

    /**
     * @type {number}
     * @desc Token of value 10
     */
    TOKEN_10: 2,

    /**
     * @type {number}
     * @desc Token of value 25
     */
    TOKEN_25: 3,

    /**
     * @type {number}
     * @desc Token of value 50
     */
    TOKEN_50: 4
};

/**
 * @class
 * @desc A manager to keep track of and use tokens.
 * @memberOf RoyaleSubsystem
 */
class TokenManager {
    /**
     * @constructor
     * @method
     * @param initialAmount {number} - Initial token count
     */
    constructor(initialAmount = 0) {
        this.tokenBalance = initialAmount;
    }

    getCount() { return this.tokenBalance}

    /**
     * @desc Add an amount of tokens to tokenBalance
     * @method
     * @param amount {number} - The amount to add
     */
    addTokenAmount(amount) {
        this.tokenBalance += amount;
    }

    /**
     * @desc Subtract an amount of tokens from tokenBalance
     * @method
     * @param amount - Amount to subtract from tokens
     */
    subTokenAmount(amount) {
        console.assert(this.tokenBalance >= amount, "Resulting amount must be greater or equal to 0");
        this.tokenBalance -= amount;
    }

    /**
     * @desc Set the amount of a token in tokenBalance
     * @method
     * @param amount {number} - Amount to set token to
     */
    setTokenAmount(amount) {
        console.assert(amount >= 0, "Amount must be greater or equal to 0");
        this.tokenBalance = amount;
    }

    /**
     * @desc Returns the value of all tokenBalance in tokenBalance, based of the token value in the config.
     * @method
     * @returns {number} The total value of tokens in tokenBalance.
     */
    getTokenValue() {
        return this.tokenBalance * System.TokenValue;
    }
}

//////////////////////////////////////////
//                                      //
//  -----====== GAME SYSTEM  =====----  //
//                                      //
//////////////////////////////////////////


/**
 * @interface
 * @desc Interface to keep track of game states
 * @memberOf RoyaleSubsystem
 */
class Game {
    /**
     * @constructor
     * @method
     * @param gameName {string} - The game name
     */
    constructor(gameName = "Game1") {
        this.gameName = gameName;
    }

    /**
     * @method
     * @abstract
     * @desc Starts the game
     */
    startGame() {

    }

    /**
     * @method
     * @abstract
     * @desc Precede to the next game phase
     */
    nextTurn() {

    }

    /**
     * @method
     * @abstract
     * @desc Ends the game
     */
    endGame() {

    }

}


//////////////////////////////////////////
//                                      //
//  -----====== USER SYSTEM  =====----  //
//                                      //
//////////////////////////////////////////

class User {
    constructor(username = "testUser", email = "test@mail.it", isLoggedIn = false, balance = 0, portraitURL = "", inviteAmount = 0) {
        this.username = username;
        this.email = email;
        this.tokenManager = new TokenManager(balance);
        this.isLoggedIn = isLoggedIn;
        this.portrait = portraitURL;
        this.invites = inviteAmount;
    }
}

//////////////////////////////////////////
//                                      //
//  -----====== CARD SYSTEM  =====----  //
//                                      //
//////////////////////////////////////////

/**
 * @enum
 * @name Cards
 * @desc Enumeration of cards
 * @constant
 * @memberOf RoyaleSubsystem
 * @property SPADE_A {number} - Ace of spades
 * @property SPADE_2 {number} - 2 of spades
 * @property SPADE_3 {number} - 3 of spades
 * @property SPADE_4 {number} - 4 of spades
 * @property SPADE_5 {number} - 5 of spades
 * @property SPADE_6 {number} - 6 of spades
 * @property SPADE_7 {number} - 7 of spades
 * @property SPADE_8 {number} - 8 of spades
 * @property SPADE_9 {number} - 9 of spades
 * @property SPADE_10 {number} - 10 of spades
 * @property SPADE_J {number} - Jack of spades
 * @property SPADE_Q {number} - Queen of spades
 * @property SPADE_K {number} - King of spades
 * @property HEART_A {number} - Ace of hearts
 * @property HEART_2 {number} - 2 of hearts
 * @property HEART_3 {number} - 3 of hearts
 * @property HEART_4 {number} - 4 of hearts
 * @property HEART_5 {number} - 5 of hearts
 * @property HEART_6 {number} - 6 of hearts
 * @property HEART_7 {number} - 7 of hearts
 * @property HEART_8 {number} - 8 of hearts
 * @property HEART_9 {number} - 9 of hearts
 * @property HEART_10 {number} - 10 of hearts
 * @property HEART_J {number} - Jack of hearts
 * @property HEART_Q {number} - Queen of hearts
 * @property HEART_K {number} - King of hearts
 * @property CLUBS_A {number} - Ace of clubs
 * @property CLUBS_2 {number} - 2 of clubs
 * @property CLUBS_3 {number} - 3 of clubs
 * @property CLUBS_4 {number} - 4 of clubs
 * @property CLUBS_5 {number} - 5 of clubs
 * @property CLUBS_6 {number} - 6 of clubs
 * @property CLUBS_7 {number} - 7 of clubs
 * @property CLUBS_8 {number} - 8 of clubs
 * @property CLUBS_9 {number} - 9 of clubs
 * @property CLUBS_10 {number} - 10 of clubs
 * @property CLUBS_J {number} - Jack of clubs
 * @property CLUBS_Q {number} - Queen of clubs
 * @property CLUBS_K {number} - King of clubs
 * @property DIAMOND_A {number} - Ace of diamonds
 * @property DIAMOND_2 {number} - 2 of diamonds
 * @property DIAMOND_3 {number} - 3 of diamonds
 * @property DIAMOND_4 {number} - 4 of diamonds
 * @property DIAMOND_5 {number} - 5 of diamonds
 * @property DIAMOND_6 {number} - 6 of diamonds
 * @property DIAMOND_7 {number} - 7 of diamonds
 * @property DIAMOND_8 {number} - 8 of diamonds
 * @property DIAMOND_9 {number} - 9 of diamonds
 * @property DIAMOND_10 {number} - 10 of diamonds
 * @property DIAMOND_J {number} - Jack of diamonds
 * @property DIAMOND_Q {number} - Queen of diamonds
 * @property DIAMOND_K {number} - King of diamonds
 */
/** @private */
const Cards = {
    SPADE_A: 0,
    SPADE_2: 1,
    SPADE_3: 2,
    SPADE_4: 3,
    SPADE_5: 4,
    SPADE_6: 5,
    SPADE_7: 6,
    SPADE_8: 7,
    SPADE_9: 8,
    SPADE_10: 9,
    SPADE_J: 10,
    SPADE_Q: 11,
    SPADE_K: 12,
    HEART_A: 13,
    HEART_2: 14,
    HEART_3: 15,
    HEART_4: 16,
    HEART_5: 17,
    HEART_6: 18,
    HEART_7: 19,
    HEART_8: 20,
    HEART_9: 21,
    HEART_10: 22,
    HEART_J: 23,
    HEART_Q: 24,
    HEART_K: 25,
    CLUBS_A: 26,
    CLUBS_2: 27,
    CLUBS_3: 28,
    CLUBS_4: 29,
    CLUBS_5: 30,
    CLUBS_6: 31,
    CLUBS_7: 32,
    CLUBS_8: 33,
    CLUBS_9: 34,
    CLUBS_10: 35,
    CLUBS_J: 36,
    CLUBS_Q: 37,
    CLUBS_K: 38,
    DIAMOND_A: 39,
    DIAMOND_2: 40,
    DIAMOND_3: 41,
    DIAMOND_4: 42,
    DIAMOND_5: 43,
    DIAMOND_6: 44,
    DIAMOND_7: 45,
    DIAMOND_8: 46,
    DIAMOND_9: 47,
    DIAMOND_10: 48,
    DIAMOND_J: 49,
    DIAMOND_Q: 50,
    DIAMOND_K: 51
};

//TODO: ADD SUPPORT FOR MULTIPLE PLAYERS
/**
 @enum
 * @name DeckEnum
 * @desc Enumeration of cards
 * @constant
 * @memberOf RoyaleSubsystem
 * @property MAIN {number} - The main deck
 * @property DISCARD {number} - The discard pile
 * @property PLAYER {number} - The player deck
 */
/** @private */
const DeckEnum = {
    MAIN: 0,
    DISCARD: 1,
    PLAYER: 2
};

//TODO: ADD SUPPORT FOR MULTIPLE PLAYERS.
/**
 * @class
 * @desc Manager class to keep track of cards and decks
 * @memberOf RoyaleSubsystem
 */
class CardManager {
    /**
     * @constructor
     * @method
     */
    constructor() {
        this.deck = [];
        for(let i = 0; i < 52; i++) {
            this.deck.push(i);
        }
        this.deckMask = Math.round(Math.pow(2,52)-1);
        this.playerDeck = [];
        this.playerMask = 0;
        this.discardPile = [];
        this.discardMask = 0;
    }

    /**
     * @method
     * @desc Shuffles the deck
     */
    shuffle() {

    }


    /**
     * @method
     * @desc Deals an amount of cards to all players
     * @param amount {number} - Amount of cards to deal players
     */
    deal(amount) {


    }


    /**
     * @deprecated Only one player to deal cards.
     * @method
     * @desc Deals an amount of cards to specified player index
     * @param player {number} - Player index to deal cards
     * @param amount {number} - Amount of cards to deal player
     */
    dealPlayer(player, amount) {

    }

    /**
     * @method
     * @desc Try to move cardMask from source deck and put them in target deck
     * @param cardMask {number} - Cards to move in CardMask form
     * @param source {DeckEnum} - Deck to move cards from
     * @param target {DeckEnum} - Deck to move cards to
     * @param toBottom {boolean} - Should the cards go on the bottom of target deck?
     */
    moveCards(cardMask, source, target, toBottom=true) {

    }

    /**
     * @method
     * @desc Discard cards from source deck
     * @param cardMask {number} - Cards to put on discard pile
     * @param source {DeckEnum} - Deck to discard from
     */
    discard(cardMask, source) {

    }

}