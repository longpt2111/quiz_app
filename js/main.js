const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const quizArea = $(".quiz");
const question = $(".content .question");
const prevBtn = $(".controls .prev-btn");
const nextBtn = $(".controls .next-btn");
const submitBtn = $(".controls .submit-btn");
const scoreText = $(".score");

const myQuestions = [
  {
    question: "Javascript is _________ language.",
    answers: {
      a: "Programming",
      b: "Application",
      c: "None of These",
      d: "Scripting",
    },
    multi: false,
    correctAnswer: "d",
  },
  {
    question:
      "Which of the following is a valid type of function javascript supports?",
    answers: {
      a: "named function",
      b: "anonymous function",
      c: "both of the above",
      d: "none of the above",
    },
    multi: false,
    correctAnswer: "c",
  },
  {
    question:
      "Which of the following are JavaScript data types? (Select all that apply)",
    answers: {
      a: "NaN",
      b: "Array",
      c: "Function",
      d: "String",
    },
    multi: true,
    correctAnswer: ["b", "d"],
  },
  {
    question:
      "Which built-in method returns the index within the calling String object of the first occurrence of the specified value?",
    answers: {
      a: "getIndex()",
      b: "location()",
      c: "indexOf()",
      d: "getLocation()",
    },
    multi: false,
    correctAnswer: "c",
  },
  {
    question: "Which one of the following is valid data type of JavaScript",
    answers: {
      a: "number",
      b: "void",
      c: "boolean",
      d: "nothing",
    },
    multi: false,
    correctAnswer: "c",
  },
  {
    question:
      "Which of the following methods can be used to iterate over the elements of an array in JavaScript? (Select all that apply)",
    answers: {
      a: "for loop",
      b: "pop() method",
      c: "forEach() method",
      d: "reduce() method",
      e: "shift() method",
    },
    multi: true,
    correctAnswer: ["a", "c", "d"],
  },
];

let currentQuestion = 0;
let score = 0;

const userAnswers = [];
const correctAnswers = myQuestions.map((question) => question.correctAnswer);

function showQuestion() {
  quizArea.innerHTML = `
  <div class="content">
    <h3 class="question">Question ${currentQuestion + 1}: ${
    myQuestions[currentQuestion].question
  }</h3>
    <div class="answers"></div>
  </div>
  `;

  const answerArea = $(".answers");
  const keys = Object.keys(myQuestions[currentQuestion].answers);
  keys.forEach((key, index) => {
    answerArea.innerHTML += `
    <label for="answer-${index + 1}" class="answer-${index + 1}">
      <input type="radio" name="answer" id="answer-${index + 1}" />
      <span>${key}. ${myQuestions[currentQuestion].answers[key]}</span>
    </label>
    `;
  });

  const answerInputs = $$(".answers label input");
  answerInputs.forEach((answerInput, index) => {
    answerInput.checked = userAnswers[currentQuestion] === keys[index];
    answerInput.addEventListener("click", () => {
      userAnswers[currentQuestion] = keys[index];
    });
  });
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= myQuestions.length - 1) {
    currentQuestion = myQuestions.length - 1;
    nextBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
  }
  prevBtn.classList.remove("hidden");
  showQuestion();
}

function prevQuestion() {
  if (currentQuestion === myQuestions.length - 1) {
    nextBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
  }
  currentQuestion--;
  if (currentQuestion <= 0) {
    currentQuestion = 0;
    prevBtn.classList.add("hidden");
  }
  showQuestion();
  scoreText.classList.add("hidden");
}

function displayScore() {
  score = 0;
  correctAnswers.forEach((correctAnswer, index) => {
    if (correctAnswer === userAnswers[index]) score++;
  });
  scoreText.classList.remove("hidden");
  scoreText.textContent = `${score} out of ${correctAnswers.length}`;
}

nextBtn.addEventListener("click", nextQuestion);
prevBtn.addEventListener("click", prevQuestion);
submitBtn.addEventListener("click", displayScore);

showQuestion();
