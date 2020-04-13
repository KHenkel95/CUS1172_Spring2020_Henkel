document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("input").onchange = q;
})

function q(){
    document.querySelector(#name).innerHTML = #quiz_selection;
}

function loadJson(){
    fetch('https://jsonplaceholder.typicode.com/KHenkel95/quizdata')
        .then(response => response.json())
        .then(json => console.log(json))
}