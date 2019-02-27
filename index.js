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
    answers: ['John Krasinski', 'Rainn Wilson', 'Ed Helms', 'Steve Carell'],
    correctAnswer: 'Steve Carell',
  },
  {
    question: 'What type of farm does Dwight own?',
    answers: ['Carrot Farm', 'Beet Farm', 'Bear Farm', 'Bettle Farm'],
    correctAnswer: 'Beet Farm',
  },
];

const STORE = {
  currqNum: 0,
  currq: "Default",
  answers: [],
  correctAnswers: "Default",

};

function updateStore() {
  STORE.currqNum = qNumber;
  STORE.currq = Questions[qNumber].question;
  STORE.answers = Questions[qNumber].answers;
  STORE.correctAnswers = Questions[qNumber].correctAnswer;
}

function render() {
  $('.questions').html(createNextQuestion());
  if (qNumber < 5) {
    changeQuestionNumber();
  }
}

function changeQuestionNumber() {
  $('.number').text(qNumber + 1);
}

function createNextQuestion() {
  //might need labels for radios
  if (qNumber < 5) {
    //increment question counter
    updateStore();
    return `<div class = "question-${qNumber}">
                <h1>${STORE.currq} </h1>
                <form>
                  <label class="block">
                    <input type="radio" name="answer" required="required" value="${STORE.answers[0]}">
                    <span>${STORE.answers[0]}</span>
                  </label>
                  <label class="block">
                    <input type="radio" name="answer" required="required" value="${STORE.answers[1]}">
                    <span>${STORE.answers[1]}</span>
                  </label>
                  <label class="block">
                    <input type="radio" name="answer" required="required" value="${STORE.answers[2]}">
                    <span>${STORE.answers[2]}</span>
                  </label>
                  <label class="block">
                    <input type="radio" name="answer" required="required" value="${STORE.answers[3]}">
                    <span>${STORE.answers[3]}</span>
                  </label>
                  <br>
                    <button type ="submit" class="submitButton">Submit </button>
                </form>
            </div>`
  } else {
    //this means you finished question 5
    finishQuiz();
  }
}

function answerSumbitted() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    let ans = $('input[name=\'answer\']:checked');
    if (ans.val() === STORE.correctAnswers) {
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
                  <p>That was incorrect. The correct answer is ${STORE.correctAnswers}.</p>
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
    let output = `<h1>Test your knowledge on the Office TV Show!</h1>
                  <button type="button" class="beginButton">Begin!</button>`
    $('.quizIntro').html(output);
    resetStartPage();
    beginQuiz();
  });
  //
}

function resetStartPage() {
  $('.questions').html("");
  $('.grade').text(0);
  $('.number').text(0);
}


function beginQuiz() {
  //keep the logo
  //get rid of statement and button
  //keep the stats on the bottom
  qNumber = 0;
  correct = 0;
  $('.quizIntro').on('click', '.beginButton', function(event) {
    $('.beginButton').remove();
    render();
    answerSumbitted();
    nextQuestion();
    resetQuiz();
  });
}

$(beginQuiz);