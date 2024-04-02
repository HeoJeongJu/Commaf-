const express = require('express');
const index = require('./index');
const router = express.Router();

router.get('/:name', index.getCafe);

module.exports = router;