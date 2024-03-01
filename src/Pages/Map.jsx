import React, { useState, useEffect } from "react";
// const google = window.google;

const MapWidget = () => {
  const [map, setMap] = useState(null);
  const [mapState, setMapState] = useState(false);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const loadGoogleMapsScript = (callback) => {
      if (typeof google === "undefined") {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAWyhzbj3x1zDjbr_8XRquJpgwEaNyhsA0`;
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
      setMapState(true);
    });
  }, []);

  const findFoodBanks = (zipcode) => {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

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
            const newMarkers = results.map((place) => {
              const marker = new window.google.maps.Marker({
                position: place.geometry.location,
                map: map,
                title: place.name,
              });

              const infowindow = new window.google.maps.InfoWindow({
                content: `<div><strong>${place.name}</strong><br>${place.vicinity}</div>`,
              });

              marker.addListener('click', () => {
                infowindow.open(map, marker);
              });
              marker.addListener('dblclick', () => {
                infowindow.close();
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
    const currentMap = markers[0] && markers[0].getMap() ? null : map; // Determine whether to show or hide markers
    markers.forEach(marker => marker.setMap(currentMap));
  };

  return (
    <>
      <input type="text" placeholder="Enter Zipcode" />
      <button onClick={() => {
        const input = document.querySelector('input[type="text"]');
        findFoodBanks(input.value);
      }}>Find Food Banks</button>
      <button onClick={toggleMarkers}>Toggle Markers</button>
      <div id="map" style={{ height: "380px", width: "1000px" }}></div>
    </>
  );
};

export default MapWidget;