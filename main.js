const suits = ['s', 'd', 'c', 'h'];
const value = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
function getDeck(){
    const deck = new Array();
    for(let i = 0; i < suits.length; i++){
        for(let j = 0; j < value.length; j++){
            let card = {value: value[j], suit: suits[i]};
            deck.push(card);
        }
    }
    return deck;
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function shuffle(deck){
    let j = 0;
    for (let i = (deck.length - 1); i >= 1; i--){
        j = randomIntFromInterval(0, i)
        let temp = deck[j];
        deck[j] = deck[i];
        deck[i] = temp;
    }
}

function drawFrom(deck){
    return [deck.pop(),deck.pop()];
}

function drawFlop(deck){
    flop = [deck.pop(),deck.pop(),deck.pop()];
    return flop;
}

function drawTurn(deck){
    turn = [deck.pop()];
    return turn;
}

function drawRiver(deck){
    river = [deck.pop()];
    return river;
}

let newDeck;
let stack = 100;
let pot = 0;
let hand = '';
let flop = '';
let flopDrawn = false;
let turn = '';
let turnDrawn = false;
let river = '';
let riverDrawn = '';
const betInput = document.getElementById('betSize');


function newHand(){
    newDeck = getDeck();
    shuffle(newDeck);
    hand = drawFrom(newDeck);
    flopDrawn = false;
    turnDrawn = false;
    riverDrawn = false;
    return hand;
}

function potIn(){
    let betAmount = Number(betInput.value);
    if(betAmount <= stack && betAmount > 0){
        pot += betAmount;
        stack -= betAmount;
    }
    document.getElementById('pot').textContent = `Pot:${pot}`
    document.getElementById('stack').textContent = `Stack:${stack}`
}

function raise(){
    if(!flopDrawn){
        stringFlop();
    } else if(!turnDrawn){
        stringTurn();
    } else if (!riverDrawn){
        stringRiver();
    }
}

function stringHand(){
    newHand();
    const handDisplay = document.getElementById('handDisplay');
    handValue = hand.map(card => card.value);
    handSuits = hand.map(card => card.suit);
    handDisplay.textContent = `${handValue[0]}${handSuits[0]},${handValue[1]}${handSuits[1]}`;
}

let stringFlop = (function(){
    const flopDisplay = document.getElementById('flopDisplay');
    return function() {
        if (!flopDrawn){
            flopDrawn = true;
            potIn();
            drawFlop(newDeck);
            handValue = flop.map(card => card.value);
            handSuits = flop.map(card => card.suit);
            flopDisplay.textContent = `${handValue[0]}${handSuits[0]},${handValue[1]}${handSuits[1]},${handValue[2]}${handSuits[2]}`;
        }
    };
})();

let stringTurn = (function(){
    const turnDisplay = document.getElementById('turnDisplay');
    return function() {
        if (!turnDrawn){
            turnDrawn = true;
            potIn();
            drawTurn(newDeck);
            handValue = turn.map(card => card.value);
            handSuits = turn.map(card => card.suit);
            turnDisplay.textContent = `${handValue[0]}${handSuits[0]}`;
        }
    };
})();

let stringRiver = (function(){
    const riverDisplay = document.getElementById('riverDisplay');
    return function() {
        if (!riverDrawn){
            riverDrawn = true;
            potIn();
            drawRiver(newDeck);
            handValue = river.map(card => card.value);
            handSuits = river.map(card => card.suit);
            riverDisplay.textContent = `${handValue[0]}${handSuits[0]}`;
        }
    };
})();

document.getElementById('pot').textContent = `Pot:${pot}`
document.getElementById('stack').textContent = `Stack:${stack}`

document.getElementById('drawHand').onclick = function () {stringHand()};
document.getElementById('flopButton').onclick = function () {raise()};

