const svc = require('./service.js');
const { getMongoDbClient } = require("../middlewares/mongoDB");
const passport = require('../passport/index');
const { uploadFileGrid } = require('../middlewares/upload.js')
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

        const client = getMongoDbClient();
        const db = client.db(process.env.MONGODB_NAME);

        const coffeeData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            region: req.body.region,
            weight: req.body.weight,
            flavor_profile: req.body.flavor_profile,
            grind_option: req.body.grind_option,
            roast_level: req.body.roast_level,
            image_id: image
        };

        await db.collection('coffees').insertOne(coffeeData);

        res.status(201).send("Coffee and image saved successfully.");
    } catch (err) {
        console.error('Error saving coffee or image:', err);
        res.status(500).send("Error saving the coffee or image.");
    }
}


module.exports = {
    login, logout, status, addItem
}