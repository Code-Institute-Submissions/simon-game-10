jQuery(document).ready(function() {
    $.getScript('https://simon-game-3-kmaaallen.c9users.io/assets/js/gameData.js');
});


function newGame() {
    gameData.count = 0;
    gameData.gameSequence = [];
    gameData.playerSequence = [];
    newRound();
}

function newRound() {
    generateSequence();
    showSequence();
}

function generateSequence() {
    gameData.gameSequence.push(Math.floor(Math.random() * 4 + 1));
    gameData.count++;
    displayCount();
}

function showSequence() {
    segment.clickoff();
    var i = 0;
    let sequence = setInterval(function() {
        displaySequence(i);
        i++;
        if (i >= gameData.gameSequence.length) {
            clearInterval(sequence);
            playerInput();
        }
    }, 1000);
}

function displaySequence(i) {
    if (gameData.powerStatus === true) {
        if (gameData.gameSequence[i] === 1) {
            colour(redAudio, 1, 'red-light');
        }
        else if (gameData.gameSequence[i] === 2) {
            colour(yellowAudio, 2, 'yellow-light');
        }
        else if (gameData.gameSequence[i] === 3) {
            colour(greenAudio, 3, 'green-light');
        }
        else {
            colour(blueAudio, 4, 'blue-light');
        }
        gameData.playerSequence = [];
    }
    else {
        return;
    }
}

function playerInput() {
    function playerclick(colourAudio, id, className) {
        gameData.playerSequence.push(id);
        colour(colourAudio, id, className);
        if (gameData.playerSequence.length < gameData.gameSequence.length) {
            playerInput();
        }
        else {
            checkSequence();
        }
    }
    (segment.red).onclick = function() { playerclick(redAudio, 1, 'red-light'); };
    (segment.yellow).onclick = function() { playerclick(yellowAudio, 2, 'yellow-light'); };
    (segment.green).onclick = function() { playerclick(greenAudio, 3, 'green-light'); };
    (segment.blue).onclick = function() { playerclick(blueAudio, 4, 'blue-light'); };
}


function checkSequence() {
    if (gameData.playerSequence.join("") === gameData.gameSequence.join("") && gameData.gameSequence.length < 20) {
        gameData.playerSequence = [];
        setTimeout(newRound, 1000);
    }
    else if (gameData.playerSequence.join("") === gameData.gameSequence.join("") && gameData.gameSequence.length === 20) {
        displayMessage(display.win);
        setTimeout(newGame, 1000);
    }
    else {
        if (gameData.strictStatus === true) {
            displayMessage(display.startAgain);
            setTimeout(newGame, 3000);
        }
        else {
            displayMessage(display.tryAgain);
            setTimeout(showSequence, 1000);
        }
    }
}
