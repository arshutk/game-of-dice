/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

'use strict';

// Selecting Elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');

const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const dice = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function(){
    scores = [0 ,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0.textContent = 0;
    score1.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;

    dice.classList.remove('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
};

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer ? 0: 1;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
};


// Rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){
        // 1/ Generating random dice roll
        const diceValue = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        dice.classList.remove('hidden');
        // dice['src'] = `./img/dice-${diceValue}.png`
        dice.src = `./img/dice-${diceValue}.png`

        // 3. Check for rolled
        if(diceValue !== 1){
        // Add dice to current score
        currentScore += diceValue; 
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
    else{
        // Switch to next player
        switchPlayer();
    }
    }
});

// Holding functionlaity
btnHold.addEventListener('click', function(){
    if(playing){
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >= 100
        if(scores[activePlayer] >= 100){
            // Finish the game    
            playing = false;
            dice.classList.add('hidden')
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        }
        else{
            // Switch to the next player
            switchPlayer();
        }    
    }   
})

// New game functionality
btnNew.addEventListener('click', init)

init();