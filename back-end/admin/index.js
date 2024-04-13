const svc = require('./service.js');
const { getMongoDbClient } = require("../middlewares/mongoDB");
const passport = require('../passport/index');
const { uploadFileGrid, updateFileGrid } = require('../middlewares/upload.js');
const errorMessages = require('../error/errorMessages.js');
const { ObjectId } = require('mongodb');
const { GridFSBucket } = require('mongodb');
require('dotenv').config();


const login = (req, res, next) => {
    passport.authenticate('local', (err, admin, info) => {
        if(err) {
            console.error(err);
            return next(err);
        }
        if(!admin) {
            return res.redirect(info.message);
        }
        return req.login(admin, (err) => {
            if(err) {
                console.error(err);
                return next(err);
            }
            return res.status(200).send(admin);
        });
    }) (req, res, next);
};

const logout = (req, res, next) => {
    req.logout((err) => {
        req.session.destroy();
        if(err) {
            console.error(err);
            return next();
        } else {
            res.status(200).send("로그아웃 완료");
        }
    })
};

const status = (req, res, next) => {
    if (req.isAuthenticated()) { 
        res.json({ isLogin: true });
  } else {
        res.json({ isLogin: false });
  }
};

const addItem = async (req, res) => {
    try {
        const image = await uploadFileGrid(req.file);

        if(!image) {
            return res.status(500).send("Error saving the image.");
        }

        const client = getMongoDbClient();
        const db = client.db(process.env.MONGODB_NAME);

        const coffeeData = {
            name: req.body.name,
            description: req.body.description[0],
            price: req.body.price,
            region: req.body.region,
            weight: Number(req.body.weight),
            flavor_profile: req.body.flavor_profile,
            grind_option: req.body.grind_option,
            roast_level: Number(req.body.roast_level),
            image_id: image
        };

        const resultData = {
            name: req.body.name,
            sub_name: req.body.sub_name,
            sub_title: req.body.sub_title,
            description: req.body.description[1],
            image_id: image
        }

        await db.collection('coffees').insertOne(coffeeData);
        await db.collection('recommendations').insertOne(resultData);

        res.status(201).send("Coffee and image saved successfully.");
    } catch (err) {
        console.error('Error saving coffee or image:', err);
        res.status(500).send("Error saving the coffee or image.");
    }
}

const updateItem = async (req, res, next) => {
    
    // 바뀐 파일 및 데이터가 있는지 확인
    if(!req.file && (!req.body || Object.keys(req.body).length === 0)) {
        return res.status(400).send('No data provided for update.');
    }

    try {
        const client = getMongoDbClient();
        const db = client.db(process.env.MONGODB_NAME);

        const coffeeCollection = db.collection('coffees');
        const recommCollection = db.collection('recommendations');

        const name = req.params.name;

        const coffeeData = {};
        const recommendationData = {};
    
        for (const [key, value] of Object.entries(req.body)) {
            if (key.startsWith('coffee_')) {
                const newKey = key.replace('coffee_', '');
                coffeeData[newKey] = value;

                // 만약 커피의 이름을 바꾼거라면 추천쪽의 커피 이름도 바뀌어야함
                if(newKey === 'name') {
                    recommendationData[newKey] = value;
                }
            } else if (key.startsWith('recommendation_')) {
                const newKey = key.replace('recommendation_', '');
                recommendationData[newKey] = value;
            }
        }
        
        console.log("coffeeData", coffeeData);
        console.log("recommendationData", recommendationData);
        
        
        if(req.file) {
            const image = await updateFileGrid(req.file, name);
            coffeeData.image_id = image;
            recommendationData.image_id = image;
        } 

        
        if(Object.keys(coffeeData).length > 0 && Object.keys(recommendationData).length > 0) {
            await Promise.all([
                coffeeCollection.updateOne({ name }, { $set: coffeeData }),
                recommCollection.updateOne({ name }, { $set: recommendationData })
            ]);

            res.status(200).send("Coffee and recommendation editing were successful.");
        } else if (Object.keys(coffeeData).length > 0) {
            await coffeeCollection.updateOne({ name }, { $set: coffeeData });
            res.status(200).send("Coffee editing were successful.");
        } else if(Object.keys(recommendationData).length > 0) {
            await recommCollection.updateOne({ name }, { $set: recommendationData });
            res.status(200).send("Recommendation editing were successful.");
        }
        else {
            res.status(200).send('There is no data to modify.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to update due to an internal error.');
    }
}

const deleteItem = async (req, res, next) => {
    try {
        const client = getMongoDbClient();
        const db = client.db(process.env.MONGODB_NAME);

        const collection = db.collection('coffees');

        const name = req.params.name;
        const coffeeItem = await collection.findOne({ name: name });

        if(!coffeeItem) {
            throw new Error(errorMessages.NOT_EXIST_COFFEE);
        }

        const bucket = new GridFSBucket(db, { bucketName: 'images'});
        if(coffeeItem.image_id) {
            bucket.delete(new ObjectId(coffeeItem.image_id));
        }
        
        const result = await collection.deleteOne({name: coffeeItem.name});
        const reco_result = await collection.deleteOne({name: coffeeItem.name});

        if(result.deletedCount > 0 && reco_result > 0) {
            res.status(200).send("delete success");
        } else {
            res.status(400).send("Your request was not performed properly.")
        }
    } catch (err) {
        console.error(err);
        next();
    }
}

module.exports = {
    login, logout, status, addItem, updateItem, deleteItem
}