//const Cafe = require('./model');
const { getMongoDbClient } = require('../middlewares/mongoDB');

async function _getCafeList(name) {
    try {
        const client = getMongoDbClient();
        const db = client.db(process.env.MONGODB_NAME);

        const collection = db.collection('caves');

        const cafeList = await collection.find({ coffee_name: name }).toArray();
        
        return cafeList;
    } catch (err) {
        console.error(`Error fetching data: ${err.message}`);
        throw err;
    }
}

module.exports = {
    _getCafeList
}


