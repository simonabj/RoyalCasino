/**
 * @namespace
 * @name RoyaleSubsystem
 * @desc Contains the core classes and logic for the Casino Royale System
 * @see {@link https://imgur.com/FAHWgQ6|Class Diagram} for further information
 */


//////////////////////////////////////
//                                  //
//  -----=====  TOKENS  =====-----  //
//                                  //
//////////////////////////////////////

/**
 * @class
 * @desc Represents a token used as currency
 * @memberof RoyaleSubsystem
 */
class Token {
    constructor(initialValue = 1) {
        console.assert(typeof (initialValue) === "number");
        this.tokenValue = initialValue;
    }
    getValue() {return this.tokenValue;}
    setValue(value = 1) {
        console.assert(typeof (value) === "number");
        this.tokenValue = value;
    }
}