const resultQuestion = require('./model');

async function _getResultQuestion(name) {
    const questionResult = await resultQuestion.findOne({ name: name });

    return questionResult;
}



module.exports = {
    _getResultQuestion
}


