console.log("site loading...");

let SUITS = [
	"Diamonds",
	"Clubs",
	"Hearts",
	"Spades"
];

let VALUES = [
	"Ace", 
	'King',
	'Queen',
	'Jack',
	'Ten',
	'Nine',
	'Eight',
	'Seven',
	'Six',
	'Five',
	'Four',
	'Three',
	'Two'
];

console.log(VALUES);
console.log(SUITS);

let textArea = document.getElementById('text-area'),
	newGameButton = document.getElementById('new-game-button'),
	hitButton = document.getElementById('hit-button'),
	stayButton = document.getElementById('stay-button')
;

let gameStarted = false,
	gameOver = false,
	playerWon = false,
	dealerCards = [],
	playerCards = [],
	dealerScore = 0,
	playerScore = 0
;
var deck;

function get_new_deck(){
	deck = [];
	for (let i = 0; i < SUITS.length; i++) {
		for (let j = 0; j < VALUES.length; j++) {
			let card = {
				suit: SUITS[i],
				value: VALUES[j]
			};
			deck.push(card); 
		}
	}
};

function get_card_string(card) {
	return card.value + ' of ' + card.suit;
};

function show_game_state() {
	if (!gameStarted) {
		textArea = 'Welcome to BlackJack!';
	}
};

function shuffle_deck() {
	for (let i=0; i < deck.length; i++) {
		let swapIdx = Math.trunc(Math.random() * deck.length);
		let tmp = deck[i];
		deck[i] = deck[swapIdx];
		deck[swapIdx] = tmp;
	}
};

function draw_card() {
	return deck.shift();
};


// main()

hitButton.style.display = 'none';
stayButton.style.display = 'none';
show_game_state();

newGameButton.addEventListener('click', function() {
	gameStarted = true;
	gameOver = false;
	playerWon = false;

	get_new_deck();
	shuffle_deck();

	dealerCards = [draw_card(), draw_card()];
	playerCards = [draw_card(), draw_card()];

	newGameButton.style.display = 'none';
	hitButton.style.display = 'inline';
	stayButton.style.display = 'inline';

});

hitButton.addEventListener('click', function() {
	console.log('hit!');
});

stayButton.addEventListener('click', function() {
	console.log('stay.');
});

get_new_deck();
shuffle_deck();
for (let i=0; i < 5; i++) {
	console.log(get_card_string(draw_card()));
};

