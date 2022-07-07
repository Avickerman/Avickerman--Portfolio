var computerChoices = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var wins = 0;
var losses = 0;
var guesses = 0;
var guessesLeft = 9;
var guessedLetters = [];
var lettersToGuess = null;

var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

var updateGuessesLeft = function () {
    document.querySelector("#guessLeft").innerHTML = "Guesses Left: " + guessesLeft;

};

var updateLettersToGuess = function () {
    this.letterToGuess = this.computerChoices[Math.floor(Math.random() * this.computerChoices.length)];

};

var updateGuessesSoFar = function () {
    document.querySelector("#yourGuesses").innerHTML = "Your Guesses so far: " + guessedLetters.join(', ');
};

var reset = function () {
    totalGuesses = 9;
    guessesLeft = 9;
    guessedLetters = [];

    updateLettersToGuess();
    updateGuessesLeft();
    updateGuessesSoFar();
}

updateLettersToGuess();
updateGuessesLeft();

document.onkeyup = function (event) {
    guessesLeft--;
    var userGuess = string.fromCharCode(event.keycode).toLowerCase();

    guessedLetters.push(userGuess);
    updateGuessesLeft();
    updateGuessesSoFar();

    if (guessesLeft > 0) {
        if (userGuess == lettersToGuess) {
            wins++;
            document.querySelector("#wins").innerHTML = "Wins: " + wins;
            alert("Nice Guess!");
            reset();

        }
    }
    else if (guessesLeft == 0) {
        losses++;
        document.querySelector("#losses").innerHTML = "Losses: " + losses;
        alert("Sorry, um No... Try Again?");
        reset();
    }

};









