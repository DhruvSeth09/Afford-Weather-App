const express = require('express');
const router = express.Router();
const { getHistory } = require('../controller/history.controller');

router.get('/', getHistory);

module.exports = router;
