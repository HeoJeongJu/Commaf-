const errorMessages = require('../error/errorMessages');
//const Coffee = require('./model');
const { getMongoDbClient, getImage } = require('../middlewares/mongoDB');

async function _getList() {
    try {
        const client = getMongoDbClient();
        const db = client.db(process.env.MONGODB_NAME);

        const collection = db.collection('coffees');
        const coffeeList = await collection.find({}).toArray();

        const imagePromise = coffeeList.map(async (coffee) => {
            if(coffee.image_id) {
                const imageBase64 = await getImage(coffee.image_id);
                coffee.image_url = `data:image/jpeg;base64, ${imageBase64}`;
            }
        });

        await Promise.all(imagePromise);

        return coffeeList;
    } catch(err) {
        console.error(`Error fetching data: ${err.message}`);
        throw err;
    }
}

async function _getItem(name) {
    try {
        const client = getMongoDbClient();
        const db = client.db(process.env.MONGODB_NAME);

        const collection = db.collection('coffees');

        const coffeeItem = await collection.findOne({ name: name });

        if(!coffeeItem) {
            throw new Error(errorMessages.NOT_EXIST_COFFEE);
        }

        if(coffeeItem.image_id) {
                const imageBase64 = await getImage(coffeeItem.image_id);
                coffeeItem.image_url = `data:image/jpeg;base64, ${imageBase64}`;
        }

        return coffeeItem;
    } catch(err) {
        console.error(`Error fetching data: ${err.message}`);
        throw err;
    }
}




module.exports = {
    _getList, _getItem
}


