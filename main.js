const suits = ['s', 'd', 'c', 'h']; // creates an array of all suits
const value = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']; //array of values
function getDeck(){
    const deck = new Array();
    for(let i = 0; i < suits.length; i++){ //goes through each suit
        for(let j = 0; j < value.length; j++){ //within every suit it goes through the values
            let card = {value: value[j], suit: suits[i]}; //combines suit and value
            deck.push(card); //adds new card to the array
        }
    }
    return deck; //an array containing a list of suits and value
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function shuffle(deck){ //implementation of fisher yates algorithm
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
    let flop = [deck.pop(),deck.pop(),deck.pop()];
    board = board.concat(flop);
    flopDrawn = true;
    return;
}

function drawTurn(deck){
    let turn = [deck.pop()];
    board = board.concat(turn);
    turnDrawn = true;
    return;
}

function drawRiver(deck){
    let river = [deck.pop()];
    board= board.concat(river);
    riverDrawn = true;
    return;
}

let newDeck;
let stack = 100;
let pot = 0;
let hand = '';
let board = [];
let flopDrawn = false;
let turnDrawn = false;
let riverDrawn = '';
const betInput = document.getElementById('betSize');


function newHand(){
    newDeck = getDeck();
    shuffle(newDeck);
    hand = drawFrom(newDeck);
    flopDrawn = false;
    turnDrawn = false;
    riverDrawn = false;
    board = [];
    boardDisplay.textContent = '';
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
        potIn();
        drawFlop(newDeck);
        stringBoard();
    } else if(!turnDrawn){
        potIn();
        drawTurn(newDeck);
        stringBoard();
    } else if (!riverDrawn){
        potIn();
        drawRiver(newDeck);
        stringBoard();
    }
}

function stringHand(){
    newHand();
    const handDisplay = document.getElementById('handDisplay');
    handValue = hand.map(card => card.value);
    handSuits = hand.map(card => card.suit);
    handDisplay.textContent = `${handValue[0]}${handSuits[0]},${handValue[1]}${handSuits[1]}`;
}

function stringBoard(){
    const boardDisplay = document.getElementById('boardDisplay');
    console.log(board);
    let combinedValues = '';
    boardValue = board.map(card => card.value);
    boardSuits = board.map(card => card.suit);
    for (let i = 0; i < board.length; i++){
        combinedValues += boardValue[i];
        combinedValues += `${boardSuits[i]} `;
    }
    boardDisplay.textContent = combinedValues;
}

document.getElementById('pot').textContent = `Pot:${pot}`
document.getElementById('stack').textContent = `Stack:${stack}`

document.getElementById('drawHand').onclick = function () {stringHand()};
document.getElementById('flopButton').onclick = function () {raise()};

