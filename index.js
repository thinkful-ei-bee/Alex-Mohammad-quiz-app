/* eslint-disable no-console */
/* eslint-disable no-undef */
'use strict';

const Questions = [{
  question: 'In the pilot, who started their first day at Dunder Mifflin Scranton?',
  answers: ['Jim Halpert', 'Ryan Howard', 'Michael Scott', 'Erin Hannon'],
  correctAnswer: 'Ryan Howard',
},
{
  question: 'What is Michael Scott\'s Middle Name?',
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
  currq: '',
  answers: [],
  correctAnswers: '',
  questionStatement: '',
  intro: `<h1>Test your knowledge on the Office TV Show!</h1>
  <button type="button" class="beginButton">Begin!</button>`,
  numCorrect: 0,
};

function updateStore() {
  STORE.currq = Questions[STORE.currqNum].question;
  STORE.answers = Questions[STORE.currqNum].answers;
  STORE.correctAnswers = Questions[STORE.currqNum].correctAnswer;
}

function render() {
  console.log('rendering');
  $('.questions').html(STORE.questionStatement);
  $('.quizIntro').html(STORE.intro);
  if (STORE.currqNum < 6) {
    $('.number').text(STORE.currqNum);
  }
  $('.grade').text(STORE.numCorrect);
}

function createNextQuestion() {
  //might need labels for radios
  if (STORE.currqNum < 5) {
    //increment question counter
    updateStore();
    return `<div class = "question-${STORE.currqNum}">
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
            </div>`;
  } else {
    //this means you finished question 5
    return finishQuiz();
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
    render();
  });
}

function correctAnswer() {
  let output = `<div>
                  <p>That was correct!</p>
                  <button type=button class="continueButton">Continue!</button>
               </div>`;
  STORE.questionStatement = output;
  STORE.numCorrect++;
}

function wrongAnswer() {
  let output = `<div>
                  <p>That was incorrect. The correct answer is ${STORE.correctAnswers}.</p>
                  <button type=button class="continueButton">Continue!</button>
               </div>`;
  STORE.questionStatement = output;
}

function nextQuestion() {
  $('main').on('click', '.continueButton', function() {
    console.log('continue');
    console.log(STORE.currqNum);
    //STORE.currqNum++;
    STORE.questionStatement = createNextQuestion();
    STORE.currqNum++;
    render();
    answerSumbitted();
  });
}


function finishQuiz() {
  let output = `<div>
                  <p>Great job you got ${STORE.numCorrect} out of 5 questions correct! If you would like to try again please press the restart button.</p>
                  <button type=button class="restartButton">Restart!</button>
               </div>`;
  return output;
}

function resetQuiz() {
  $('main').on('click', '.restartButton', function() {
    let output = `<h1>Test your knowledge on the Office TV Show!</h1>
                  <button type="button" class="beginButton">Begin!</button>`;
    STORE.intro = output;
    STORE.questionStatement = '';
    STORE.numCorrect = 0;
    STORE.currqNum = 0;
    render();
  });
}

function startQuiz() {
  $('.quizIntro').on('click', '.beginButton', function() {
    STORE.currqNum = 0;
    STORE.numCorrect = 0;
    STORE.intro = '<h1>Test your knowledge on the Office TV Show!</h1>';
    STORE.questionStatement = createNextQuestion();
    STORE.currqNum++;
    render();
    answerSumbitted();

  });
}

function beginQuiz() {
  //keep the logo
  //get rid of statement and button
  //keep the stats on the bottom
  STORE.currqNum = 0;
  STORE.numCorrect = 0;
  startQuiz();
  answerSumbitted();
  nextQuestion();
  resetQuiz();
}

$(beginQuiz);