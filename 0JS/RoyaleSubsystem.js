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
const save = (key, object, location = "session") => {
    if (location === "session") {
        sessionStorage.setItem(key, JSON.stringify(object));
    } else if (location === "local") {
        localStorage.setItem(key, JSON.stringify(object));
    } else {
        console.error("Save location '" + location + "' is invalid!");
    }
};

/**
 * Update the userObject in sessionStorage'
 * @memberOf RoyaleSubsystem
 * @param userObject {RoyaleSubsystem.User} - The altered user object. Preferably from {@link getUser|getUser()}.
 */
const saveUser = (userObject) => {
    console.assert(userObject instanceof User, "userObject not instance of User!");
    save("user", userObject);
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
    if (location === "session") {
        if(sessionStorage.getItem(key) === null) return false;
        let result = JSON.parse(sessionStorage.getItem(key));
        if (parent !== undefined) {
            console.assert(result instanceof parent, "Parent must be class of expected result!");
            result.__proto__ = parent.prototype;
        }
        return result;
    } else if (location === "local")
        return JSON.parse(localStorage.getItem(key));
    else console.error("Location '" + location + "' is invalid!");
};

/**
 * Returns the user, and fixes prototype issues from serialization.
 * @memberOf RoyaleSubsystem
 * @returns {RoyaleSubsystem.User} - The user object
 */
const getUser = () => {
    let result = JSON.parse(sessionStorage.getItem("user"));
    result.tokenManager.tokenBalance = Number(result.tokenManager.tokenBalance);
    result.tokenManager.__proto__ = TokenManager.prototype; // Fix TokenManager instance
    result.__proto__ = User.prototype; // Fix User instance
    console.assert(result instanceof User && result.tokenManager instanceof TokenManager);
    return result;
};

//////////////////////////////////////
//                                  //
//  -----=====  CONFIG  =====-----  //
//                                  //
//////////////////////////////////////

/**
 * @desc Contains configuration values for the system
 * @memberOf RoyaleSubsystem
 * @constant
 */
const System = {
    /**
     * @type {number}
     * @desc Amount of tokens you get for invites
     * @memberOf RoyaleSubsystem.System
     */
    InviteTokenGift: 500
};

/////////////////////////////////////////
//                                     //
//  -----===== EXCEPTIONS  =====-----  //
//                                     //
/////////////////////////////////////////

/**
 * @name Exceptions
 * @namespace
 * @desc Contains descriptive exceptions for error handling
 */

/**
 * @desc A basic exception. Superclass of all subsystem-exception
 * @memberOf Exceptions
 */
class Exception {
    constructor(message) {
        this.message = message;
        this.type = "Exception";
        this.name = this.type + ": " + this.message;
    }

    toString() {
        console.error(this.type + ": " + this.message);
    }
}

/**
 * @extends Exception
 * @desc An exception which indicates that a number is not valid for a given operation.
 * An example might be when a number is too large or too small.
 * @memberOf Exceptions
 */
class InvalidNumberException extends Exception {
    constructor(message) {
        super(message);
        this.type = "InvalidNumberException";
    }
}

/**
 * @extends Exception
 * @desc An exception which indicates that the type of a variable is not what is
 * expected. An example might be passing a string to an addition function.
 * @memberOf Exceptions
 */
class InvalidTypeException extends Exception {
    constructor(message) {
        super(message);
        this.type = "InvalidTypeException";
    }
}

/////////////////////////////////////////////////
//                                             //
//  -----=====  EXCEPTION HELPERS  =====-----  //
//                                             //
/////////////////////////////////////////////////

/**
 * @desc Error handling for numbers
 * @memberOf RoyaleSubsystem
 * @param number {number} - The variable to check
 * @param min {number|undefined}[undefined] - The minimum value the number should be
 * @param max {number|undefined}[undefined] - The maximum value the number should be
 * @param minMessage {string}[Number is too small] - Exception message when number is too small
 * @param maxMessage {string}[Number is too big] - Exception message when number is too big
 * @param typeMessage {string}[Value must be of type number] - Exception message when variable is not a number
 */
const checkNumber = (number=1, min=undefined, max=undefined, minMessage = "Number too small", maxMessage = "Number too big", typeMessage = "Value must be of type number") => {

    if(typeof(number) !== "number")
        throw new InvalidTypeException(typeMessage);
    if(min !== undefined && number < min)
        throw new InvalidNumberException(minMessage);
    if(max !== undefined && number > max)
        throw new InvalidNumberException(maxMessage);

};

//////////////////////////////////////
//                                  //
//  -----=====  TOKENS  =====-----  //
//                                  //
//////////////////////////////////////

/**
 * @class
 * @name TokenBalance
 * @desc Contains functions to manage a users token
 * @memberOf RoyaleSubsystem
 */

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
     * @param tokensGained {number} - Amount of tokens won in total
     * @param tokensLost {number} - Amount of tokens lost in total
     * @throws InvalidTypeException
     */
    constructor(initialAmount = 0, tokensGained = 0, tokensLost = 0) {
        /**
         * @member {RoyaleSubsystem.TokenBalance}
         * @desc The amount of tokens a user has.
         */
        if (typeof (initialAmount) !== "number")
            throw new InvalidTypeException("Initial amount must be of type number");
        this.tokenBalance = initialAmount;
        if (typeof (tokensGained) !== "number")
            throw new InvalidTypeException("Tokens gained must be of type number");
        this.tokensGained = tokensGained;
        if (typeof (tokensLost) !== "number")
            throw new InvalidTypeException("Tokens lost must be of type number");
        this.tokensLost = tokensLost;

        this.pendingBet = 0;
    }

    /**
     * @desc Returns the amount of tokens a user has.
     * @method
     * @memberOf RoyaleSubsystem.TokenBalance
     * @returns {number|*}
     */
    getCount() {
        return this.tokenBalance
    }

    /**
     * @desc Add an amount of tokens to tokenBalance
     * @method
     * @memberOf RoyaleSubsystem.TokenBalance
     * @param amount {number} - The amount to add
     * @throws InvalidNumberException|InvalidTypeException
     */
    addTokenAmount(amount) {
        checkNumber(amount, 0,undefined, "Amount must be greater than 0");
        this.tokenBalance += amount;
        this.tokensGained += amount;
    }

    /**
     * @desc Subtract an amount of tokens from tokenBalance
     * @method
     * @memberOf RoyaleSubsystem.TokenBalance
     * @param amount {number} - Amount to subtract from tokens
     * @throws Exceptions.InvalidNumberException
     */
    subTokenAmount(amount) {
        checkNumber(amount, 1, this.tokenBalance, "Amount must be greater than 0", "Amount must be less than tokenBalance");
        this.tokenBalance -= amount;
        this.tokensLost += amount;
    }

    /**
     * @desc Set the amount of a token in tokenBalance
     * @method
     * @memberOf RoyaleSubsystem.TokenBalance
     * @param amount {number} - Amount to set token to
     * @throws Exceptions.InvalidNumberException|Exceptions.InvalidTypeException
     */
    setTokenAmount(amount) {
        checkNumber(amount,0,undefined);
        this.tokenBalance = amount;
    }

    bet(amount) {
        checkNumber(amount,1, this.tokenBalance, "Cannot bet 0 tokens", "Bet cannot be greater than balance");
        this.tokenBalance -= amount;
        this.pendingBet += amount;
    }

    /**
     * @desc Confirms the pending bet. Either returning the tokens or subtracting them from account.
     * @method
     * @memberOf RoyaleSubsystem.TokenBalance
     * @param result {boolean} - Should the bet be returned?
     * @param payout {number|undefined}[undefined] - Payout from the bet. Will be set equal to bet size if undefined.
     */
    resolveBet(result, payout=undefined) {
        if(result) {
            this.tokenBalance += this.pendingBet;
            if(payout === undefined)
                this.addTokenAmount(this.pendingBet);
            else {
                checkNumber(payout);
                this.addTokenAmount(payout);
            }
        } else {
            this.tokensLost += this.pendingBet;
        }
        this.pendingBet = 0;
    }
}

//////////////////////////////////////////
//                                      //
//  -----====== USER SYSTEM  =====----  //
//                                      //
//////////////////////////////////////////

/**
 * @class
 * @desc User object. Used to manage each users settings and tokens.
 * @memberOf RoyaleSubsystem
 */
class User {
    constructor(username = "testUser", email = "test@mail.it", balance = 0, portraitURL = "", inviteAmount = 0, tokensGained = 0, tokensLost = 0) {
        this.username = username;
        this.email = email;
        this.tokenManager = new TokenManager(balance, tokensGained, tokensLost);
        this.portrait = portraitURL;
        this.invites = inviteAmount;
    }
}

/**
 * @method
 * @memberOf RoyaleSubsystem
 * @async
 * @desc Updates session from SQL database
 */
const updateSession = async (username = undefined) => {

    let promise = validateLogin((result, resolve, reject) => {
        if (!result) {
            reject("Not logged in");
        }
        resolve(result);
    });

    promise.then((result) => {

        console.log("VALIDATION: " + (result ? "SUCCESS" : "FAILURE"));

        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/0JS/sub/updateSession.php", true);

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                /**
                 * @private
                 * @type {{mail:string,balance:number,tokensGained:number,tokensLost:number,profilePicture:string,amountInvites:number}|number}
                 */
                let response = JSON.parse(xhttp.response);

                if (response !== 0) {
                    let newUserData = new User(
                        (username === undefined) ? getUser().username : username,
                        response.mail,
                        Number(response.balance),
                        response.profilePicture,
                        response.amountInvites,
                        Number(response.tokensGained),
                        Number(response.tokensLost)
                    );

                    saveUser(newUserData);
                    console.log("UserSession updated from SQL successfully!");

                    user = newUserData;
                } else {
                    console.error("Bad request!");
                }

            }
        };
        xhttp.send();
    }, () => {
        window.location.replace("/0PHP/logout.php");
    });
};

/**
 * @method
 * @memberOf RoyaleSubsystem
 * @desc Updates database from session
 */
const updateSQL = () => {

    let userObject = getUser();

    let _attr =
        "username=" + userObject.username +
        "&mail=" + userObject.email +
        "&balance=" + userObject.tokenManager.getCount() +
        "&gained=" + userObject.tokenManager.tokensGained +
        "&lost=" + userObject.tokenManager.tokensLost +
        "&profilePicture=" + userObject.portrait +
        "&amountInvites=" + userObject.invites;

    // Setup XMLHttp
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/0JS/sub/updateSQL.php", true);

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            console.log("Update response: " + xhttp.response);
        }
    };
    xhttp.send(_attr);
};

//////////////////////////////////////////
//                                      //
//  -----====== LOAD-SYSTEM  =====----  //
//                                      //
//////////////////////////////////////////


/**
 * @function
 * @name ValidationCallback
 * @param {boolean} result - Result of validation
 * @param {PromiseLike<*>|*} resolve - Promise when callback is complete
 * @param {*} [reject] - Rejection reason. Used to determine outcome of promise
 * @memberOf RoyaleSubsystem
 */

/**
 * @memberOf RoyaleSubsystem
 * @desc Validates user login (server-side).
 * @see {@link RoyaleSubsystem.ValidationCallback| ValidationCallback} for more info on callback structure
 * @param {RoyaleSubsystem.ValidationCallback} callback - Callback function to handle validation result
 * @returns {Promise<*>}
 */
const validateLogin = async (callback) => {

    let result = await new Promise(resolve => {
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/0JS/sub/validateLogin.php", true);

        // Give 2000ms to confirm login. Can be changed later
        xhttp.timeout = 2000;

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                resolve(JSON.parse(xhttp.response));
            }
        };
        xhttp.onerror = () => resolve(xhttp.error);

        xhttp.ontimeout = () => resolve(xhttp.error);

        xhttp.send();
    });

    let localSession = get("user");

    return new Promise((resolve, reject) => callback(result.test === 1 && localSession !== false, resolve, reject));
};

let user = undefined;

/**
 * @desc Checks availability of user variable
 * @function
 * @memberOf RoyaleSubsystem
 * @return {boolean} - User availability
 */
const userAvailable = () => {
    return (user !== undefined);
};

/**
 * @desc Confirm login, and initialize subsystem
 * @function
 * @memberOf RoyaleSubsystem
 */
const init_royale = () => {
    updateSession()
};