
window.onload = loadJson

async function loadJson(){
    json = null;
    document.getElementById("quiz_menu").style.visibility = "hidden";
    document.getElementById("quiz_view").style.visibility = "hidden";
    response = await fetch('https://my-json-server.typicode.com/KHenkel95/quizdata/db')
        if (response.ok){
            json=await response.json()
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
    console.log(json)
}

function startQuiz(quizChoice){
    score = 0;
    quizchoice = quizChoice;
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
    question_type = null
    console.log(json);
    if(currentQuestion.question_type==="mc") {
        question_type = "mc";
        document.getElementById("mc_buttons").style.visibility = "visible";
    }
    else{
        question_type = "fib";
        document.getElementById("fib_space").value = "";
        document.getElementById("fib_input").style.visibility = "visible";
    }
    return question_type;
}

function fibEnter(){
    return checkAnswer(document.querySelector("#fib_space").value);
}

function checkAnswer(answer){
    console.log("answer inputed: " + answer);
    console.log("expected answer : " + currentQuestion.answer);
    if(answer !== currentQuestion.answer){
        document.querySelector("#result").innerHTML = "INCORRECT: Sorry, you answered this incorrectly. HINT:" + currentQuestion.hint;

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

    }
}

function getNextQuestion(){

    if(quizchoice==="java"){
        currentQuestion = json.java.questions[counter]

    }
    else{
        currentQuestion = json.golang.questions[counter]
    }
    if(currentQuestion===undefined){
        endQuiz();
    }
    else{
        document.getElementById("question").innerHTML = currentQuestion.question;
        checkQuestionType();
        counter++;
    }
}

function endQuiz(){

    alert("End quiz");
    counter = 0;

}

function updateScoreboard(){
    document.querySelector('#score').innerHTML="Score: " + score + " out of 20"
}