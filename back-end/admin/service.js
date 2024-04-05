const errorMessages = require('../error/errorMessages');
//const Admin = require('./model');
const bcrypt =  require('bcrypt');
const { getMongoDbClient } = require("../middlewares/mongoDB");

async function _comparePassword(inputPassword, password) {
     try {
        return await bcrypt.compare(inputPassword, password);
    } catch(err) {
        throw err;
    }
}

async function _getAdmin(id) {
    try {
        const client = getMongoDbClient();
        const db = client.db(process.env.MONGODB_NAME);

        const collection = db.collection('admins');

        const admin = await collection.findOne({id : id});

        if(!admin) {
            throw new Error(errorMessages.NOT_FOUND_ADMIN);
        }

        return admin;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    _comparePassword, _getAdmin
}


