const svc = require('./service.js');

const findAll = async(req, res, next) => {
    try {
        const coffeeList = await svc._getList();

        res.status(200).json(coffeeList);
    } catch(err) {
        next(err);
    }
}

const findItem = async(req, res, next) => {
    try {
        const name = req.params.name;
        const coffeeItem = await svc._getItem(name);

        res.status(200).json(coffeeItem);
    } catch(err) {
        next(err);
    }
}


module.exports = {
    findAll, findItem
}