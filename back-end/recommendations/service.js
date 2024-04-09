const errorMessages = require('../error/errorMessages');
const { getMongoDbClient, getImage } = require('../middlewares/mongoDB');
//const resultQuestion = require('./model');

async function _getResultQuestion(name) {
    try {
        const client = getMongoDbClient();
        const db = client.db(process.env.MONGODB_NAME);

        const collection = db.collection('recommendations');

        const questionResult = await collection.findOne({ name: name });

        if(!questionResult) {
            throw new Error(errorMessages.NOT_FOUND_RESULT);
        }

        if(questionResult.image_id) {
            const imageBase64 = await getImage(questionResult.image_id);
            questionResult.image_url = `data:image/jpeg;base64, ${imageBase64}`;
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
        console.log(tags);

        const query = {
            $and: [
                { region: { $in: tags[0].region } },
                { roast_level: { $in: tags[1].roast_level } },
                { grind_option: tags[2].grind_option },
                {
                $or: [
                    { flavor_profile: { $in: tags[3].flavor_profile } },
                    { flavor_profile: { $in: tags[4].flavor_profile } }
                ]
                }
            ]
        };

        const results = await collection.find(query).toArray();
        
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


