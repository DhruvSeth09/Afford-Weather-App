// import React from 'react';

// function HistoryList({ items, onSelect }) {
//   return (
//     <div className="mt-8">
//       <h3 className="text-lg font-semibold mb-2">Search History</h3>
//       <ul className="flex flex-wrap gap-2">
//         {items.map((city, i) => (
//           <li
//             key={i}
//             onClick={() => onSelect(city)}
//             className="cursor-pointer px-4 py-1 bg-gray-300 text-sm rounded-full hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
//           >
//             {city}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default HistoryList;






import React from 'react';

function HistoryList({ items, onSelect }) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3">Search History</h3>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No search history yet</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {items.map((city, i) => (
            <li
              key={i}
              onClick={() => onSelect(city)}
              className="history-item"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HistoryList;