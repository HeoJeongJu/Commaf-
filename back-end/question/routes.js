const express = require('express');
const index = require('./index');
const router = express.Router();

router.get('/', index.getQuestion);

module.exports = router;