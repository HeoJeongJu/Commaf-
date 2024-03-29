const svc = require('./service.js');

const getQuestionResult = async(req, res, next) => {
    try {
        const name = req.params.name;
        console.log(name);
        const questionResult = await svc._getResultQuestion(name);

        res.status(200).json(questionResult);
    } catch(err) {
        next(err);
    }
}


module.exports = {
    getQuestionResult
}