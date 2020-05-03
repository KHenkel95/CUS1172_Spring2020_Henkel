//makes express a requirement "run npm install express"
var express = require('express');


//Creates an express instance
var app = express();

const quizzes = require('./quizzes.json');
const questions = require('./questions.json');
const answers = require('./answers.json');


//Defines a route
app.get('/', function(req, res) {
    res.send('<h1>Welcome to the CUS1172 Quizzes</h1>');
});

//GET Request Quiz List
app.get('/api/quiz/list', (req, res) => {
    res.send(quizzes);
})


//GET Request Quiz by Quiz ID
app.get('/api/quiz/:quizid', (req,res) => {


    var quizId = req.params['quizid'];

    requestedQuiz = quizzes["quizzes"].filter(quiz => quizId === quiz.id);

    res.json(requestedQuiz)
})

//GET Request Quiz Question by Quiz ID and Question ID
app.get('/api/quiz/:quizid/:questionid', (req,res) => {
    var quizId = req.params['quizid'];
    var questionId = req.params['questionid'];

    var filteredQuizQuestionList = questions["quiz_question_data"]
        .filter(quiz => quizId === quiz.quizId)

    if(filteredQuizQuestionList.length < 1){
        res.status(404).send("404: Quiz Not Found")
    }

    var filteredQuizQuestion = filteredQuizQuestionList[0]["questions"]
        .filter(question => question.data.id === questionId)

    if(filteredQuizQuestion.length < 1){
        res.status(404).send("404: Quiz Question Not Found")
    }
    res.json(filteredQuizQuestion)
})

//GET Request Answers by Quiz ID and Question ID
app.get('/api/quiz/:quizid/:questionid/:answer', (req,res) => {
    var quizId = req.params['quizid'];
    var questionId = req.params['questionid'];
    var answer = req.params['answer'];


    var filteredQuizQuestionList = questions["quiz_question_data"]
        .filter(quiz => quizId === quiz.quizId)

    if(filteredQuizQuestionList.length < 1){
        res.status(404).send("404: Quiz Not Found")
    }

    var filteredQuizQuestion = filteredQuizQuestionList[0]["questions"]
        .filter(question => question.data.id === questionId)

    if(filteredQuizQuestion.length < 1){
        res.status(404).send("404: Quiz Question Not Found")
    }

    var filteredQuizAnswer = filteredQuizQuestionList[0]["questions"]
        .filter(question => question.data.id === questionId)
    res.json(filteredQuizQuestion)
})

//Starts Server
app.listen(3000, function() {
    console.log('Example app listening on port 3000');
});