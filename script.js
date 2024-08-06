'use strict';
// Getting the elements to manipulate through out the program.
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');

// Game buttons.
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

// Getting the players.
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Getting the current scores.
const current0El = document.querySelector(`#current--0`);
const current1El = document.querySelector(`#current--1`);

// Setting the score values to 0 as the game should begin with score 0.
score0El.textContent = 0;
score1El.textContent = 0;

// Hiding the image of the dice at the begining of the game.
// diceEl.classList.add('hidden');

// Storing the scores in an array for holding it.
// keeping the current score.
let scores, activePlayer, playing, currentScore;

// Creating an init function
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();
//  Creating the function to re-factor the code and to re-use it.
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Adding an event listener to the roll dice element for rolling of dice.
btnRollEl.addEventListener('click', function () {
  if (playing) {
    // Generating a random number over 6 numbers.
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    // Removing the hidden class from the diceEl to display the dice on the screen while we click.
    diceEl.classList.remove('hidden');
    // Setting the src attribute for the img tag based on the random number generated.
    diceEl.src = `dice-${diceNum}.png`;
    if (diceNum != 1) {
      currentScore += diceNum;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Adding an event listener on the button hold.
btnHoldEl.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

// Adding an event listener on the new game button.
btnNewEl.addEventListener('click', init);
