import React, { useState } from 'react';
import axios from 'axios';

const EventSearch = () => {
  const [city, setCity] = useState('');
  const [events, setEvents] = useState(null);

  const searchEvents = async () => {
    try {
      const response = await axios.post('http://localhost:3001/Event', {
        city: city,
      });

      console.log(response.data); 

      setEvents(response.data.events_results);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div>
      <label htmlFor="city">Enter City:</label>
      <input
        type="text"
        id="city"
        placeholder="e.g., Charlotte"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={searchEvents}>Search Events</button>

      {/* Display events if available */}
      {events && (
        <div>
          <h2>Events Results:</h2>
          {events.map((event, index) => (
            <div key={index}>
              <p>{event.title}</p>
              {/* Add other event details as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventSearch;
