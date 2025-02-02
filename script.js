
// Quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: 2,
  },
  {
    question: "Which language runs in a web browser?",
    answers: ["Python", "JavaScript", "C++", "Java"],
    correct: 1,
  },
  {
    question: "What is the square root of 64?",
    answers: ["6", "8", "10", "12"],
    correct: 1,
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    correct: 2,
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: 2,
  },
  {
    question: "Which year did the Titanic sink?",
    answers: ["1905", "1912", "1920", "1931"],
    correct: 1,
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    answers: ["Oxygen", "Osmium", "Oganesson", "Oxide"],
    correct: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const startContainer = document.getElementById("start-container");
const quizContainer = document.getElementById("quiz-container");
const startButton = document.getElementById("start-button");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result");
const restartButton = document.getElementById("restart-button");
const backgroundMusic = document.getElementById("background-music");

// Start Quiz
startButton.addEventListener("click", () => {
  startContainer.style.display = "none";
  quizContainer.style.display = "block";
  backgroundMusic.play().catch(() => {
    document.body.addEventListener("click", () => backgroundMusic.play());
  });
  showQuestion();
});

// Show Question
function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  answersElement.innerHTML = "";

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));
    answersElement.appendChild(button);
  });

  nextButton.style.display = "none";
}

// Select Answer
function selectAnswer(index) {
  const currentQuestion = questions[currentQuestionIndex];

  Array.from(answersElement.children).forEach((button, i) => {
    button.disabled = true;
    if (i === currentQuestion.correct) {
      button.style.backgroundColor = "green";
    } else if (i === index) {
      button.style.backgroundColor = "red";
    }
  });

  if (index === currentQuestion.correct) score++;
  nextButton.style.display = "block";
}

// Next Question
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

// Show Result
function showResult() {
  resultContainer.style.display = "block";
  questionElement.style.display = "none";
  answersElement.style.display = "none";
  nextButton.style.display = "none";
  restartButton.style.display = "block";

  resultText.textContent = `You scored ${score} out of ${questions.length}!`;
}

// Restart Quiz
restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  resultContainer.style.display = "none";
  questionElement.style.display = "block";
  answersElement.style.display = "block";
  showQuestion();
});
