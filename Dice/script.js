function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function updateDiceDisplay(diceElement, value) {
    const pips = diceElement.querySelectorAll('.pip');
    pips.forEach(pip => pip.style.display = 'none');
    if (value === 1) pips[2].style.display = 'block';
    if (value === 2) { pips[0].style.display = 'block'; pips[4].style.display = 'block'; }
    if (value === 3) { pips[0].style.display = 'block'; pips[2].style.display = 'block'; pips[4].style.display = 'block'; }
    if (value === 4) { pips[0].style.display = 'block'; pips[1].style.display = 'block'; pips[3].style.display = 'block'; pips[4].style.display = 'block'; }
    if (value === 5) { pips[0].style.display = 'block'; pips[1].style.display = 'block'; pips[2].style.display = 'block'; pips[3].style.display = 'block'; pips[4].style.display = 'block'; }
    if (value === 6) { pips[0].style.display = 'block'; pips[1].style.display = 'block'; pips[3].style.display = 'block'; pips[4].style.display = 'block'; pips[5].style.display = 'block'; }
    diceElement.setAttribute('data-value', value); // Update the data-value attribute
}

document.getElementById('player1-roll').addEventListener('click', () => {
    const player1Dice = document.getElementById('player1-dice');
    const player1Value = rollDice();
    updateDiceDisplay(player1Dice, player1Value);
    document.getElementById('player1-roll').style.display = 'none';
    document.getElementById('player2-roll').style.display = 'inline';
    document.getElementById('turn-prompt').textContent = "Player 2's turn";
});

document.getElementById('player2-roll').addEventListener('click', () => {
    const player2Dice = document.getElementById('player2-dice');
    const player2Value = rollDice();
    updateDiceDisplay(player2Dice, player2Value);
    document.getElementById('player2-roll').style.display = 'none';
    document.getElementById('turn-prompt').textContent = "Game Over";
    determineWinner();
});

function determineWinner() {
    const player1Value = parseInt(document.getElementById('player1-dice').getAttribute('data-value'));
    const player2Value = parseInt(document.getElementById('player2-dice').getAttribute('data-value'));
    const winnerDisplay = document.getElementById('winner');
    if (player1Value > player2Value) {
        winnerDisplay.textContent = 'Player 1 Wins!';
    } else if (player1Value < player2Value) {
        winnerDisplay.textContent = 'Player 2 Wins!';
    } else {
        winnerDisplay.textContent = 'It\'s a Tie!';
    }
}
