$(document).ready(function () {

    var wins = 0;
    var losses = 0;
    var currentScore = 0;


    var getRandomNumber = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var randomNumber = getRandomNumber(19, 120);

    $("#randomNumber").html(randomNumber);

    var vikings = getRandomNumber(1, 12);
    var wild = getRandomNumber(1, 12);
    var twins = getRandomNumber(1, 12);
    var timberwolves = getRandomNumber(1, 12);

    var newValues = function () {
        vikings = getRandomNumber(1, 12);
        wild = getRandomNumber(1, 12);
        twins = getRandomNumber(1, 12);
        timberwolves = getRandomNumber(1, 12);
    };

    // $("#currentScore").html(currentScore);

    $("#vikings").on("click", function () {
        currentScore += vikings;
        $("#currentScore").html(currentScore);
        updateScore();
    });

    $("#wild").on("click", function () {
        currentScore += wild;
        $("#currentScore").html(currentScore);
        updateScore();
    });

    $("#twins").on("click", function () {
        currentScore += twins;
        $("#currentScore").html(currentScore);
        updateScore();
    });

    $("#timberwolves").on("click", function () {
        currentScore += timberwolves;
        $("#currentScore").html(currentScore);
        updateScore();
    });

    var updateScore = function () {
        if (randomNumber === currentScore) {
            wins++;
            $("#wins").html(wins);
            $("#randomNumber").empty();
            randomNumber = getRandomNumber(19, 120);
            $("#randomNumber").html(randomNumber);
            currentScore = 0;
            $("#currentScore").html(currentScore)
            newValues();
        }
        if (randomNumber < currentScore) {
            losses++;
            $("#losses").html(losses);
            $("#randomNumber").empty();
            randomNumber = getRandomNumber(19, 120);
            $("#randomNumber").html(randomNumber);
            currentScore = 0;
            $("#currentScore").html(currentScore)
            newValues();
        }

    }

});

