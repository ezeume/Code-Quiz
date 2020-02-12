var count = 60


var questions = [
    new Question("Which one is not an object oriented programming language?", ["Java", "C#", "C++", "C"], "C"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQUERY", "CSS", "XML"], "CSS"),
    new Question("There are ____ main components of object oriented programming.", ["1", "6", "2", "4"], "4"),
    new Question("Which language is used for web apps?", ["PHP", "Python", "javascript", "ALL"], "ALL"),
    new Question("MVC is a ____", ["Language", "Library", "Framework", "All"], "Framework")
];


var quiz = new Quiz(questions);




function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.correctAnswer = function (choice) {
    return choice === this.answer;
};



//Determine number of questions to scores 
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

//Functions to check correctAnswer to usersAnswer
Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded = function () {
    return this.questions.length === this.questionIndex;
}

Quiz.prototype.guess = function (answer) {

    if (this.getQuestionIndex().correctAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

//Time count
var countInterval;

function startTimer() {
    countInterval = setInterval(function () {
        if (count > 0) {
            count--;

            document.getElementById("timer").textContent = "0:" + count;
        } else {
            clearInterval(countInterval)
            showScores();
        }

    }, 1000);

    populate();
}

//
function populate() {
    if (quiz.isEnded()) {
        clearInterval(countInterval)
        showScores();
    }
    else {
        //show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        //show choices
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();

    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question" + currentQuestionNumber + " of " + quiz.questions.length;
}

function showScores() {
    var gameOverHtml = "<h1>Result</h1>";
    gameOverHtml += "<h2 id ='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;

};

startTimer();


// save to local storage
var nameInput = document.querySelector("#name");
var submitButton = document.querySelector("#btnn");
var msgDiv = document.querySelector("#msg");
var userScore = document.querySelector("#score");


function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute("class", type);
}

submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    var user = {
        name: nameInput.value.trim(),
    };

    if (user.name === "") {
        displayMessage("error", "Name cannot be blank");
    } else {
        displayMessage("success", "Registered successfully");

        console.log(user);
        localStorage.setItem("user", user);

        var lastUser = localStorage.getItem("user");
    }
})













