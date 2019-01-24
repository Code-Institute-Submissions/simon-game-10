describe("power button test suite", function() {
    describe("Initial power status", function() {
        it("should have an initial value of false", function() {
            //pageReload();
            expect(gameData.powerStatus).toEqual(false);
        });
    });

    describe("power status change to ON (true) ", function() {
        beforeEach(function() {
            gameData.powerStatus = false;
        });
        it("should have a value of true when power button clicked while value is false", function() {
            powerClick();
            expect(gameData.powerStatus).toEqual(true);
        });
    });

    describe("power status change to OFF (false)", function() {
        beforeEach(function() {
            gameData.powerStatus = true;
        });
        it("should have a value of false when power button clicked while value is true", function() {
            powerClick();
            expect(gameData.powerStatus).toEqual(false);
        });
    });
});

describe("start button test suite", function() {
    describe("Initial start status", function() {
        it("should have an initial value of false", function() {
            expect(gameData.startStatus).toEqual(false);
        });
    });
    describe("start status change to ON (true)", function() {
        beforeEach(function() {
            gameData.startStatus = false;
        });
        it("should have a value of true when start button clicked while value is false", function() {
            startClick();
            expect(gameData.startStatus).toEqual(true);
        });
    });
    describe("start status change to OFF (false)", function() {
        beforeEach(function() {
            gameData.startStatus = true;
        });
        it("should have a value of false when start button clicked while value is true", function() {
            startClick();
            expect(gameData.startStatus).toEqual(false);
        });
    });
    describe("should have a value of OFF (false) when powerStatus is false", function() {
        beforeEach(function() {
            gameData.powerStatus = true;
        });
        it("should have a value of false when power button clicked to OFF (i.e also has value of false)", function() {
            powerClick();
            expect(gameData.startStatus).toEqual(false);
        });
    });
});

describe("New Game initiated test suite", function() {
    describe("newGame function called when powerStatus and startStatus are BOTH true", function() {
        beforeEach(function() {
            gameData.powerStatus = true;
            gameData.startStatus = false;
        });
        it("should call newGame function when both powerstatus and startstatus are true", function() {
            spyOn(window, 'newGame');
            startClick();
            expect(window.newGame).toHaveBeenCalled();
        });
    });
    describe("newGame function NOT called when powerStatus is true and startStatus is false", function() {
        beforeEach(function() {
            gameData.powerStatus = true;
            gameData.startStatus = true;
        });
        it("should NOT call new game when powerstatus is true but startstatus is false", function() {
            spyOn(window, 'newGame');
            startClick();
            expect(window.newGame).not.toHaveBeenCalled();
        });
    });
    describe("newGame function NOT called when powerStatus and startStatus are both true", function() {
        beforeEach(function() {
            gameData.powerStatus = true;
            gameData.startStatus = false;
        });
        it("should NOT call newGame function when both powerstatus and startstatus are false", function() {
            spyOn(window, 'newGame');
            powerClick();
            expect(window.newGame).not.toHaveBeenCalled();
        });
    });
    describe("expect newRound() to be called when newGame() is executed", function() {
        it("should call newRound() function", function() {
            spyOn(window, 'newRound');
            newGame();
            expect(window.newRound).toHaveBeenCalled();
        });
    });
});

describe("newRound test suite", function() {
    describe("generateSequence() function is called", function() {
        it("should call generateSequence when newRound is executed", function() {
            spyOn(window, 'generateSequence');
            newRound();
            expect(window.generateSequence).toHaveBeenCalled();
        });
    });
    describe("displaySequence() function is called", function() {
        it("should call showSequence when newRound is executed", function() {
            spyOn(window, 'showSequence');
            newRound();
            expect(window.showSequence).toHaveBeenCalled();
        });
    });
    describe("playerInput() function is called", function() {
        it("should call playerInput function when newRound is executed", function() {
            spyOn(window, 'playerInput');
            newRound();
            expect(window.playerInput).toHaveBeenCalled();
        });
    });
});

describe("generateSequence test suite", function() {
    describe("generateSequence being executed should result in sequence which is pushed to array of name 'gameSequence'", function() {
        it("should show an array called gameSequence of length greater than 0", function() {
            generateSequence();
            expect(gameData.gameSequence.length).not.toBe(0);
        });
    });
    describe("gameSequence content should only consist of 1,2,3 or 4", function() {
        it("should only contain numbers in the range 1 to 4", function() {
            generateSequence();
            for (x = 0; x < gameData.gameSequence.length; x++) {
                expect(0 < gameData.gameSequence[x] < 5).toBe(true);
            }
        });
    });
    describe("gameData.gameSequence length should be equal to gameData.count", function() {
        beforeEach(function() {
            gameData.gameSequence = [];
            gameData.count = 0;
        });
        it("gameData.gameSequence should have a length of gameData.count", function() {
            generateSequence();
            expect(gameData.gameSequence.length).toEqual(gameData.count);
        });
    });
});

describe("display sequence test suite", function() {
    describe("game should match numbers in gameSequence array with coloured squares", function() {
        beforeEach(function(){
        gameData.gameSequence = [1,2,3,4]
        });
        it("should call the 'red' function when the number is 1", function() {
            spyOn(window, 'red');
            displaySequence(0);
           // gameData.gameSequence[0];
            expect(window.red).toHaveBeenCalled();
        });
        it("should call the 'yellow' function when the number is 2", function() {
            spyOn(window, 'yellow');
            displaySequence(1);
            expect(window.yellow).toHaveBeenCalled();
        });
        it("should call the 'green' function when the number is 3", function() {
            spyOn(window, 'green');
            displaySequence(2);
            expect(window.green).toHaveBeenCalled();
        });
        it("should call the 'blue' function when the number is 4", function() {
            spyOn(window, 'blue');
            displaySequence(3);
            expect(window.blue).toHaveBeenCalled();
        });
    });
});
