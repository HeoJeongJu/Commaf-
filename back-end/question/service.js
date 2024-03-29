const Question = require('./model');

async function _getQuestion() {
    const questionList = await Question.find({});

    return questionList;
}



module.exports = {
    _getQuestion
}


