window.onload = loadJson

const apiUrl = "https://cus1172-henkel-quiz-app.herokuapp.com"

async function loadJson(){
    json = null;
    document.getElementById("quiz_menu").style.visibility = "hidden";
    document.getElementById("quiz_view").style.visibility = "hidden";
    response = await fetch(apiUrl + "/api/quiz/list")
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
    questionType = null
    console.log(json);
    //TODO change this to check data.question_type
    if(currentQuestion + ".data.question_type"==="mc") {
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

function checkAnswer(answer){
    console.log("answer inputed: " + answer);
    //TODO change this to answers route answers.correct_answer
    console.log("expected answer : " + currentQuestion.answer);
    if(answer !== currentQuestion.answer){
        //TODO change this to answers route answers.feedback
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
        //TODO have these access next question
        //currentQuestion = json.java.questions[counter]
        currentQuestion = json + "/api/quiz/100/10" + [counter]
        nextQuestion = currentQuestion + ".meta.next_question"
    }
    else{
        //currentQuestion = json.golang.questions[counter]
        currentQuestion = json + "/api/quiz/200/2000"
    }
    //TODO have this check if next_question is -1 to end quiz
    //if(currentQuestion.meta.next_question===-1){
    if(nextQuestion===-1){
        endQuiz();
    }
    else{
        //TODO get this to access the actual question data
        document.getElementById("question").innerHTML = currentQuestion + ".data.question";
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