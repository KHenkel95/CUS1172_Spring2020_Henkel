//makes express a requirement "run npm install express"
var express = require('express');


//Creates an express instance
var app = express();

const quizzes = require('./quizzes.json');
const questions = require('./questions.json');
const answers = require('./answers.json');

const PORT = process.env.PORT || 3000

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

    if(questionId === "first"){
        res.json(filteredQuizQuestionList[0]["questions"][0])
    }
    else{
        var filteredQuizQuestion = filteredQuizQuestionList[0]["questions"]
            .filter(question => question.data.id === questionId)

        if(filteredQuizQuestion.length < 1){
            res.status(404).send("404: Quiz Question Not Found")
        }
        res.json(filteredQuizQuestion[0])
    }
})

//GET Request Answers by Quiz ID and Question ID
app.get('/api/check_answer/:quizid/:questionid/:answer', (req,res) => {
    var quizId = req.params['quizid'];
    var questionId = req.params['questionid'];
    var answer = req.params['answer'];
    let response = {};

    console.log("question id: " + questionId)

    var filteredQuizAnswerList = answers["quiz_answer_data"]
        .filter(quiz => quizId === quiz.quizId)

    if(filteredQuizAnswerList.length < 1){
        res.status(404).send("404: Quiz Not Found")
    }

    console.log("answers: " + filteredQuizAnswerList[0][0].questionId)

    var filteredQuizAnswer = filteredQuizAnswerList[0]["answers"]
        .filter(answer => questionId === answer.questionId)

    console.log(filteredQuizAnswer);
    console.log(filteredQuizAnswer[0]);
    if(filteredQuizAnswer === []){
        res.status(404).send("404: Quiz Answer Not Found")
    }
    //Object to be returned
    console.log(`Server answer: ${filteredQuizAnswer[0].correct_answer}, user answer: ${answer}`)
    response.correct = filteredQuizAnswer[0].correct_answer === answer
    response.questionId = filteredQuizAnswer[0].question_id
    response.userAnswer = answer
    if(response.correct){
        response.feedback = null;
    }
    else{
        response.feedback = filteredQuizAnswer[0].feedback
    }
    res.json(response)

})

//Starts Server
app.listen(PORT, function() {
    console.log(`Example app listening on port ${PORT}`);
});