const { GridFSBucket, ObjectId } = require('mongodb');
const  multer  = require('multer');
const { getMongoDbClient} = require("../middlewares/mongoDB");
const stream = require('stream');
const errorMessages = require('../error/errorMessages');
require('dotenv').config();


const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fieldNameSize: 1000,   // 필드 이름의 최대 크기(bytes)
        fieldSize: 1024 * 1024 * 2, // 필드 값의 최대 크기(bytes), 여기서는 1MB로 설정
        fileSize: 1024 * 1024 * 5, // 파일 크기의 최대 크기(bytes), 여기서는 5MB로 설정
    }
 });

const uploadFileGrid = async (file) => {
    const client = getMongoDbClient();

    if (!client) {
        throw new Error(errorMessages.NOT_CONNECT_DB);
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

const updateFileGrid = async (file, name) => {
    if(file === undefined || file === null) {
        return;
    }
    
    try {
        const client = getMongoDbClient();
        if (!client) {
            throw new Error(errorMessages.NOT_CONNECT_DB);
        }
        
        const db = client.db(process.env.MONGODB_NAME);
        
        const bucket = new GridFSBucket(db, { bucketName: 'images'});
        
        console.log("name", name);
        const coffee = await db.collection('coffees').findOne({ name: name });
        if(!coffee) {
            throw new Error(errorMessages.NOT_EXIST_COFFEE);
        }
        
        if(coffee.image_id) {
            await bucket.delete(new ObjectId(coffee.image_id));
        }
        

        const readableStream = new stream.PassThrough();
        readableStream.end(file.buffer);

        const uploadStream = bucket.openUploadStream(file.originalname, {
        metadata: { contentType: file.mimetype }});

        readableStream.pipe(uploadStream);

        return new Promise((resolve, reject) => {
            uploadStream.on('error', reject);
            uploadStream.on('finish', () => resolve(uploadStream.id.toString()));
        });
    } catch(err) {
        console.error('Failed to update file', err);
        throw err;
    }
}

module.exports = { upload, uploadFileGrid, updateFileGrid };
