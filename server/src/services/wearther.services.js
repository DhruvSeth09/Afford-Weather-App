const axios = require('axios');
const { OPENWEATHER_API_KEY, GEODB_API_KEY } = require('../config/api.config');

async function getCoordinates(city) {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPENWEATHER_API_KEY}`;
  const response = await axios.get(geoUrl);
  if (!response.data.length) throw new Error('City not found');
  return response.data[0];
}

async function getWeatherData(lat, lon) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
  const response = await axios.get(weatherUrl);
  return response.data;
}

async function getForecastData(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
    const response = await axios.get(weatherUrl);
    return response.data;
  }

async function getCitySuggestions(query) {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5`;
  const headers = {
    'X-RapidAPI-Key': GEODB_API_KEY,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  };
  const response = await axios.get(url, { headers });
  return response.data.data.map(city => city.name);
}

module.exports = { getCoordinates, getWeatherData, getCitySuggestions,getForecastData };