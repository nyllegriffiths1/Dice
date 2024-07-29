$(document).ready(function() {
    let currentPlayer = 1;
    const scores = [0, 0]; // Total scores for both players
    let currentScore = 0; // Current round score for the active player
    const winningScore = 31;

    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function switchPlayer() {
        currentScore = 0; // Reset the current score for the next player
        $(`#current${currentPlayer}`).text(currentScore);
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        $('#roll1, #hold1').prop('disabled', currentPlayer !== 1);
        $('#roll2, #hold2').prop('disabled', currentPlayer !== 2);
    }

    function updateCurrentScore(score) {
        currentScore += score;
        $(`#current${currentPlayer}`).text(currentScore);
    }

    function holdScore() {
        const combinedScore = scores[currentPlayer - 1] + currentScore;

        if (combinedScore > winningScore) {
            alert(`Player ${currentPlayer} loses!`);
            resetGame();
            return;
        } else if (combinedScore >= winningScore - 6) {
            scores[currentPlayer - 1] += currentScore;
            $(`#score${currentPlayer}`).text(scores[currentPlayer - 1]);

            if (scores[currentPlayer - 1] === winningScore) {
                alert(`Player ${currentPlayer} wins!`);
                resetGame();
            } else {
                switchPlayer();
            }
        } else {
            alert(`You can only hold your score if your combined score is within 6 of the winning score.`);
        }
    }

    function resetGame() {
        scores[0] = 0;
        scores[1] = 0;
        currentScore = 0;
        $('#score1, #current1').text('0');
        $('#score2, #current2').text('0');
        $('#dice-img').attr('src', '/images/dice-1.svg');
        currentPlayer = 1;
        $('#roll1, #hold1').prop('disabled', false);
        $('#roll2, #hold2').prop('disabled', true);
    }

    $('.roll-btn').click(function() {
        const diceRoll = rollDice();
        $('#dice-img').attr('src', `/images/dice-${diceRoll}.svg`);
        updateCurrentScore(diceRoll);
    });

    $('.hold-btn').click(function() {
        holdScore();
    });

    $('#reset-btn').click(resetGame);
});
