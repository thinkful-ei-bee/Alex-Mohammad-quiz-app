'use strict';
let qNumber = 0;
let correct = 0;

const Questions = [{
    question: 'In the pilot, who started their first day at Dunder Mifflin Scranton?',
    answers: ['Jim Halpert', 'Ryan Howard', 'Michael Scott', 'Erin Hannon'],
    correctAnswer: 'Ryan Howard',
  },
  {
    question: `What is Michael Scott's Middle Name?`,
    answers: ['Chandler', 'Michael', 'Gary', 'Robert'],
    correctAnswer: 'Gary',
  },
  {
    question: 'What county in Pennsylvania is Dunder Mifflin Scranton branch located?',
    answers: ['Lackawanna County', 'Somerset County', 'Bedford County', 'Lancaster County'],
    correctAnswer: 'Lackawanna County',
  },
  {
    question: 'Who is the actor for Michael Scott?',
    answers: [],
    correctAnswer: 'A',
  },
  {
    question: 'A',
    answers: [],
    correctAnswer: 'A',
  },
];


function render() {
  $('.questions').html(createNextQuestion());
}

function createNextQuestion() {
  //might need labels for radios
  if (qNumber < 5) {
    //increment question counter
    $('.number').text(qNumber + 1);
    return `<div class = "question-${qNumber}">
                <h1> ${Questions[qNumber].question} </h1>
                <form>
                    <input type="radio" name="answer" value="${Questions[qNumber].answers[0]}">
                    <span>${Questions[qNumber].answers[0]}</span>
                    <input type="radio" name="answer" value="${Questions[qNumber].answers[1]}">
                    <span>${Questions[qNumber].answers[1]}</span>
                    <input type="radio" name="answer" value="${Questions[qNumber].answers[2]}">
                    <span>${Questions[qNumber].answers[2]}</span>
                    <input type="radio" name="answer" value="${Questions[qNumber].answers[3]}">
                    <span>${Questions[qNumber].answers[3]}</span>
                    <button type ="submit" class="submitButton">Submit </button>
                </form>
            </div>`
  } else {
    //this means you finsihed question 5
    finishQuiz();
  }
}

function answerSumbitted() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    let ans = $('input[name=\'answer\']:checked');
    console.log(ans.val());
    if (ans.val() === Questions[qNumber].correctAnswer) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

function correctAnswer() {
  let output = `<div>
                  <p>That was correct!</p>
                  <button type=button class="continueButton">Continue!</button>
               </div>`
  $('.questions').html(output);
  correct++;
  $('.grade').text(correct);
}

function wrongAnswer() {
  let output = `<div>
                  <p>That was incorrect. The correct answer is ${Questions[qNumber].correctAnswer}.</p>
                  <button type=button class="continueButton">Continue!</button>
               </div>`
  $('.questions').html(output);
}

function nextQuestion() {
  $('main').on('click', '.continueButton', function(event) {
    qNumber++;
    render();
    answerSumbitted();
  });
}


function finishQuiz() {
  let output = `<div>
                  <p>Great job you got ${correct} out of 5 questions correct! If you would like to try again please press the restart button.</p>
                  <button type=button class="restartButton">Restart!</button>
               </div>`
  $('.questions').html(output);
}

function resetQuiz() {
  $('main').on('click', '.restartButton', function(event) {
    console.log('restart');
    location.reload();
  });
  //
}


function beginQuiz() {
  //keep the logo
  //get rid of statement and button
  //keep the stats on the bottom
  qNumber = 0;
  correct = 0;
  $('.quizIntro').on('click', '.beginButton', function(event) {
    $('.beginButton').remove();
    console.log("Hello");
    render();
    answerSumbitted();
    nextQuestion();
    resetQuiz();
  });
}

$(beginQuiz);