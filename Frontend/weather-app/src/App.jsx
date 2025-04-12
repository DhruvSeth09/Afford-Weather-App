import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import HistoryList from './components/HistoryList';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('history')) || [];
    setHistory(storedHistory);
  }, []);

  const handleSearch = async (city) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`http://localhost:5000/weather?city=${city}`);
      setWeatherData(res.data);
      console.log(res.data);
      let newHistory = [city, ...history.filter(c => c !== city)].slice(0, 10);
      localStorage.setItem('history', JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-gradient-to-br from-blue-50 to-blue-200 text-gray-900 min-h-screen'}>
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold tracking-tight">🌤️ Weather Dashboard</h1>
          <button
            className="px-3 py-1 border rounded-md text-sm shadow hover:scale-105 transition-transform"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>
        <SearchBar onSearch={handleSearch} />
        {loading && <p className="mt-4 animate-pulse text-center text-lg">Loading...</p>}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {weatherData && <WeatherCard data={weatherData} darkMode={darkMode} />}
        <HistoryList items={history} onSelect={handleSearch} />
      </div>
    </div>
  );
}

export default App;