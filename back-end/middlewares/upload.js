const { GridFSBucket } = require('mongodb');
const  multer  = require('multer');
const { getMongoDbClient} = require("../middlewares/mongoDB");
const stream = require('stream');
require('dotenv').config();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadFileGrid = async (file) => {
    const client = getMongoDbClient();

    if (!client) {
        console.error('MongoDB client is not connected.');
        return;
    }
    
    const db = client.db(process.env.MONGODB_NAME);
    
    const bucket = new GridFSBucket(db, { bucketName: 'images'});

    if(file) {
        const readableStream = new stream.PassThrough();
        readableStream.end(file.buffer);

      const uploadStream = bucket.openUploadStream(file.originalname, {
        metadata: { contentType: file.mimetype }
      });

      readableStream.pipe(uploadStream);

      return new Promise((resolve, reject) => {
            uploadStream.on('error', reject);
            uploadStream.on('finish', () => resolve(uploadStream.id.toString()));
        });
    } else {
        return null;
    }
};

module.exports = { upload, uploadFileGrid };
