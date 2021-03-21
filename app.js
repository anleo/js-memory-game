'use strict';

document.addEventListener('DOMContentLoaded', () => {
	// card options

	const cardArray = [
		{
			name: 'fries',
			img: 'images/fries.png'
		},
		{
			name: 'fries',
			img: 'images/fries.png'
		},
		{
			name: 'cheeseburger',
			img: 'images/cheeseburger.png'
		},
		{
			name: 'cheeseburger',
			img: 'images/cheeseburger.png'
		},
		{
			name: 'hotdog',
			img: 'images/hotdog.png'
		},
		{
			name: 'hotdog',
			img: 'images/hotdog.png'
		},
		{
			name: 'ice-cream',
			img: 'images/ice-cream.png'
		},
		{
			name: 'ice-cream',
			img: 'images/ice-cream.png'
		},
		{
			name: 'milkshake',
			img: 'images/milkshake.png'
		},
		{
			name: 'milkshake',
			img: 'images/milkshake.png'
		},
		{
			name: 'pizza',
			img: 'images/pizza.png'
		},
		{
			name: 'pizza',
			img: 'images/pizza.png'
		},
	];

	const grid = document.querySelector('.grid');
	const resultDisplay = document.querySelector('#result');
	const messageDisplay = document.querySelector('#message');
	resultDisplay.textContent = 0;
	let cardsChosen = [];
	let cardsChosenId = [];
	let cardsWon = [];

	// create game board
	function createBoard() {
		cardArray.sort(() => .5 - Math.random());

		for (let i = 0; i < cardArray.length; i++) {
			const card = document.createElement('img');
			card.setAttribute('src', 'images/blank.png');
			card.setAttribute('data-id', i);
			card.addEventListener('click', flipCard);
			grid.appendChild(card);
		}
	}

	// checkMatches
	function checkForMatch() {
		messageDisplay.textContent = '';
		let cards = document.querySelectorAll('img');
		const optionOneId = cardsChosenId[0];
		const optionTwoId = cardsChosenId[1];

		if (cardsChosen[0] === cardsChosen[1]) {
			messageDisplay.textContent = 'You Found It!';
			cards[optionOneId].setAttribute('src', 'images/black.png');
			cards[optionTwoId].setAttribute('src', 'images/black.png');
			cardsWon.push(cardsChosen);
		} else {
			messageDisplay.textContent = 'Sorry, not this time';
			cards[optionOneId].setAttribute('src', 'images/blank.png');
			cards[optionTwoId].setAttribute('src', 'images/blank.png');
		}

		cardsChosen = [];
		cardsChosenId = [];

		resultDisplay.textContent = cardsWon.length;

		if (cardsWon.length === cardArray.length / 2) {
			messageDisplay.textContent = 'Congratulation! You found them all!';

			setTimeout(askPlayAgain, 200);
		}
	}

	function askPlayAgain() {
		const isPlayAgain = confirm('Play Again?');

		if (isPlayAgain) {
			playAgain();
		}
	}

	function reset() {
		resultDisplay.textContent = 0;
		messageDisplay.textContent = '';
		cardsChosen = [];
		cardsChosenId = [];
		cardsWon = [];

		const images = document.querySelectorAll('img');
		images.forEach((img) => grid.removeChild(img));
	}

	function playAgain() {
		reset();
		createBoard();
	}

	// flipCard
	function flipCard() {
		const cardId = this.getAttribute('data-id');

		if ((cardsChosen.length === 2) || cardsChosenId.includes(cardId) || cardsWon.find((arr) => arr.includes(cardArray[cardId].name))) {
			return;
		}

		cardsChosen.push(cardArray[cardId].name);
		cardsChosenId.push(cardId);
		this.setAttribute('src', cardArray[cardId].img);

		if (cardsChosen.length === 2) {
			setTimeout(checkForMatch, 500);
		}
	}

	createBoard();
});
