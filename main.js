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

let newDeck = getDeck();
shuffle(newDeck);
let pot = 0;
let board = [];
let players = [];
createPlayers();
stringHand();
let flopDrawn = false;
let turnDrawn = false;
let riverDrawn = '';




const betInput = document.getElementById('betSize');

function createPlayers(){
for (let i = 0;i<=5;i++){
    let playerTemplate = {
    hand: drawFrom(newDeck),
    position: i,
    stack: 100
    }
    players.push(playerTemplate);
}
}

function newHand(){
    newDeck = getDeck();
    shuffle(newDeck);
    flopDrawn = false;
    turnDrawn = false;
    riverDrawn = false;
    board = [];
    boardDisplay.textContent = '';
    for(let i = 0; i < players.length; i++){
        players[i].hand = drawFrom(newDeck)
    };
    stringHand();
}

function potIn(){
    let betAmount = Number(betInput.value);
    if(betAmount <= players[0].stack && betAmount > 0){
        pot += betAmount;
        players[0].stack -= betAmount;
    }
    document.getElementById('pot').textContent = `Pot:${pot}`
    document.getElementById('stack').textContent = `Stack:${players[0].stack}`
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
    const handDisplay = document.getElementById('handDisplay');
    let playerHand = players[0].hand;
    handValue = playerHand.map(card => card.value);
    handSuits = playerHand.map(card => card.suit);
    handDisplay.textContent = `${handValue[0]}${handSuits[0]},${handValue[1]}${handSuits[1]}`;
}

function stringBoard(){
    const boardDisplay = document.getElementById('boardDisplay');
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
document.getElementById('stack').textContent = `Stack:${players[0].stack}`

document.getElementById('drawHand').onclick = function () {newHand()};
document.getElementById('flopButton').onclick = function () {raise()};

