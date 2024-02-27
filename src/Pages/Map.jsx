import React, { useEffect } from "react";

const MapWidget = () => {
  useEffect(() => {
    const loadGoogleMapsScript = (callback) => {
      if (typeof google === "undefined") {
        const script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAWyhzbj3x1zDjbr_8XRquJpgwEaNyhsA0";
        document.head.append(script);
        script.onload = () => {
          callback();
        };
      } else {
        callback();
      }
    };

    loadGoogleMapsScript(() => {
        new google.maps.Map(document.getElementById('map'), {
          center: new google.maps.LatLng(35.7596, -79.0193),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          zoom: 7,
        });
      });
    }, []);
  
    return <div id="map" style={{ height: "380px", width: "1000px", left: "25%", position: "relative" }}></div>;
  };
  
  export default MapWidget;
