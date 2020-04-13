
window.onload = loadJson
/*username = ""
quizchoice = ""
question = ""
userAnswer = ""
answer = ""
hint = ""*/
async function loadJson(){
    json = null;
    document.getElementById("quiz_menu").style.visibility = "hidden";
    document.getElementById("quiz_view").style.visibility = "hidden";
    response = await fetch('https://my-json-server.typicode.com/KHenkel95/quizdata/db')
        if (response.ok){
            json=await response.json()
        }
    counter = 0;
    //quiz = JSON.parse('https://my-json-server.typicode.com/KHenkel95/quizdata/db');
}

function clickEnter(){
    username = document.querySelector("#name_input").value;
    document.querySelector("#name").innerHTML = "Hello " + document.querySelector("#name_input").value + ", please choose a quiz:";
    //commented these out in order to remove
    //document.getElementById("name_input").style.visibility = "hidden";
    //document.getElementById("name_button").style.visibility = "hidden";
    //removes the input bar and button
    element = document.getElementById("name_input");
    element.parentNode.removeChild(element);
    element = document.getElementById("name_button");
    element.parentNode.removeChild(element);
    //makes the quiz menu visible
    document.getElementById("quiz_menu").style.visibility = "visible";
    console.log(json)
}

function startJavaQuiz(){
    score = 0;
    quizchoice = "java";
    document.getElementById("mc_buttons").style.visibility = "hidden";
    document.getElementById("fib_input").style.visibility = "hidden";
    quizMenuElement = document.querySelector("#quiz_menu");
    quizMenuElement.parentNode.removeChild(quizMenuElement);
    element = document.querySelector("#name");
    element.parentNode.removeChild(element);
    //makes the quiz view visible
    document.getElementById("quiz_view").style.visibility = "visible";
    getNextQuestion();
}

function golangClick(){
    quizchoice = "golang";
    element = document.querySelector("#quiz_menu");
    element.parentNode.removeChild(element);
    element = document.querySelector("#name");
    element.parentNode.removeChild(element);
    //makes the quiz view visible
    document.getElementById("quiz_view").style.visibility = "visible";
}

function checkQuestionType(){
    console.log(json);
    if(json.java.questions[counter].question_type==="mc") {
        document.getElementById("mc_buttons").style.visibility = "visible";
    }
    else{
        document.getElementById("fib_input").style.visibility = "visible";
    }
}

function onMcClick(){
    userAnswer = null;
    if(this.caller==="#a_button"){
        userAnswer = "A";
    }
    if(this.caller==="#b_button"){
        userAnswer = "B";
    }
    if(this.caller==="#c_button"){
        userAnswer = "C";
    }
    if(this.caller==="#d_button"){
        userAnswer = "D";
    }
}

function fibEnter(){
    userAnswer = document.querySelector("#fib_input");
}

function checkAnswer(answer){
    if(answer !== json.java.questions[counter].answer){
        document.createElement("p").innerHTML = "INCORRECT: Sorry, you answered this incorrectly. HINT:" + json.java.questions[counter].hint;
    }
    else{
        setTimeout(function(){
            document.querySelector("#quiz_view").innerHTML = "Correct!";
        },1000 );
        score++;
    }
}

function getNextQuestion(){
    /*console.log(json);
    if(json.java.questions[counter].question_type==="mc"){
        document.getElementById("mc_buttons").style.visibility = "visible";
        //document.getElementById("question").innerHTML = currentQuestion.question;
    }*/

    if(quizchoice==="java"){
        currentQuestion = json.java.questions[counter]
        checkQuestionType()
    }
    else{
        alert("not implemented")
    }
    document.getElementById("question").innerHTML = currentQuestion.question;
    counter++;
}

function quiz_activity(){

    for(let i = 1; i <= 20; i++){

    }

}

/*
document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#java_button').onclick = function() {
        quizchoice = "java";
    }
    document.querySelector('#golang_button').onclick = function(){
        quizchoice = "golang";
    }
    element = document.getElementById("java_button");
    element.parentNode.removeChild(element);
    element = document.getElementById("golang_button");
    element.parentNode.removeChild(element);

})*/