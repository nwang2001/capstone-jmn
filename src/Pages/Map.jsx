import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../Components/mapstyle.css";

const MapWidget = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const loadGoogleMapsScript = (callback) => {
      if (typeof google === "undefined") {
        const script = document.createElement("script");
        document.head.append(script);
        script.onload = () => {
          callback();
        };
      } else {
        callback();
      }
    };

    loadGoogleMapsScript(() => {
      const initialMap = new window.google.maps.Map(document.getElementById('map'), {
        center: new window.google.maps.LatLng(35.7596, -79.0193),
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        zoom: 7
      });
      setMap(initialMap);
    });
  }, []);

  const findFoodBanks = (zipcode) => {
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
    setAddresses([]); 

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ 'address': zipcode }, (results, status) => {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
        map.setZoom(12);

        const service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: results[0].geometry.location,
          radius: '5000',
          keyword: 'food bank',
        }, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            const newAddresses = results.map(place => ({
              name: place.name,
              address: place.vicinity,
            }));
            setAddresses(newAddresses); 

            const newMarkers = results.map((place) => {
              const marker = new window.google.maps.Marker({
                position: place.geometry.location,
                map: map,
                title: place.name,
              });

              const infowindow = new window.google.maps.InfoWindow({
                content: `
                  <div>
                    <strong>${place.name}</strong><br>
                    ${place.vicinity}<br>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.name)}" target="_blank" rel="noopener noreferrer">Google Map Directions</a>
                  </div>
                `,
              });

              marker.addListener('click', () => {
                infowindow.open(map, marker);
              });

              return marker;
            });
            setMarkers(newMarkers);
          } else {
            alert("No food banks found in this area.");
          }
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  const toggleMarkers = () => {
    const currentMap = markers[0] && markers[0].getMap() ? null : map;
    markers.forEach(marker => marker.setMap(currentMap));
  };

  const saveAddress = (address) => {
    axios.post('http://localhost:3500/users/saveAddress', {
      userId: localStorage.getItem('userId'), 
      address: address,
    })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => console.error('Error saving address:', error));
  };

  return (
    <>
      <div className="container">
        <h1>Find A Food Banks Near You</h1>
        <p>Enter your Zipcode or Address to find a Food Bank near you!</p>
        <input className="zipcode-input" type="text" placeholder="Enter Zipcode or Address" />
        <div className="mapbuttons">
          <button className="find-button" onClick={() => {
            const input = document.querySelector('.zipcode-input');
            findFoodBanks(input.value);
          }}>Find Food Banks</button>
          <button className="toggle-button" onClick={toggleMarkers}>Toggle Markers</button>
        </div>
      </div>
      <div className="map-container">
        <div id="map" className="map"></div>
        <div className="addresses">
          <h1>Locations Near You:</h1>
          <ul className="address-list">
            {addresses.map((place, index) => (
              <li key={index} className="address-item">
                - <strong>{place.name}</strong>: <br></br> {place.address}
                <br></br>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`} target="_blank" rel="noopener noreferrer">
                  Google Map Directions
                </a>
                <button className="save-address-btn" onClick={() => saveAddress(place.address)}>Save Address</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MapWidget;