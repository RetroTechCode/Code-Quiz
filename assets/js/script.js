// Global variables
var questionNumber = 0;

// Variables from page elements
var optionsEl = document.getElementById("options");

// Button variables
var startButton = document.getElementById("startButton");

function startQuiz() {
    console.log("startQuiz ran");
    var welcomeScreenEl = document.getElementById("welcomeScreen");
    welcomeScreenEl.setAttribute("class", "hidden");

    var questionScreenEl = document.getElementById("questionScreen");
    questionScreenEl.removeAttribute("class");

    displayQuestion();
};

function displayQuestion() {
    console.log("displayQuestion ran");
    var questionInfo = questions[questionNumber];

    var questionEl = document.getElementById("question");
    questionEl.textContent = questionInfo.question;
    
    optionsEl.innerHTML = '';

    for (var i = 0; i < questionInfo.options.length; i++) {
        var option = questionInfo.options[i];
        var optionButton = document.createElement("button");
        optionButton.setAttribute("class", "option")
        optionButton.setAttribute("value", option)

        optionButton.textContent = i+1 + ". " + option;

        optionsEl.appendChild(optionButton);
    };
};

function chooseOption(event) {
    console.log("chooseOption ran");
    var buttonEl = event.target;

    if (!buttonEl.matches(".option")) {
        return;
    };

    if (buttonEl.value !== questions[questionNumber].answer) {
        console.log("Incorrect!");
    } else {
        console.log("Correct!");
    };

    questionNumber++;

    displayQuestion();
};





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