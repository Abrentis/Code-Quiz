var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var startBtn = document.querySelector("#start");
var answersEl = document.querySelector("#answers");

var count = 15;
var myTimer;

var questions = [
    {question: "Which of these options shows the proper syntax for writing a function?",
    answers: [
        {text: "function functionName() {}", correct: true},
        {text: "functionName() function {}", correct: false},
        {text: "{function functionName()}", correct: false},
        {text: "(function functionName{})", correct: false}
        ]
    },
    {question: "What characters do you use to turn a single line of text into a comment?",
    answers: [
        {text: "/**/", correct: false},
        {text: "!!", correct: false},
        {text: "//", correct: true},
        {text: "||", correct: false}
        ]
    },
    {question: "What type of variable accepts true/false values?",
    answers: [
        {text: "string", correct: false},
        {text: "number", correct: false},
        {text: "integer", correct: false},
        {text: "boolean", correct: true}
        ]
    },
    {question: "What comparison operator characters test to see if two values are equal and of the same data type?",
    answers: [
        {text: "+", correct: false},
        {text: "===", correct: true},
        {text: "==", correct: false},
        {text: "=", correct: false}
        ]
    },
    {question: "What is the proper syntax for logging information to the console?",
    answers: [
        {text: "console.log();", correct: true},
        {text: "log().console;", correct: false},
        {text: "console().log;", correct: false},
        {text: "()console.log;", correct: false}
        ]
    }
]
startBtn.addEventListener("click", startGame);

// Countdown timer
var clock = function() {
        count--;
        timerEl.innerHTML = count;
        if (count === 0) {
            questionEl.innerHTML = "You Lose!";
            clearInterval(myTimer);
        }
}

function startTimer() {
    myTimer = setInterval(clock, 1000);
    clock();
}

function startGame() {
    startTimer();
    var questionIndex = 0;
    var questionNumber = questions[questionIndex].question;
    var answerChoices = questions[questionIndex].answers;

    startBtn.remove();

    var button1 = document.createElement("button");
        answersEl.appendChild(button1);
        button1.classList.add("btn");
        button1.dataset.correct = answerChoices[0].correct;
        button1.innerHTML = answerChoices[0].text;
    var button2 = document.createElement("button");
        answersEl.appendChild(button2);
        button2.classList.add("btn");
        button2.dataset.correct = answerChoices[1].correct;
        button2.innerHTML = answerChoices[1].text;
    var button3 = document.createElement("button");
        answersEl.appendChild(button3);
        button3.classList.add("btn");
        button3.dataset.correct = answerChoices[2].correct;
        button3.innerHTML = answerChoices[2].text;
    var button4 = document.createElement("button");
        answersEl.appendChild(button4);
        button4.classList.add("btn");
        button4.dataset.correct = answerChoices[3].correct;
        button4.innerHTML = answerChoices[3].text;
    
    button1.addEventListener("click", nextQuestion1);
    button2.addEventListener("click", nextQuestion2);
    button3.addEventListener("click", nextQuestion3);
    button4.addEventListener("click", nextQuestion4);

    questionSequence();

    function questionSequence() {
        questionNumber = questions[questionIndex].question;
        answerChoices = questions[questionIndex].answers;

        questionEl.innerHTML = questionNumber;
        
        button1.dataset.correct = answerChoices[0].correct;
        button1.innerHTML = answerChoices[0].text;
        
        button2.dataset.correct = answerChoices[1].correct;
        button2.innerHTML = answerChoices[1].text;
        
        button3.dataset.correct = answerChoices[2].correct;
        button3.innerHTML = answerChoices[2].text;
         
        button4.dataset.correct = answerChoices[3].correct;
        button4.innerHTML = answerChoices[3].text;
    }

    function nextQuestion1() {
        if (button1.dataset.correct == "true") {
            clearInterval(myTimer);
            count = count - 20;
            timerEl.innerHTML = count;
            myTimer = setInterval(clock, 1000);
        };

        if (questionIndex < questions.length - 1) {
        questionIndex++;
        console.log(questionIndex);
        questionSequence();
        }
    }

    function nextQuestion2() {}
    function nextQuestion3() {}
    function nextQuestion4() {}
}