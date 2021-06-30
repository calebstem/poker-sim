const suits = ['s', 'd', 'c', 'h'];
const value = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
function getDeck(){
    const deck = new Array();
    for(let i = 0; i < suits.length; i++){
        for(let j = 0; j < value.length; j++){
            let card = {Value: value[j], Suit: suits[i]};
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
    let hand = [deck.pop(),deck.pop()];
    return hand;
}

function displayHand(){
    drawFrom(deck1);
    console.log(hand);
    return hand.value + hand.suits;
}

let deck1 = getDeck();
shuffle(deck1);

document.getElementById('drawHand').onclick = displayHand;


//document.getElementById('hand').textContent