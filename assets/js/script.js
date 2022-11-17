// Global variables
var questionNumber = 0;
var time = 90;
var timeVar;
var questionsCorrect = 0;
var userScore;

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
var viewHighBtn = document.getElementById("viewHigh");

// Global event listeners
startButton.addEventListener("click", startQuiz);
returnHomeEl.addEventListener("click", returnHome);
viewHighBtn.addEventListener("click", highScoreScreen);
optionsEl.addEventListener("click", chooseOption);

function startQuiz() {
    // Hide welcome screen
    welcomeScreenEl.setAttribute("class", "hidden");

    // Unhide start over button
    returnHomeEl.removeAttribute("class");

    // Unhide question screen
    questionScreenEl.removeAttribute("class");

    // Start timer
    timeVar = setInterval(timerCountdown, 1000);
    timeLeftEl.textContent = time;

    displayQuestion();
};

// Timer countdown function
function timerCountdown() {
    time--;

    timeLeftEl.textContent = time;

    // If time runs out send the user to the score screen
    if (time <= 0) {
        scoreScreen();
    };
}

// Fill in the question and multiple choice section
function displayQuestion() {
    // Populates "questionInfo" with the properties from the question the user is currently on.
    var questionInfo = questions[questionNumber];

    // Writes the question on the page
    var questionEl = document.getElementById("question");
    questionEl.textContent = questionInfo.question;

    // Clears previous options to prevent new ones from stacking below the previous options
    optionsEl.innerHTML = '';

    // Populates the options for the given question
    for (var i = 0; i < questionInfo.options.length; i++) {
        var option = questionInfo.options[i];
        var optionButton = document.createElement("button");
        optionButton.setAttribute("class", "option");
        optionButton.setAttribute("value", option);

        optionButton.textContent = i + 1 + ". " + option;

        optionsEl.appendChild(optionButton);
    };
};

// Functionality for the user selecting one of the options
function chooseOption(event) {
    var buttonEl = event.target;

    // Verify that the user is clicking on a button
    if (!buttonEl.matches(".option")) {
        return;
    };

    // If selected option is INCORRECT
    if (buttonEl.value !== questions[questionNumber].answer) {
        time -= 15;

        // Prevent time from going negative
        if (time <= 0) {
            time = 0;
        }

        responseEl.setAttribute("class", "incorrect");
        responseEl.textContent = "Incorrect!";

        // If selected option is CORRECT
    } else {
        questionsCorrect++;

        responseEl.setAttribute("class", "correct");
        responseEl.textContent = "Correct!";
    };

    // Hide the correct/incorrect response after it has appeared briefly
    setTimeout(function () {
        responseEl.setAttribute("class", "hidden");
    }, 1000);

    // Move to the next question
    questionNumber++;

    // Calculate the final user score
    userScore = time * questionsCorrect;

    // Decide if the quiz is over or if the next question should be displayed
    if (time <= 0 || questionNumber === questions.length) {
        scoreScreen();
    } else {
        displayQuestion();
    };
};

function scoreScreen() {
    // Stop the timer
    clearInterval(timeVar);

    // Hide the questions screen
    questionScreenEl.setAttribute("class", "hidden");

    // Unhide the score screen
    scoreScreenEl.removeAttribute("class");

    // Display the user's score
    var scoreEl = document.getElementById("score");
    scoreEl.textContent = userScore;

    // Add functionality to the save score button
    var saveScoreBtn = document.getElementById("saveScore");
    saveScoreBtn.addEventListener("click", saveScore);
};

function saveScore() {
    // Save the user's name that they input
    var userNameEl = document.getElementById("userName");
    var userName = userNameEl.value;

    // Call the existing scores up or call a blank array to begin pushing scores into
    var scores = JSON.parse(window.localStorage.getItem("scores")) || [];

    // Save the score and user name the user set to the object "userInfo"
    var userInfo = {
        userName: userName,
        userScore: userScore,
    };

    // Push the user's info into the scores key within localStorage
    scores.push(userInfo);
    window.localStorage.setItem("scores", JSON.stringify(scores));

    highScoreScreen();
}

function highScoreScreen() {

    // Make sure that any page the user could be on is cleared
    welcomeScreenEl.setAttribute("class", "hidden");
    questionScreenEl.setAttribute("class", "hidden");
    scoreScreenEl.setAttribute("class", "hidden");

    // Unhide highscore screen
    highScoreScreenEl.removeAttribute("class");

    // Hide the view high scores button
    viewHighBtn.setAttribute("class", "hidden");

    // Verify the start over button is shown
    returnHomeEl.removeAttribute("class")

    // Call the users' scores or pull up a blank array
    var scores = JSON.parse(window.localStorage.getItem("scores")) || [];

    // Sort the scores highest to lowest
    scores.sort(function (a, b) {
        return b.userScore - a.userScore;
    })

    // Display the scores on the high scores screen
    for (var i = 0; i < scores.length; i++) {
        var scoreLi = document.createElement("li");
        scoreLi.textContent = scores[i].userName + ": " + scores[i].userScore;

        var scoreOl = document.getElementById("scoreOl");
        scoreOl.appendChild(scoreLi);
    }

    // Adds functionality to the clear high scores button
    var clearScoresBtn = document.getElementById("clearScores");
    clearScoresBtn.addEventListener("click", clearScores);
}

// Clears local storage and then refreshes the page to take the user back to the welcome screen
function clearScores() {
    window.localStorage.removeItem('scores');
    returnHome();
}

// Refreshes the page when the user clicks the start over button
function returnHome() {
    window.location.reload();
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
]