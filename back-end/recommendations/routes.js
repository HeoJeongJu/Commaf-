const express = require('express');
const index = require('./index');
const router = express.Router();

router.get('/:name', index.getQuestionResult);
router.post('/result', index.recommendation)

module.exports = router;