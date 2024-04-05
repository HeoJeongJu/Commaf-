const svc = require('./service.js');


const getQuestionResult = async(req, res, next) => {
    try {
        const name = req.params.name;
        const questionResult = await svc._getResultQuestion(name);

        res.status(200).json(questionResult);
    } catch(err) {
        next(err);
    }
}


const recommendation = async(req, res, next) => {
    try{
        const recommend = await svc._getRecommend(req.body);

        res.status(200).json(recommend);
    } catch(err) {
        next(err);
    }
}

module.exports = {
    getQuestionResult, recommendation
}