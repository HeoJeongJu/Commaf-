const express = require('express');
const index = require('./index');
const router = express.Router();

router.get('/', index.findAll);
router.get('/:name', index.findItem);

module.exports = router;