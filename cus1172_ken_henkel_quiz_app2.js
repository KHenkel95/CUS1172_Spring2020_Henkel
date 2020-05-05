window.onload = loadJson

const apiUrl = "https://cus1172-henkel-quiz-app.herokuapp.com"

var quizListJson = {};
var currentQuestionJson = {};
var quizId = "-1";
var nextQuestionId = "first";
var currentQuestion = {}

async function loadJson(){
    document.getElementById("quiz_menu").style.visibility = "hidden";
    document.getElementById("quiz_view").style.visibility = "hidden";
    response = await fetch(apiUrl + "/api/quiz/list")
    if (response.ok){
        quizListJson=await response.json()
    }
    counter = 0;
}

function clickEnter(){
    username = document.querySelector("#name_input").value;
    document.querySelector("#name").innerHTML = "Hello " + document.querySelector("#name_input").value + ", please choose a quiz:";
    //removes the input bar and button
    element = document.getElementById("name_input");
    element.parentNode.removeChild(element);
    element = document.getElementById("name_button");
    element.parentNode.removeChild(element);
    //makes the quiz menu visible
    document.getElementById("quiz_menu").style.visibility = "visible";
}

function startQuiz(quizChoice){
    score = 0;
    if(quizChoice === "java"){
        quizId = 100
    }
    else{
        quizId = 200
    }
    document.getElementById("mc_buttons").style.visibility = "hidden";
    document.getElementById("fib_input").style.visibility = "hidden";
    quizMenuElement = document.querySelector("#quiz_menu");
    quizMenuElement.parentNode.removeChild(quizMenuElement);
    element = document.querySelector("#name");
    element.parentNode.removeChild(element);
    //makes the quiz view visible
    document.getElementById("quiz_view").style.visibility = "visible";
    updateScoreboard();
    getNextQuestion();
}

function checkQuestionType(){
    questionType = null

    if(currentQuestion.question_type ==="mc") {
        questionType = "mc";
        document.getElementById("mc_buttons").style.visibility = "visible";
    }
    else{
        questionType = "fib";
        document.getElementById("fib_space").value = "";
        document.getElementById("fib_input").style.visibility = "visible";
    }
    return questionType;
}

function fibEnter(){
    return checkAnswer(document.querySelector("#fib_space").value);
}

async function checkAnswer(answer){
    response = await fetch(apiUrl + `/api/check_answer/${quizId}/${currentQuestion.id}/${answer}`)
    if (response.ok) {
        answerResults = await response.json();
        if(!(answerResults.correct)){
            document.querySelector("#result").innerHTML = "";
            document.getElementById("mc_buttons").style.visibility = "hidden";
            document.getElementById("fib_input").style.visibility = "hidden";
            alert("INCORRECT: Sorry, you answered this incorrectly. HINT:" + answerResults.feedback)
            getNextQuestion();
        }
        else{
            document.getElementById("mc_buttons").style.visibility = "hidden";
            document.getElementById("fib_input").style.visibility = "hidden";
            document.querySelector("#result").innerHTML = "Correct!";
            setTimeout(function(){
                document.querySelector("#result").innerHTML = "";
                score++;
                updateScoreboard();
                getNextQuestion();
            },1000 );

        }}else{
        alert("unexpected api error")
    }
}

async function getNextQuestion(){
    if(nextQuestionId === "-1"){
        endQuiz();
    }
    else{
        response = await fetch(apiUrl + `/api/quiz/${quizId}/${nextQuestionId}`)
        if (response.ok) {
            currentQuestionJson = await response.json();
            if(currentQuestionJson.length > 0)
                console.log(currentQuestionJson)
            currentQuestion = currentQuestionJson.data
            nextQuestionId = currentQuestionJson.meta.next_question;
            document.getElementById("question").innerHTML = currentQuestion.question;
            checkQuestionType();
            counter++;
        }
        else{
            alert("unexpected api error");
        }
    }
}

function endQuiz(){

    alert("End quiz, reloading page you answered " + score +" out of 20 correctly");
    location.reload();
}

function updateScoreboard(){
    document.querySelector('#score').innerHTML="Score: " + score + " out of 20"
}