const svc = require('./service.js');

const login = async(req, res, next) => {
    try {
        const name = req.body.id;
        const password = req.body.password;

        const admin = await svc._getAdmin({ name, password });

        res.status(200).json(admin);
    } catch(err) {
        next(err);
    }
}


module.exports = {
    login
}