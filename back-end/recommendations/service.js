const errorMessages = require('../error/errorMessages');
const { getMongoDbClient } = require('../middlewares/mongoDB');
//const resultQuestion = require('./model');

async function _getResultQuestion(name) {
    try {
        const client = getMongoDbClient();
        const db = client.db(process.env.MONGODB_NAME);

        const collection = db.collection('questionresults');

        const questionResult = await collection.findOne({ name: name });

        if(!questionResult) {
            throw new Error(errorMessages.NOT_FOUND_RESULT);
        }

        return questionResult;
    } catch(err) {
        console.error(`Error fetching data: ${err.message}`);
        throw err;
    }
}

async function _getRecommend(tags) {
    try {
        const client = getMongoDbClient();
        const db = client.db(process.env.MONGODB_NAME);

        const collection = db.collection('coffees');

        const query = {
            $and: [
                { region: { $in: tags[0].region }},
                { roast_level: { $in: tags[1].roast_level }},
                { grind_option: { $in: tags[2].grind_option }},
                { flavor_profile: { $in: tags[3].flavor_profile.concat(tags[4].flavor_profile) }},
            ]
        };

        const results = await collection.aggregate([ { $match: query }]).toArray();
        
        if(results.length > 1) {
            const randomIndex = Math.floor(Math.random() * results.length);

            return results[randomIndex].name;
        } 

        return results[0].name;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    _getResultQuestion, _getRecommend
}


