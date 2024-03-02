



// import React, { useState } from 'react';
// import axios from 'axios';

// const EventSearch = () => {
//   const [location, setLocation] = useState('');
//   const [events, setEvents] = useState(null);

//   const searchEvents = async () => {
//     try {
//       const response = await axios.get('https://serpapi.com/search.json', {
//         params: {
//           api_key: 'c34b4f54c1710cfe20fc6fa032d12a1bf18bfba919bf605b91cbb4423f70cd69',
//           engine: 'google_events',
//           q: `Events in ${location}`,
//           gl: 'us',
//         },
//       });

//       setEvents(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     }
//   };

//   return (
//     <div>
//       <label htmlFor="location">Enter Location:</label>
//       <input
//         type="text"
//         id="location"
//         placeholder="e.g., Austin"
//         value={location}
//         onChange={(e) => setLocation(e.target.value)}
//       />
//       <button onClick={searchEvents}>Search Events</button>

//       {/* Display events if available */}
//       {events && (
//         <div>
//           <h2>Events Results:</h2>
//           <pre>{JSON.stringify(events, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventSearch;
