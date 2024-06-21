const Question = require('./Question');

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

module.exports = Controller;
