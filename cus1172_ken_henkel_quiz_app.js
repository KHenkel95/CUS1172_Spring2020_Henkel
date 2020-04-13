
window.onload = loadJson
username = ""
quizchoice = ""
function loadJson(){
    document.getElementById("quiz_menu").style.visibility = "hidden";
    document.getElementById("quiz_view").style.visibility = "hidden";
    fetch('https://my-json-server.typicode.com/KHenkel95/quizdata/db')
        .then(response => response.json())
        .then(json => console.log(json))
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
}

function javaClick(){
    quizchoice = "java";
    element = document.querySelector("#quiz_menu");
    element.parentNode.removeChild(element);
    element = document.querySelector("#name");
    element.parentNode.removeChild(element);
}

function golangClick(){
    quizchoice = "golang";
    quizchoice = "java";
    element = document.querySelector("#quiz_menu");
    element.parentNode.removeChild(element);
    element = document.querySelector("#name");
    element.parentNode.removeChild(element);
    document.getElementById("quiz_view").style.visibility = "visible";
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
