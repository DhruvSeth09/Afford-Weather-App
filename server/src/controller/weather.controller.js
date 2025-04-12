const { getCoordinates, getWeatherData, getCitySuggestions,getForecastData } = require('../services/wearther.services');
const Search = require('../models/search.model');

exports.getWeather = async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const { lat, lon, name } = await getCoordinates(city);
    const data = await getWeatherData(lat, lon);
    const forecastData= await getForecastData(lat,lon)

    const current = {
      temperature: data.main.temp,
      condition: data.weather[0].main,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
    

    const forecast = forecastData?.list
    ?.filter(item => item.dt_txt.includes('12:00:00')) // Get noon forecasts only
    .slice(0, 5) // Take next 5 days
    .map(item => ({
      date: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
      temp: Math.round(item.main.temp - 273.15), // Convert from Kelvin to Celsius
      icon: item.weather[0].icon,
      condition: item.weather[0].main
    })) || [];
    


    await Search.create({ city: name });
    res.json({ city: name, current, forecast });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Server Error' });
  }
};

exports.getSuggestions = async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Query is required' });

  try {
    const suggestions = await getCitySuggestions(query);
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch suggestions' });
  }
};