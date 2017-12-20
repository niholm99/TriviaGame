
(function() {
  var questions = [{
    question: "When did the worlds oldest brewery start?",
    choices: ["1040","1760", "1340", "1675", "1500 BC"],
    correctAnswer: 0
  }, {
    question: "How many different kinds of beer are there?",
    choices: ["250","10,000", "75","400", "780"],
    correctAnswer: 3
  }, {
    question: "What state has the largest amount of breweries per 100,000 people?",
    choices: ["California","Oregon","Colorado","Vermont","Montana"],
    correctAnswer: 1
  }, {
    question: "In which ancient culture, were workers given rations of beer for payment?",
    choices: ["Greece", "Rome","The huns","Egypt", "Wisconsin"],
    correctAnswer: 3
  }, {
    question: "The United States is the second largest hop producer in the world, who is the largest?",
    choices: ["Germany","Ireland","England","Brazil","Australia"],
    correctAnswer: 0
    }, {
    question: "How many breweries are there in the United States?",
    choices: ["7,608","3,706","5,005","2,354","4,892"],
    correctAnswer: 2
    }, {
    question: "Where was the oldest drinkable beer found?",
    choices: ["Budhist Temple", "Chamber in the pyramids of Giza", "Baltic Sea Shipwreck", "Mayan Temple Ruins", "Basemount of an english pub"],
    correctAnswer: 2
    }, {
    question: "What is the name for someone who collects beer bottles?",
    choices: ["Briliant", "Strange", "Hoarder", "Bushman", "labeorphilist"],
    correctAnswer: 4
  }];



  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  startTimer();
  
  // 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  //'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  //'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    clearInterval();
    startTimer();
    $('#start').hide();
  });
  
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
function startTimer(){
    var seconds = 30;
    x = setInterval(function(){
    $("#counter").html("Time Left: " + seconds);
    
    if (seconds <= 0){
    clearInterval(x);
    var timesup = displayScore();
    quiz.html(timesup).fadeIn();
    $('#next').hide();
    $('#prev').hide();
    $('#start').show();
} else{
  seconds--;
}
}, 1000)}



  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'quiz'});
   
    
    var numCorrect = 0;
    var numWrong = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
        }else {
          numWrong++;
      }
    }
    
    score.append('Number Correct: ' + numCorrect + "<br>" + 'Number Wrong: ' + numWrong);

    return score;
  }
})();