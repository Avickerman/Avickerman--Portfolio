$(document).ready(function () {

    // event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);

})

var trivia = {

    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId: '',

    questions: {
        q1: 'What Minnesota Viking player returned a fumble 66 yards to the wrong end zone?',
        q2: 'Who scored the only touchdown for the Vikings in their 16-6 loss to the Steelers in Super Bowl IX?',
        q3: 'In what years did Kirby Puckett bat .356, had 234 hits, 121 RBI and a slugging percentage of .545?',
        q4: 'What year did the Lakers move from Minneapolis to Los Angeles?',
        q5: 'Which one of these teams did Herb Brooks NOT coach?',
        q6: "What was Mike Tice's career record as head coach of the Vikings?",
        q7: 'Where was Joe Mauer selected in the 2001 draft?',
        q8: 'What Minneapolis golf legend was the first president of the Ladies’ Professional Golf Association (LPGA)?'
    },
    options: {
        q1: ['Terry Brown', 'Jim Marshall', 'Fran Tarkenton', 'Dave Osborn'],
        q2: ['Chuck Foreman', 'Bill Brown', 'Terry Brown', "Nobody -- the Vikings didn't score a touchdown"],
        q3: ['1986', '1987', '1988', '1989'],
        q4: ['1958', '1960', '1950', 'The Lakers never moved. They still play in Minneapolis.'],
        q5: ['Boston Bruins', 'Minnesota North Stars', 'Pittsburgh Penguins', 'New Jersey Devils'],
        q6: ['30-35', ' 35-30', '6-59', '32-33'],
        q7: ['Second overall by the Twins', 'First overall by the Twins', 'Second overall by the Cubs', 'First overall by the Cubs'],
        q8: ['Patty Berg', 'Patty Andrews', 'Patty Tracy', 'Patty Hearst']
    },
    answers: {
        q1: 'Jim Marshall',
        q2: 'Terry Brown',
        q3: '1988',
        q4: '1960',
        q5: 'Boston Bruins',
        q6: '32-33',
        q7: 'First overall by the Twins',
        q8: 'Patty Berg'
    },
    startGame: function () {
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        $('#game').show();


        $('#results').html('');


        $('#timer').text(trivia.timer);


        $('#start').hide();

        $('#remaining-time').show();

        trivia.nextQuestion();

    },

    nextQuestion: function () {

        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }


    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
       
      
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];


    $.each(questionOptions, function (index, key) {
        $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
    })

},

    timerRunning: function() {

        if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
    $('#timer').text(trivia.timer);
    trivia.timer--;
    if (trivia.timer === 4) {
        $('#timer').addClass('last-seconds');
    }
}
     
       else if (trivia.timer === -1) {
    trivia.unanswered++;
    trivia.result = false;
    clearInterval(trivia.timerId);
    resultId = setTimeout(trivia.guessResult, 1000);
    $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
}

else if (trivia.currentSet === Object.keys(trivia.questions).length) {


    $('#results')
        .html('<h3>Thank you for playing!</h3>' +
            '<p>Correct: ' + trivia.correct + '</p>' +
            '<p>Incorrect: ' + trivia.incorrect + '</p>' +
            '<p>Unaswered: ' + trivia.unanswered + '</p>' +
            '<p>Please play again!</p>');


    $('#game').hide();


    $('#start').show();
}
       
     },

guessChecker: function() {


    var resultId;


    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];


    if ($(this).text() === currentAnswer) {

        $(this).addClass('btn-success').removeClass('btn-info');

        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
    }

    else {

        $(this).addClass('btn-danger').removeClass('btn-info');

        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! ' + currentAnswer + '</h3>');
    }

},

guessResult: function() {


    trivia.currentSet++;


    $('.option').remove();
    $('#results h3').remove();


    trivia.nextQuestion();

}
   
   }






