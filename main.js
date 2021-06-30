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

let deck1 = getDeck();
shuffle(deck1);

let hand = drawFrom(deck1);
let handValue = hand.map(card => card.value);
let handSuits = hand.map(card => card.suit);
console.log(handValue);
console.log(handSuits);
console.log(hand);

const handDisplay = document.getElementById('handDisplay');
function stringHand(){
    document.getElementById('handDisplay').textContent = `${handValue[0]}${handSuits[0]},${handValue[1]}${handSuits[1]}`;
}

document.getElementById('drawHand').onclick = function(){handDisplay.textContent = `${handValue[0]}${handSuits[0]},${handValue[1]}${handSuits[1]}`};
