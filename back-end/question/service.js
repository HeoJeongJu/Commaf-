//const Question = require('./model');
const { getMongoDbClient } = require('../middlewares/mongoDB');

async function _getQuestion() {
    try {
        const client = getMongoDbClient();
        const db = client.db(process.env.MONGODB_NAME);

        const collection = db.collection('questions');

        const questionList = await collection.find({}).toArray();

        return questionList;
    } catch (err) {
        console.error(`Error fetching data: ${err.message}`);
        throw err;
    }
}

module.exports = {
    _getQuestion
}


