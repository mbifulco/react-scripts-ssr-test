const express = require('express');
const universalLoader = require('../universal');

const router = express.Router();

router.get('/', universalLoader);

module.exports = router;
