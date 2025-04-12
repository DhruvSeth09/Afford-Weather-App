// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function SearchBar({ onSearch }) {
//   const [city, setCity] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   useEffect(() => {
//     const load = setTimeout(() => {
//       if (city.length > 1) {
//         axios.get(`http://localhost:5000/weather/suggestions?q=${city}`)
//           .then(res => setSuggestions(res.data))
//           .catch(() => setSuggestions([]));
//       } else {
//         setSuggestions([]);
//       }
//     }, 300);
//     return () => clearTimeout(load);
//   }, [city]);

//   return (
//     <div className="relative">
//       <input
//         type="text"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//         onKeyDown={(e) => e.key === 'Enter' && onSearch(city)}
//         className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
//         placeholder="Enter city name..."
//       />
//       {suggestions.length > 0 && (
//         <ul className="absolute z-20 w-full bg-white dark:bg-gray-700 border mt-1 rounded shadow-lg">
//           {suggestions.map((s, i) => (
//             <li
//               key={i}
//               className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-600 cursor-pointer"
//               onClick={() => {
//                 setCity(s);
//                 setSuggestions([]);
//                 onSearch(s);
//               }}
//             >
//               {s}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default SearchBar;





import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const load = setTimeout(() => {
      if (city.length > 1) {
        axios.get(`http://localhost:5000/weather/suggestions?q=${city}`)
          .then(res => {
            setSuggestions(res.data);
            setShowSuggestions(true);
          })
          .catch(() => {
            setSuggestions([]);
            setShowSuggestions(false);
          });
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);
    return () => clearTimeout(load);
  }, [city]);

  return (
    <div className="relative" ref={searchRef}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch(city);
            setShowSuggestions(false);
          }
        }}
        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white backdrop-blur-sm bg-white/80 dark:bg-gray-800/80"
        placeholder="Enter city name..."
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="search-suggestions">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="suggestion-item"
              onClick={() => {
                setCity(s);
                setShowSuggestions(false);
                onSearch(s);
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;