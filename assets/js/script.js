// Global variables
var questionNumber = 0;
var time = 90;
var timeVar;
var questionsCorrect = 0;

// Variables from page elements
var optionsEl = document.getElementById("options");
var timeLeftEl = document.getElementById("timeLeft");
var responseEl = document.getElementById("response");
var returnHomeEl = document.getElementById("returnHome");

// Variables used to create new "pages"
var welcomeScreenEl = document.getElementById("welcomeScreen");
var questionScreenEl = document.getElementById("questionScreen");
var scoreScreenEl = document.getElementById("scoreScreen");
var highScoreScreenEl = document.getElementById("highScoreScreen");

// Button variables
var startButton = document.getElementById("startButton");

function startQuiz() {
    console.log("startQuiz ran");

    welcomeScreenEl.setAttribute("class", "hidden");

    returnHomeEl.removeAttribute("class");

    questionScreenEl.removeAttribute("class");

    timeVar = setInterval(timerCountdown, 1000);
    timeLeftEl.textContent = time;

    displayQuestion();
};

function timerCountdown() {
    time--;

    timeLeftEl.textContent = time;

    if (time <= 0) {
        scoreScreen();
    };
}

function displayQuestion() {
    console.log("displayQuestion ran");
    var questionInfo = questions[questionNumber];

    var questionEl = document.getElementById("question");
    questionEl.textContent = questionInfo.question;

    optionsEl.innerHTML = '';

    for (var i = 0; i < questionInfo.options.length; i++) {
        var option = questionInfo.options[i];
        var optionButton = document.createElement("button");
        optionButton.setAttribute("class", "option");
        optionButton.setAttribute("value", option);

        optionButton.textContent = i + 1 + ". " + option;

        optionsEl.appendChild(optionButton);
    };
};

function chooseOption(event) {
    console.log("chooseOption ran");
    var buttonEl = event.target;

    // Verify that the user is clicking on a button
    if (!buttonEl.matches(".option")) {
        return;
    };

    // If selected option is INCORRECT
    if (buttonEl.value !== questions[questionNumber].answer) {
        console.log("Incorrect!");
        time -= 15;

        // Prevent time from going negative
        if (time <= 0) {
            time = 0;
        }

        responseEl.setAttribute("class", "incorrect");
        responseEl.textContent = "Incorrect!";

    // If selected option is CORRECT
    } else {
        console.log("Correct!");

        questionsCorrect++;

        responseEl.setAttribute("class", "correct");
        responseEl.textContent = "Correct!";
    };

    setTimeout(function() {
        responseEl.setAttribute("class", "hidden");
      }, 1000);

    questionNumber++;

    if (time <= 0 || questionNumber === questions.length) {
        scoreScreen();
    } else {
        displayQuestion();
    };
};

function scoreScreen() {
    console.log("scoreScreen ran");
    clearInterval(timeVar);
    var userScore = time * questionsCorrect;

    questionScreenEl.setAttribute("class", "hidden");

    scoreScreenEl.removeAttribute("class");

    var scoreEl = document.getElementById("score");
    scoreEl.textContent = userScore;



};

function highScoreScreen() {
    console.log("highScoreScreen ran");

    

}

function returnHome() {
    // Reset quiz
    clearInterval(timeVar);
    time = 90;
    questionsCorrect = 0;

    // Make sure that any page the user could be on is cleared
    questionScreenEl.setAttribute("class", "hidden");
    scoreScreenEl.setAttribute("class", "hidden");
    highScoreScreenEl.setAttribute("class", "hidden");

    // Unhide the home page
    welcomeScreenEl.removeAttribute("class");

    // Hide the button when the user is already at the start
    returnHomeEl.setAttribute("class", "hidden");
}


var questions = [
    {
        question: "Which tag would you use to link your Javasript file to your HTML?",
        options: ["<link> in the head", "<link> in the body", "<script> in the head", "<script> in the body"],
        answer: "<script> in the body",
    },
    {
        question: "An array is stored within which of the following?",
        options: ["[ ]", "( )", "< >", "{ }"],
        answer: "[ ]",
    },
    {
        question: "An if statement is sometimes followed by a _____ statement.",
        options: ["when", "then", "else", "why"],
        answer: "else",
    },
    {
        question: "What does event.stopPropagation() do in Javascript?",
        options: ["Prevents the default behaviors from occurring", "Prevents interacting through objects on the page", "Refreshes the page", "Nothing"],
        answer: "Prevents interacting through objects on the page",
    },
    {
        question: "Which is the following is used when declaring an object?",
        options: ["[ ]", "( )", "< >", "{ }"],
        answer: "{ }",
    },
    {
        question: "_____ is used for strict equality.",
        options: ["=", "==", "===", "!=="],
        answer: "===",
    },
    {
        question: "A boolean response can be _____ or _____.",
        options: ["Yes, No", "0, 1", "True, False", "If, Then"],
        answer: "True, False",
    },
    {
        question: "'Hello World!' is an example of a(n) _____.",
        options: ["String", "Array", "Object", "Boolean"],
        answer: "String",
    },
    {
        question: "What does event.preventDefault() do in Javascript?",
        options: ["Prevents the default behaviors from occurring", "Prevents interacting through objects on the page", "Refreshes the page", "Nothing"],
        answer: "Prevents the default behaviors from occurring",
    },
    {
        question: "Which of the following is used when declaring a function?",
        options: ["[ ]", "( )", "< >", "{ }"],
        answer: "( )",
    }
];

startButton.addEventListener("click", startQuiz);
optionsEl.addEventListener("click", chooseOption);
returnHomeEl.addEventListener("click", returnHome);