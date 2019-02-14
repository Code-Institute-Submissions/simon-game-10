jQuery(document).ready(function() {
    $.getScript('assets/js/gameLogic.js');
});

var display = {
    ready: 'Ready',
    blank: '',
    win: 'Win!',
    tryAgain: 'Try Again!',
    startAgain: 'Start Again!',
};

var segment = {
    red: document.getElementById('1'),
    yellow: document.getElementById('2'),
    green: document.getElementById('3'),
    blue: document.getElementById('4'),
    clickoff: function(colour) {
        (this.red).onclick = function() {};
        (this.yellow).onclick = function() {};
        (this.green).onclick = function() {};
        (this.blue).onclick = function() {};
    }
};

document.getElementById('strict-toggle').onclick = function() {
    gameData.strictStatus = !gameData.strictStatus;
    if (gameData.strictStatus === true) {
        $(this).removeClass('positionBefore').addClass('positionAfter');
        $(document.getElementById('strict-btn')).removeClass('btn-before').addClass('btn-after');
    }
    else {
        $(this).removeClass('positionAfter').addClass('positionBefore');
        $(document.getElementById('strict-btn')).removeClass('btn-after').addClass('btn-before');
    }
};

document.getElementById('power-toggle').onclick = function() {
    gameData.powerStatus = !gameData.powerStatus;
    if (gameData.powerStatus === true) {
        displayMessage(display.ready);
        $(this).removeClass('positionBefore').addClass('positionAfter');
        $(document.getElementById('power-btn')).removeClass('btn-before').addClass('btn-after');
        soundReady();
    }
    else {
        gameData.startStatus = false;
        segment.clickoff();
        displayMessage(display.blank);
        $(this).removeClass('positionAfter').addClass('positionBefore');
        $(document.getElementById('power-btn')).removeClass('btn-after').addClass('btn-before');
    }
};

function soundReady(){
    blueAudio.play();
    setTimeout(function(){
        yellowAudio.play();
    }, 300);
    setTimeout(function(){
        redAudio.play();
    }, 600);
    setTimeout(function(){
         greenAudio.play();
    }, 900);
}

document.getElementById('start').onclick = function() {
    if (gameData.powerStatus === true && gameData.startStatus === false) {
        gameData.startStatus = !gameData.startStatus;
        newGame();
    }
};

function displayMessage(message) {
    document.getElementById('display').innerHTML = (message);
}

function displayCount() {
    document.getElementById('display').innerHTML = gameData.count;
}


function colour(colourAudio, id, className) {
    $(document.getElementById(id)).addClass(className);
    colourAudio.play();
    setTimeout(function() {
        $(document.getElementById(id)).removeClass(className);
    }, 500);
}
