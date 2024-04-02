const svc = require('./service.js');

const getCafe = async(req, res, next) => {
    try {
        const name = req.params.name;
        const cafeList = await svc._getCafeList(name);

        res.status(200).json(cafeList);
    } catch(err) {
        next(err);
    }
}


module.exports = {
    getCafe
}