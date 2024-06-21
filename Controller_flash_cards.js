const FlashModule = require('./Module_flash_cards');
const viewFlashCards = require('./View_flash_cards')



class Controller {
    constructor() {
        this.questions = [];
    }

    loadQuestionsFromFiles(filePaths) {
        filePaths.forEach(filePath => {
            this.questions.push(...FlashModule.loadQuestions(filePath));
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

const quizController = new Controller();

const quizView = new viewFlashCards(quizController);


quizView.start();



