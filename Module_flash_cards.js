const fs = require('fs');

class FlashModule {

    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }

    static loadQuestions(filePath) {
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n').filter(line => line.trim() !== '');
        const questions = [];
        for (let i = 0; i < lines.length; i += 2) {
            questions.push(new FlashModule(lines[i], lines[i + 1]));
        }
        return questions;
    }
}



module.exports = FlashModule;
