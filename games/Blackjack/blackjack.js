Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(let i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};


const Cards = {
    SA: 0, S2: 1, S3: 2, S4: 3, S5: 4, S6: 5, S7: 6, S8: 7, S9: 8, S10: 9, SJ: 10, SQ: 11, SK: 12,
    HA: 13, H2: 14, H3: 15, H4: 16, H5: 17, H6: 18, H7: 19, H8: 20, H9: 21, H10: 22, HJ: 23, HQ: 24, HK: 25,
    CA: 26, C2: 27, C3: 28, C4: 29, C5: 30, C6: 31, C7: 32, C8: 33, C9: 34, C10: 35, CJ: 36, CQ: 37, CK: 38,
    DA: 39, D2: 40, D3: 41, D4: 42, D5: 43, D6: 44, D7: 45, D8: 46, D9: 47, D10: 48, DJ: 49, DQ: 50, DK: 51
};

const CardValues = {
    SA: 1, S2: 2, S3: 3, S4: 4, S5: 5, S6: 6, S7: 7, S8: 8, S9: 9, S10: 10, SJ: 10, SQ: 10, SK: 10,
    HA: 1, H2: 2, H3: 3, H4: 4, H5: 5, H6: 6, H7: 7, H8: 8, H9: 9, H10: 10, HJ: 10, HQ: 10, HK: 10,
    CA: 1, C2: 2, C3: 3, C4: 4, C5: 5, C6: 6, C7: 7, C8: 8, C9: 9, C10: 10, CJ: 10, CQ: 10, CK: 10,
    DA: 1, D2: 2, D3: 3, D4: 4, D5: 5, D6: 6, D7: 7, D8: 8, D9: 9, D10: 10, DJ: 10, DQ: 10, DK: 10
};

const cardWidth = 170;
const cardHeight = 238;

let profit = 0;

let userCardIndex = 0;
let dealerCardIndex = 0;

let dealerCards = [];

let cm = undefined;

function g(id) {
    return document.getElementById(id);
}

function getKeyFromValue(object, val) {

    for (let key in object) {
        if(object.hasOwnProperty(key))
            if(object[key] === val) return key;
    }
    return false;
}

function hasCard(deck, cardCode) {

    let count = 0; // Amount of cards found given cardCode

    for (let i = 0; i < deck.length; i++) { // Loop through each card in deck

        for (let cardsKey in Cards) { // Loop through each property to get keys

            let n = Cards[cardsKey]; // Get the card number.

            if(n === deck[i]) { // If it is this card:
                if(cardsKey.includes(cardCode)) count++; // Increase count, if card is in deck
                break; // Break out to deck loop
            }

        }


    }
    return count;
}

function calcScore(deck = []) {
    let numAce = 0;
    let score = 0;

    // For each card in deck
    for(let i = 0; i < deck.length; i++) {
        let cardValue = CardValues[getKeyFromValue(Cards, deck[i])];
        if(cardValue === 1) {
            numAce++;
            continue;
        }
        score += cardValue;
    }

    // For each Ace
    if(numAce >= 2) { score += numAce }
    else if(numAce === 1 && score + 11 <= 21) { score += 11 }
    else if(numAce === 1) score++;

    console.log("Score: " + score);

    return score;
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function createCard(cardId,owner, reveal=false) {

    let code = getKeyFromValue(Cards,cardId);

    let img = document.createElement("img");

    console.log("Creating card!");

    img.setAttribute("width", ""+cardWidth);
    img.setAttribute("height", ""+cardHeight);
    img.setAttribute("face", code);

    img.src = (!reveal)?"./img/BACK.png" : "./img/"+code+".svg";
    img.classList.add("bj-card");
    img.setAttribute("owner",owner);
    img.setAttribute("id", "Card-"+code);

    return img;
}

function showChoices() {
    g("hitBtn").style.opacity = "1";
    g("standBtn").style.opacity = "1";
}

function hideChoices() {
    g("hitBtn").style.opacity = "0";
    g("standBtn").style.opacity = "0"
}

let userChoice = undefined;

function choose() {
    return new Promise(resolve => {
        let id = setInterval(() => {
            console.log("Check if clicked...");
            if (userChoice !== undefined) {
                clearInterval(id);
                console.log("User clicked on " + userChoice);
                resolve(userChoice);
            }
        }, 200);
    });
}

async function getUserChoice() {
    showChoices();

    userChoice = undefined;

    let result = await choose();

    hideChoices();

    return result;
}

class CardManager {
    constructor() {
        this.deck = [];
        this.dealerDeck = [];
        this.playerDeck = [];
        this.discard = [];

        for (let cardsKey in Cards) {
            this.deck.push(Cards[cardsKey]);
        }
    }

    shuffle() {
        let shuffleOrder = [];
        let positionSet = [];

        for (let i = 0; i < this.deck.length; i++) {
            positionSet.push(i);
        }

        while (positionSet.length > 0) {

            let index = getRandomInt(0, positionSet.length - 1);
            shuffleOrder.push(positionSet[index]);
            positionSet.splice(index, 1);

        }

        let newDeckOrder = [];

        for (let i = 0; i < shuffleOrder.length; i++) {
            newDeckOrder[shuffleOrder[i]] = this.deck[i];
        }

        console.log("ShuffleOrder:");
        console.log(shuffleOrder);
        this.deck = newDeckOrder;
    }

    deal(amount, deck = "player") {

        // Dealing always happens from top => index 0
        let cardsToDeal = this.deck.splice(0, amount);

        console.log("Dealing to " + deck);
        console.log(cardsToDeal);


        if (deck === "player") { // Add the cards to player deck
            this.playerDeck = this.playerDeck.concat(cardsToDeal);
            for(let i = 0; i < cardsToDeal.length; i++) {
                let card = createCard(cardsToDeal[i],"player", true);
                g("cardContainer").appendChild(card);

                let box = g("playerArea").getBoundingClientRect();

                card.style.top = box.top + 5 + "px";
                card.style.left = box.left + (userCardIndex * (cardWidth + 5)) + 2 + "px";
                userCardIndex++;
            }
        }
        else if (deck === "dealer") { // Add the cards to player deck
            this.dealerDeck = this.dealerDeck.concat(cardsToDeal);
            for(let i = 0; i < cardsToDeal.length; i++) {
                let card = createCard(cardsToDeal[i],"player", i===0);
                g("cardContainer").appendChild(card);

                dealerCards.push(card);

                let box = g("dealerArea").getBoundingClientRect();

                card.style.top = box.top + 5 + "px";
                card.style.left = box.left + (dealerCardIndex * (cardWidth + 5)) + 2 + "px";
                dealerCardIndex++;
            }
        }
        else {  // Add the cards to player deck
            this.discard = this.discard.concat(cardsToDeal);
        }

        return cardsToDeal;
    }

    retrieveCards() {
        this.deck = this.deck.concat(this.playerDeck).concat(this.dealerDeck);
        this.playerDeck = [];
        this.dealerDeck = [];
    }
}

async function start() {

    cm = new CardManager();

    profit = 0;

    do {

        g("cardContainer").childNodes.remove();
        userCardIndex = 0;
        dealerCardIndex = 0;
        dealerCards = [];

        let result = await playRound();

        if (result === "PUSH") {

            console.log("PUSH!");
            user.tokenManager.resolveBet(true, 0);

        } else if (result === "PLAYER WIN") {

            console.log("YOU WON!");
            profit += user.tokenManager.pendingBet;
            user.tokenManager.resolveBet(true);

        } else if (result === "PLAYER LOSE") {

            console.log("YOU LOST!");
            profit -= user.tokenManager.pendingBet;
            user.tokenManager.resolveBet(false);

        } else if (result === "BLACKJACK") {

            profit += Math.floor(user.tokenManager.pendingBet * 1.5);
            user.tokenManager.resolveBet(true, Math.floor(user.tokenManager.pendingBet * 1.5));

        } else if (result === "BUST") {

            console.log("YOU BUSTED!");
            profit -= user.tokenManager.pendingBet;
            user.tokenManager.resolveBet(false);

        } else if (result === "DEALER BUST") {

            console.log("DEALER BUSTED!");
            profit += user.tokenManager.pendingBet;
            user.tokenManager.resolveBet(true);

        }

        saveUser(user);
        updateSQL();

        cm.retrieveCards();
    } while(confirm("Play again?"));

    console.log();
    console.log("You " + ((profit >= 0)?"earned":"lost") + " a total of " + Math.abs(profit) + " tokens!");
    console.log();
    console.log("Thanks for playing!");
}

async function playRound() {

    cm.shuffle();
    cm.shuffle();
    cm.shuffle();

    let bet = 0;
    let choice;
    let score;

    do {
        bet = Number(prompt("Place your bet:"));
    } while (!(typeof (bet) === "number" && bet <= user.tokenManager.getCount() && bet > 0));

    user.tokenManager.bet(bet);

    cm.deal(2, "player");

    cm.deal(2, "dealer");

    score = calcScore(cm.playerDeck);


    // User choice
    choice = await getUserChoice();


    // Hit loop
    while(choice === "hit") {


        // Hit
        cm.deal(1, "player");

        score = calcScore(cm.playerDeck);

        if(score > 21) {
            return "BUST";
        }

        choice = await getUserChoice();
    }

    //
    // Stand
    //

    let dealer1Card = dealerCards[1].getAttribute("face");
    console.log("Dealer has " + dealer1Card);
    document.getElementById("Card-"+dealer1Card).remove();

    let card = createCard(cm.dealerDeck[1],"dealer", true);
    let box = g("dealerArea").getBoundingClientRect();
    card.style.top = box.top + 5 + "px";
    card.style.left = box.left + ((dealerCardIndex-1) * (cardWidth + 5)) + 2 + "px";
    g("cardContainer").appendChild(card);


    // Blackjack
    if(score === 21 && cm.playerDeck.length === 2) {
        return "BLACKJACK";
    }

    let dealerBust = false;

    // Amount of aces dealer has
    let dealerAces = hasCard(cm.dealerDeck, "A");
    let dealerScore = calcScore(cm.dealerDeck);

    // Dealer hit on Soft 17
    let dealerHit = (dealerScore <= 16 || (dealerScore <= 17 && dealerScore > 0));

    while(dealerHit) {


        // Wait for 1 second
        await new Promise(resolve => {setTimeout(()=>resolve(1), 1000)});

        // Deal a card
        cm.deal(1, "dealer");

        // Calculate score and aces
        dealerScore = calcScore(cm.dealerDeck);
        dealerAces = hasCard(cm.dealerDeck, "A");

        // Check if dealer bust
        if(dealerScore > 21) {
            dealerBust = true;
            return "DEALER BUST";
        }

        // Determine if dealer should hit
        dealerHit = (dealerScore <= 16 || (dealerScore <= 17 && dealerAces > 0));
    }

    console.log(score);

    console.log("\n\n");

    console.log("Decks: ");
    console.log("Player: ");
    console.log(cm.playerDeck);
    console.log("PlayerScore: " + score);
    console.log();
    console.log("Dealer: ");
    console.log(cm.dealerDeck);
    console.log("DealerScore: " + dealerScore);

    if(score > dealerScore) { // Win
        return "PLAYER WIN";
    } else if(score === dealerScore) {
        return "PUSH";
    } else {
        return "PLAYER LOSE";
    }
}