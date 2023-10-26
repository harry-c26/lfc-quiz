const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "When was Liverpool FC founded?",
        choice1: '1872',
        choice2: '1882',
        choice3: '1892',
        choice4: '1902',
        answer: 3,
    },
    {
        question: "Before Liverpool FC was formed, which team played at Anfield?",
        choice1: 'Marine',
        choice2: 'Everton',
        choice3: 'Tranmere Rovers',
        choice4: 'Crewe Alexandra',
        answer: 2,
    },
    {
        question: "Who is the clubs record goalscorer?",
        choice1: 'Ian Rush',
        choice2: 'Steven Gerrard',
        choice3: 'Mo Salah',
        choice4: 'Robbie Fowler',
        answer: 1,
    },
    {
        question: "Which former red became the first ever player manager in English football?",
        choice1: 'Graeme Souness',
        choice2: 'Kenny Dalglish',
        choice3: 'Alan Hansen',
        choice4: 'Kevin Keegan',
        answer: 2,
    },
    {
        question: "Who is the club’s record signing?",
        choice1: 'Philippe Coutinho',
        choice2: 'Alisson Becker',
        choice3: 'Virgil Van Dijk',
        choice4: 'Darwin Nunez',
        answer: 4,
    },
    {
        question: "Which three words are printed on the famous sign leading the football players to the pitch?",
        choice1: 'This is Anfield',
        choice2: 'Welcome to Anfield',
        choice3: 'Anfield is Ready',
        choice4: 'We are Liverpool',
        answer: 1,
    },
    {
        question: "Who did Liverpool beat in their record 7-0 home Premier League win?",
        choice1: 'Arsenal',
        choice2: 'Manchester United',
        choice3: 'Southampton',
        choice4: 'Leeds United',
        answer: 2,
    },
    {
        question: "Whose record stood for twenty years until broken by Sadio Mane on 16 May 2015?",
        choice1: 'Robbie Fowler',
        choice2: 'Michael Owen',
        choice3: 'Ian Rush',
        choice4: 'Stan Collymore',
        answer: 1,
    },
    {
        question: "How many European Cups/Champions Leagues have Liverpool won?",
        choice1: '4',
        choice2: '5',
        choice3: '6',
        choice4: '7',
        answer: 3,
    },
    {
        question: "Which Liverpool park is known for dividing the home grounds of Everton and Liverpool?",
        choice1: 'Reynolds Park',
        choice2: 'Sefton Park',
        choice3: 'Goodison Park',
        choice4: 'Stanley Park',
        answer: 4,
    },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign("/end.html");
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();