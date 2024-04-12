const svc = require('./service.js');
const { getMongoDbClient } = require("../middlewares/mongoDB");
const passport = require('../passport/index');
const { uploadFileGrid } = require('../middlewares/upload.js');
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
    try {
        console.log(req.file);
        /*
        const client = getMongoDbClient();
        const db = client.db(process.env.MONGODB_NAME);

        const collection = db.collection('coffees');

        const name = req.params.name;
        const coffeeItem = await collection.findOne({ name: name });

        if(!coffeeItem) {
            throw new Error(errorMessages.NOT_EXIST_COFFEE);
        }
    */
        console.log(req.body);
        

        res.send('aa');
    } catch (err) {
        console.error(err);
        next();
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

        if(result.deletedCount > 0 && reco_result >0) {
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