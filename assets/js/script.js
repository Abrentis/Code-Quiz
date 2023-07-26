// Global variables
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var startBtn = document.querySelector("#start");
var answersEl = document.querySelector("#answers");

var count = 75;
var myTimer;

// Array storage for questions and answers
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
    {question: "Which comparison operator tests to see if two values are equal and of the same data type?",
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

// Starts the program
startBtn.addEventListener("click", startGame);

function startGame() {
    // Countdown timer
    var clock = function() {
        count--;
        timerEl.innerHTML = count;
        if (count === 0) {
            clearInterval(myTimer);
            endingScreen();
        }
    }

    function startTimer() {
        myTimer = setInterval(clock, 1000);
        clock();
    }

    startTimer();

    // Local variables that keep track of what question the user is on and what answers accompany any given question
    var questionIndex = 0;
    var questionNumber = questions[questionIndex].question;
    var answerChoices = questions[questionIndex].answers;

    startBtn.remove();

    // Buttons are created that store answers for each question
    var button1 = document.createElement("button");
        answersEl.appendChild(button1);
        button1.classList.add("btn");
    var button2 = document.createElement("button");
        answersEl.appendChild(button2);
        button2.classList.add("btn");
    var button3 = document.createElement("button");
        answersEl.appendChild(button3);
        button3.classList.add("btn");
    var button4 = document.createElement("button");
        answersEl.appendChild(button4);
        button4.classList.add("btn");
    
    button1.addEventListener("click", nextQuestion1);
    button2.addEventListener("click", nextQuestion2);
    button3.addEventListener("click", nextQuestion3);
    button4.addEventListener("click", nextQuestion4);

    questionSequence();
    // Code that is essentially looped every time an answer button is clicked to proceed to the next question
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

    // Button #1
    function nextQuestion1() {
        if (button1.dataset.correct == "false") {
            wrongAnswer();
        }
        else if (button1.dataset.correct == "true"){
            cycleNext();
        }
        endGame();
    }

    //Button #2
    function nextQuestion2() {
        if (button2.dataset.correct == "false") {
            wrongAnswer();
        }
        else if (button2.dataset.correct == "true"){
            cycleNext();
        }
        endGame();
    }

    // Button #3
    function nextQuestion3() {
        if (button3.dataset.correct == "false") {
            wrongAnswer();
        }
        else if (button3.dataset.correct == "true"){
            cycleNext();
        }
        endGame();
    }
    
    // Button #4
    function nextQuestion4() {
        if (button4.dataset.correct == "false") {
            wrongAnswer();
        }
        else if (button4.dataset.correct == "true"){
            cycleNext();
        }
        endGame();
    }

    // Subtracts time if an incorrect answer is selected
    function wrongAnswer() {
        clearInterval(myTimer);
        count = count - 20;
        timerEl.innerHTML = count;
        myTimer = setInterval(clock, 1000);
        questionIndex++;
        if (questionIndex < questions.length && count >= 0) {
            questionSequence();
        }
        if (count <= 0) {
            clearInterval(myTimer);
            count = 0;
            timerEl.innerHTML = count;
            localStorage.setItem("score", count);
            endingScreen();
        }
    }

    // Checks to see if time is still remaining before moving onto another question
    function cycleNext() {
        questionIndex++;
        if (questionIndex < questions.length && count >= 0) {
            questionSequence();
        }
    }

    // Pauses timer if user reaches the last question and answers it correctly
    function endGame() {
        if (questionIndex == questions.length && count > 0) {
            timerEl.innerHTML = count;
            localStorage.setItem("score", count);
            clearInterval(myTimer);
            endingScreen();
        }
    }

    /*
    Ending screen. With where the code currently stands, the only way to replay the game is to refresh the page.
    Any entered initials and scores will be saved upon refreshing the page.
    */
    function endingScreen() {
        questionEl.innerHTML = "Game Over!";
        while (answersEl.hasChildNodes()) {
            answersEl.removeChild(answersEl.firstChild);
        }

        // Various created HTML elements that are added to the ending screen
            // "Your Score:"
        var yourTimeScore = document.createElement("h2");
            answersEl.appendChild(yourTimeScore);
            yourTimeScore.textContent = "Your Score: ";
            // Span element containing score amount
        var yourTimeScoreNumber = document.createElement("span");
            yourTimeScore.appendChild(yourTimeScoreNumber);
            yourTimeScoreNumber.innerHTML = count;
            // Form element to contain user input field
        var formEl = document.createElement("form");
            answersEl.appendChild(formEl);
            formEl.setAttribute("method", "POST")
            // Label for input
        var formLabel = document.createElement("label");
            formLabel.textContent = "Enter your initials to save your score: ";
            formEl.appendChild(formLabel);
            // Input field that allows user to only enter letters
        var formInput = document.createElement("input");
            formEl.appendChild(formInput);
            formInput.setAttribute("maxlength", "2");
            formInput.setAttribute("onkeydown", "return /[a-z]/i.test(event.key)");
            // "Previous scores:"
        var formHighScores = document.createElement("h3");
            formHighScores.textContent = "Previous Scores:"
            formEl.appendChild(formHighScores);
            // Previous scores that were stored locally
        var previousInitials = document.createElement("ul");
            answersEl.appendChild(previousInitials);

        var initials = [];

        // Lists previous scores and newly inputted scores
        function renderInitials() {
            previousInitials.innerHTML = "";
            for (var i = 0; i < initials.length; i++) {
                var initial = initials[i];

                var li = document.createElement("li");
                li.textContent = initial;
                li.setAttribute("data-index", i);

                previousInitials.appendChild(li);
            }
        }
        // Function that is called once ending screen is reached to display scores
        function init() {
            var storedInitials = JSON.parse(localStorage.getItem("initials"))
            console.log(storedInitials);
            if (storedInitials !== null) {
                initials = storedInitials;
                renderInitials();
            }
        }

        function storeInitials() {
            localStorage.setItem("initials", JSON.stringify(initials));
        }
        // Listens for when user enters their initials
        formEl.addEventListener("submit", function(event) {
            event.preventDefault();
            var inputText = formInput.value.trim();
            if (inputText === "") {
                return;
            }
            initials.push(inputText + ": " + count);
            formInput.value = "";

            storeInitials();
            renderInitials();
        })
        
        init();
    }
}