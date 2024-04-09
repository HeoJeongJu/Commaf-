const { MongoClient, GridFSBucket, ObjectId } = require("mongodb");

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

const getImage = (object_id) => {
  return new Promise((resolve, reject) => {
    const client = getMongoDbClient();
    const db = client.db(process.env.MONGODB_NAME);
    const bucket = new GridFSBucket(db, { bucketName: 'images'});
    
    const downloadStream = bucket.openDownloadStream(new ObjectId(object_id));
    let data = [];

    downloadStream.on('data', (chunk) => {
            data.push(chunk);
        });
    downloadStream.on('error', (err) => {
        reject(err);
    });
    downloadStream.on('end', () => {
        resolve(Buffer.concat(data).toString('base64'));
    });
  });
};

module.exports = {
    _getDBUrl, connectMongoDB, getMongoDbClient, getImage
}