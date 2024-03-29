const svc = require('./service.js');

const getQuestion = async(req, res, next) => {
    try {
        const questionList = await svc._getQuestion();

        res.status(200).json(questionList);
    } catch(err) {
        next(err);
    }
}


module.exports = {
    getQuestion
}