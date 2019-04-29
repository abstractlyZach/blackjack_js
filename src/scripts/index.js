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
		textArea.innerText = 'Welcome to BlackJack!';
	}
	else {
		update_scores();

		let dealerCardString = '';
		for (let i=0; i<dealerCards.length; i++) {
			dealerCardString += get_card_string(dealerCards[i]) + '\n';
		}

		let playerCardString = '';
		for (let i=0; i<playerCards.length; i++) {
			playerCardString += get_card_string(playerCards[i]) + '\n';
		}

		textArea.innerText = 
			'Dealer has: \n' +
			dealerCardString +
			'score: ' + dealerScore + '\n\n' + 

			'Player has: \n' + 
			playerCardString +
			'score: ' + playerScore + '\n\n';

		if (gameOver) {
			if (playerWon) {
				textArea.innerText += 'YOU WIN';
			}
			else {
				textArea.innerText += 'DEALER WINS';
			}
			newGameButton.style.display = 'inline';
			hitButton.style.display = 'none';
			stayButton.style.display = 'none';
		}
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

function get_score(cards) {
	let score = 0;
	let has_ace = false;
	for (let i=0; i < cards.length; i++) {
		score += get_numeric_value(cards[i]);
		if (cards[i].value === 'Ace') {
			console.log('found ace!');
			has_ace = true;
		}
	}
	if (has_ace && score + 10 <= 21 ) {
		score += 10;
	}
	return score;	
};

function get_numeric_value(card) {
	switch(card.value) {
		case 'Ace':
			return 1;
		case 'Two':
			return 2;
		case 'Three':
			return 3;
		case 'Four':
			return 4;
		case 'Five':
			return 5;
		case 'Six':
			return 6;
		case 'Seven':
			return 7;
		case 'Eight':
			return 8;
		case 'Nine':
			return 9;
		default:
			return 10;
	}
};

function update_scores() {
	dealerScore = get_score(dealerCards);
	playerScore = get_score(playerCards);

	if (playerScore > 21) {
		gameOver = true;
		playerWon = false;
	}
	
	if (dealerScore > 21) {
		gameOver = true;
		playerWon = true;
	}
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

	show_game_state();
});

hitButton.addEventListener('click', function() {
	console.log('hit!');
	playerCards.push(draw_card());
	show_game_state();
});

stayButton.addEventListener('click', function() {
	console.log('stay.');
	while (dealerScore < 17 && !gameOver) {
		dealerCards.push(draw_card());
		show_game_state();
	}
	if (!gameOver) {
		playerWon = playerScore > dealerScore;
		gameOver = true;
		show_game_state();
	}
});

