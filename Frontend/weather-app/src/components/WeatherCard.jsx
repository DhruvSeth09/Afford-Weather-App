// import React from 'react';

// function WeatherCard({ data, darkMode }) {
//   const { city, current, forecast } = data;
//   return (
//     <div className={`mt-8 p-6 rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gradient-to-br from-blue-100 via-white to-blue-200 border border-blue-300'}`}>
//       <h2 className="text-2xl font-bold mb-4">Current Weather in {city}</h2>
//       <div className="flex items-center gap-6">
//         <img src={`http://openweathermap.org/img/wn/${current.icon}@2x.png`} alt={current.condition} className="w-20 h-20" />
//         <div>
//           <p className="text-5xl font-bold">{current.temperature}°C</p>
//           <p className="capitalize text-lg">{current.condition}</p>
//           <p className="text-sm">💧 {current.humidity}% | 🌬️ {current.windSpeed} m/s</p>
//         </div>
//       </div>
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-2">5-Day Forecast</h3>
//         <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
//           {forecast.map((day, i) => (
//             <div key={i} className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} shadow hover:scale-105 transform transition duration-300 text-center space-y-1`}>
//               <p className="font-medium text-sm">{day.date}</p>
//               <img
//                 className="mx-auto w-12 h-12"
//                 src={`http://openweathermap.org/img/wn/${day.icon}.png`}
//                 alt={day.condition}
//               />
//               <p className="text-md font-bold">{day.temp}°C</p>
//               <p className="text-xs capitalize">{day.condition}</p>
//               <p className="text-xs">🌡️ Min: {day.temp_min}°C / Max: {day.temp_max}°C</p>
//               <p className="text-xs">💧 {day.humidity}% | 🌬️ {day.windSpeed} m/s</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WeatherCard;




import React, { useState, useEffect } from 'react';



// Temperature converter utility
const convertTemperature = (temp, unit) => {
  if (unit === 'F') {
    return Math.round((temp * 9/5) + 32);
  }
  return Math.round(temp);
};

const  convertTempIntoC = (temp) => {
    return temp - 273.15;
  };

function WeatherCard({ data, darkMode }) {
  const { city, current, forecast } = data;
  const [tempUnit, setTempUnit] = useState('C'); // 'C' or 'F'
  const [temp, setTemp]=useState();


  useEffect(() => {
    setTemp(convertTempIntoC(current.temperature, tempUnit));
  }, [setTemp]);


  const toggleTempUnit = () => {
    setTempUnit(prev => prev === 'C' ? 'F' : 'C');
  };

  return (
    <div className={`mt-8 p-6 rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gradient-to-br from-blue-100 via-white to-blue-200 border border-blue-300'}`}>
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold mb-4">Current Weather in {city}</h2>
        <button 
          onClick={toggleTempUnit}
          className={`px-3 py-1 rounded-md text-sm ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-100 hover:bg-blue-200'}`}
        >
          °{tempUnit}
        </button>
      </div>
      
      <div className="flex items-center gap-6">
        <img src={`http://openweathermap.org/img/wn/${current.icon}@2x.png`} alt={current.condition} className="w-20 h-20" />
        <div>
          <p className="text-5xl font-bold">
           
            {convertTemperature(current.temperature-273.15, tempUnit)}°{tempUnit}
          </p>
          <p className="capitalize text-lg">{current.condition}</p>
          <p className="text-sm">💧 {current.humidity}% | 🌬️ {current.windSpeed} m/s</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">5-Day Forecast</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {forecast.map((day, i) => (
            <div key={i} className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} shadow hover:scale-105 transform transition duration-300 text-center space-y-1`}>
              <p className="font-medium text-sm">{day.date}</p>
              <img
                className="mx-auto w-12 h-12"
                src={`http://openweathermap.org/img/wn/${day.icon}.png`}
                alt={day.condition}
              />
              <p className="text-md font-bold">
                {convertTemperature(day.temp, tempUnit)}°{tempUnit}
              </p>
              <p className="text-xs capitalize">{day.condition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;