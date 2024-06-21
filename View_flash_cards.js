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
                message: 'Welcome to the Quiz! Please enter your name:'
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
            console.log('No quiz files found in the directory.');
            return;
        }

        const categoryAnswer = await inquirer.prompt([
            {
                type: 'list',
                name: 'category',
                message: 'Please choose a category:',
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
            console.log(`Question: ${question.question}`);
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'answer',
                    message: 'Your answer:'
                }
            ]).then(answer => {
                if (this.quizController.checkAnswer(this.currentQuestionIndex, answer.answer)) {
                    console.log('Correct!\n');
                    this.score++;
                } else {
                    console.log(`Wrong! The correct answer is: ${question.answer}\n`);
                }
                this.currentQuestionIndex++;
                this.askNextQuestion();
            });
        } else {
            console.log(`Quiz finished! ${this.userName}, your score: ${this.score}/${this.quizController.questions.length}`);
        }
    }
}

module.exports = ViewFlashCards;
