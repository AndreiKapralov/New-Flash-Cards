const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');

class ViewFlashCards {
    constructor(quizController) {
        this.quizController = quizController;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userName = '';
    }

    async start() {
        const nameAnswer = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Добро пожаловать на игру, незнакомец. Представься!:'
            }
        ]);
        this.userName = nameAnswer.name;
        this.chooseCategory();
    }

    async chooseCategory() {
        const dirPath = './topics';
        const files = fs.readdirSync(dirPath);
        const txtFiles = files.filter(file => path.extname(file) === '.txt');

        if (txtFiles.length === 0) {
            console.log('Сорян, вопросов больше не имеем.');
            return;
        }

        const categoryAnswer = await inquirer.prompt([
            {
                type: 'list',
                name: 'category',
                message: 'Выбери категорию:',
                choices: txtFiles
            }
        ]);

        const filePath = path.join(dirPath, categoryAnswer.category);
        this.quizController.loadQuestionsFromFiles([filePath]);
        this.askNextQuestion();
    }

    askNextQuestion() {
        const question = this.quizController.getQuestion(this.currentQuestionIndex);
        if (question) {
            console.log(`Вопрос: ${question.question}`);
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'answer',
                    message: 'Твой ответ:'
                }
            ]).then(answer => {
                if (this.quizController.checkAnswer(this.currentQuestionIndex, answer.answer)) {
                    console.log('Бинго! Порадовал Беню:)\n');
                    this.score++;
                } else {
                    console.log(`Уа уа уа уа(грустный трамбон) Беня не доволен!: ${question.answer}\n`);
                }
                this.currentQuestionIndex++;
                this.askNextQuestion();
            });
        } else {
            console.log(`Красава ${this.userName}, ты ответил на ${this.score} из ${this.quizController.questions.length} вопросов, так держать!`);
        }
    }
}

module.exports = ViewFlashCards;
