const express = require('express');
const router = express.Router();
const { getWeather, getSuggestions } = require('../controller/weather.controller');

router.get('/', getWeather);
router.get('/suggestions', getSuggestions);

module.exports = router;
