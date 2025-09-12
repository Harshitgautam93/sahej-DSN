import React, { useState, useEffect } from 'react';


const LocationComponent = ({ onLocationFetched, setLocationError }) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    errorMessage: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({
            latitude: lat,
            longitude: lon,
            errorMessage: null,
          });
          if (onLocationFetched) {
            onLocationFetched(lat, lon);
          }
          if (setLocationError) {
            setLocationError(null);
          }
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            errorMessage: error.message,
          });
          if (setLocationError) {
            setLocationError(error.message);
          }
        }
      );
    } else {
      const msg = 'Geolocation is not supported by this browser.';
      setLocation({
        latitude: null,
        longitude: null,
        errorMessage: msg,
      });
      if (setLocationError) {
        setLocationError(msg);
      }
    }
  }, [onLocationFetched, setLocationError]);

  return null;
};

export default LocationComponent;