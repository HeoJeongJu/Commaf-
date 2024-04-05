const { MongoClient } = require("mongodb");
require('dotenv').config();

const _getDBUrl = () => {
    return process.env.MONGODB_URL
}

let client;

const connectMongoDB = async () => {
    try {
        if(!client) {
            const uri = _getDBUrl();
            client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

            await client.connect();
            console.log("MongoDB connected successfully.");
        }
        return true;
    } catch(err) {
        console.error(`MongoDB connection error: ${err.message}`);
        client = null;
        return false;
    }
}

const getMongoDbClient = () => {
  return client;
};

module.exports = {
    _getDBUrl, connectMongoDB, getMongoDbClient
}