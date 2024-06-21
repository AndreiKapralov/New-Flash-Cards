const FlashModule = require('./Question');
const QuizController = require('./QuizController');
const quizController = new QuizController();
const QuizView = require('./QuizView');
const quizView = new QuizView(quizController);

class Controller {
    constructor() {
        this.questions = [];
    }

    loadQuestionsFromFiles(filePaths) {
        filePaths.forEach(filePath => {
            this.questions.push(...Question.loadQuestions(filePath));
        });
    }

    getQuestion(index) {
        if (index < this.questions.length) {
            return this.questions[index];
        } else {
            return null;
        }
    }

    checkAnswer(index, answer) {
        if (index < this.questions.length) {
            return this.questions[index].answer.trim().toLowerCase() === answer.trim().toLowerCase();
        } else {
            return false;
        }
    }
}


quizView.start();

module.exports = Controller;
