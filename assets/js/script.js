// 
var questionNumber = 0;

// Button variables
var startButton = document.getElementById("startButton");

function startQuiz() {
    console.log("Am I working?");
    var welcomeScreenEl = document.getElementById("welcomeScreen");
    welcomeScreenEl.setAttribute("class", "hidden");

    var questionScreenEl = document.getElementById("questionScreen");
    questionScreenEl.removeAttribute("class");

    quiz();
};

function quiz() {
    var questionInfo = questions[questionNumber]

    var questionEl = document.getElementById("question");
    questionEl.textContent = questionInfo.question;

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