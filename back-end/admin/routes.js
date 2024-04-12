const express = require('express');;
const index = require('./index');
const router = express.Router();
const login_required = require('../middlewares/login-required');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/login', login_required.isNotLogin, index.login);
router.get('/logout', login_required.isLogin, index.logout);
router.get('/status', index.status);
router.post('/addItem', login_required.isLogin, upload.single('image'), index.addItem);
router.patch('/item/:name', login_required.isLogin, upload.single('image'), index.updateItem);
router.delete('/item/:name', login_required.isLogin, index.deleteItem);


module.exports = router;