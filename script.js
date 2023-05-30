// global varibals
let currentQuestion = 0;
let score = 0;
let timer;

// HTML elements
const containerElement = document.getElementById('container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const answerElement = document.getElementById('answer');
const scoreElement = document.getElementById('score');
const leaderboardElement = document.getElementById('leaderboard');
const scoresElement = document.getElementById('scores');
const restartButton = document.getElementById('restartBtn');
const clearButton = document.getElementById('clearBtn');
const leaderboardButton = document.getElementById('leaderboardBtn');
const nameForm = document.getElementById('nameForm');
const nameField = document.getElementById('nameField');
const nameInput = document.getElementById('nameInput');

// data of questions and options 
const questions = [
  {
    question: 'Question 1. 2 + 2 = ?',
    options: ['3', '4', '5', '6'],
    answer: 1
  },
  {
    question: 'Question 2. 10 - 5 = ?',
    options: ['3', '5', '8', '10'],
    answer: 1
  },
  {
    question: 'Question 3. 6 * 2 = ?',
    options: ['8', '10', '12', '14'],
    answer: 2
  },
  {
    question: 'Question 4. 15 / 3 = ?',
    options: ['3', '5', '7', '15'],
    answer: 1
  }
];




// initial the game
function initializeGame() {
  currentQuestion = 0;
  score = 0;
  leaderboardElement.style.display = 'none';
  restartButton.style.display = 'none';
  clearButton.style.display = 'none';
//   leaderboardButton.style.display = 'none';
  nameInput.style.display = 'none';
  setQuestion();
  startTimer();
}

// set the questions and options
function setQuestion() {
    optionsElement.addEventListener('click', checkAnswer);
    restartButton.addEventListener('click', restartQuiz);
    clearButton.addEventListener('click', clearLeaderboard);
    leaderboardButton.addEventListener('click', showLeaderboard);
    nameForm.addEventListener('submit', submitName);
  const question = questions[currentQuestion];
  questionElement.innerText = question.question;
  optionsElement.innerHTML = '';
  question.options.forEach((option, index) => {
    const li = document.createElement('li');
    li.innerText = option;
    li.classList.add('option');
    li.dataset.index = index;
    optionsElement.appendChild(li);
  });
}

// check the answers
function checkAnswer(event) {
  if (event.target.classList.contains('option')) {
    const selectedOption = event.target.dataset.index;
    const question = questions[currentQuestion];
    const answer = question.answer;

    if (selectedOption == answer) {
      event.target.style.backgroundColor = '#27ae60';
      score += 25;
    } else {
      event.target.style.backgroundColor = '#c0392b';
    }

    optionsElement.removeEventListener('click', checkAnswer);
    answerElement.innerText = `Answer: ${question.options[answer]}`;
    currentQuestion++;

    if (currentQuestion < questions.length) {
      setTimeout(() => {
        resetQuestion();
        setQuestion();
        optionsElement.addEventListener('click', checkAnswer);
      }, 1000);
    } else {
      setTimeout(() => {
        stopTimer();
        showScore();
      }, 1000);
    }
  }
}

// 重置问题
function resetQuestion() {
  optionsElement.innerHTML = '';
  answerElement.innerText = '';
}

// 显示得分
function showScore() {
  questionElement.innerText = '';
  optionsElement.style.display = 'none';
  answerElement.style.display = 'none';
  scoreElement.innerText = `Your total score: ${score}`;
  scoreElement.style.display = 'block';
  leaderboardButton.style.display = 'none';
  nameInput.style.display = 'block';
}

// 显示排行榜
function showLeaderboard() {
  leaderboardElement.style.display = 'block';
  restartButton.style.display = 'block';
  clearButton.style.display = 'block';
  restartButton.style.display = 'block';
  clearButton.style.display = 'block';
  leaderboardButton.style.display = 'none';
  nameInput.style.display = 'none';
  retrieveScores();
}

// submit the name
function submitName(event) {
  event.preventDefault();
  const name = nameField.value;
  if (name) {
    const scoreEntry = { name, score };
    saveScore(scoreEntry);
    nameField.value = '';
    showLeaderboard();
  }
}

// keep scores
function saveScore(scoreEntry) {
  let scores = localStorage.getItem('scores');
  if (scores) {
    scores = JSON.parse(scores);
    scores.push(scoreEntry);
  } else {
    scores = [scoreEntry];
  }
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem('scores', JSON.stringify(scores));
  retrieveScores();
}

// retrieve scores
function retrieveScores() {
  scoresElement.innerHTML = '';
  const scores = JSON.parse(localStorage.getItem('scores'));
  if (scores && scores.length > 0) {
    scores.forEach((score, index) => {
      const li = document.createElement('li');
      li.innerText = `${index + 1}. ${score.name}: ${score.score}`;
      scoresElement.appendChild(li);
    });
  }
}

// clear the leader board
function clearLeaderboard() {
  localStorage.removeItem('scores');
  scoresElement.innerHTML = '';
}

// try the quize again
function restartQuiz() {
  leaderboardElement.style.display = 'none';
  restartButton.style.display = 'none';
  clearButton.style.display = 'none';
  leaderboardButton.style.display = 'none';
  nameInput.style.display = 'none';
  leaderboardButton.style.display = 'none';
  restartButton.style.display = 'none';
  clearButton.style.display = 'none';

  optionsElement.style.display = 'block';
  answerElement.style.display = 'block';
  scoreElement.style.display = 'none';
  currentQuestion = 0;
  score = 0;
  setQuestion();
  startTimer();
}

// count down
function startTimer() {
  let timeLeft = 60;
  timer = setInterval(() => {
    document.getElementById('timer').innerText = timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timer);
      stopTimer();
      showScore();
    }
  }, 1000);
}

// stop counting down
function stopTimer() {
  clearInterval(timer);
}

// restart the game
function startGame() {
    document.querySelector('.main-container').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    // containerElement.style.display = 'block';
    initializeGame();
}
  