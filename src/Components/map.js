import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

const GoogleMaps = ({ containerStyle, destinationLocation, restaurantLocation }) => {
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [restaurantLatLng, setRestaurantLatLng] = useState(null);
  const [destinationLatLng, setDestinationLatLng] = useState(null);
  const [directions, setDirections] = useState(null);
  const [directionsStatus, setDirectionsStatus] = useState(null);
  const mapRef = useRef(null);

  console.log('destination location:', destinationLocation);
  console.log('restaurant location:', restaurantLocation);
  
  useEffect(() => {
    if (window.google && window.google.maps && destinationLocation && restaurantLocation) {
      const geocoder = new window.google.maps.Geocoder();
      const bounds = new window.google.maps.LatLngBounds();

      Promise.all([
        new Promise((resolve) => {
          geocoder.geocode({ address: restaurantLocation }, (results, status) => {
            if (status === 'OK') {
              setRestaurantLatLng(results[0].geometry.location);
              bounds.extend(results[0].geometry.location);
            } else {
              console.error('Error geocoding restaurant location:', status);
            }
            resolve();
          });
        }),
        new Promise((resolve) => {
          geocoder.geocode({ address: destinationLocation }, (results, status) => {
            if (status === 'OK') {
              setDestinationLatLng(results[0].geometry.location);
              bounds.extend(results[0].geometry.location);
            } else {
              console.error('Error geocoding destination location:', status);
            }
            resolve();
          });
        }),
      ]).then(() => {
        if (restaurantLatLng && destinationLatLng) {
          const request = {
            origin: restaurantLatLng,
            destination: destinationLatLng,
            travelMode: window.google.maps.TravelMode.DRIVING,
          };

          const directionsService = new window.google.maps.DirectionsService();
          const distanceService = new window.google.maps.DistanceMatrixService();
          const origins = [restaurantLatLng];
          const destinations = [destinationLatLng];

          directionsService.route(request, (result, status) => {
            if (status === 'OK') {
              setDirections(result);
              setDirectionsStatus('OK');

              distanceService.getDistanceMatrix(
                {
                  origins,
                  destinations,
                  travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (response, status) => {
                  if (status === 'OK') {
                    const distance = response.rows[0].elements[0].distance.text;
                    console.log('distance:', distance);
                  } else {
                    console.error('Error calculating distance:', status);
                  }
                }
              );
            } else {
              console.error('Error requesting directions:', status);
              setDirectionsStatus(status);
            }
          });
        }
      });
    }
  }, [destinationLocation, restaurantLocation]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} onLoad={() => setIsApiLoaded(true)}>
      {isApiLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={destinationLatLng || restaurantLatLng} zoom={15} ref={mapRef}>
          {restaurantLatLng && <Marker position={restaurantLatLng} label="Restaurant" />}
          {destinationLatLng && <Marker position={destinationLatLng} label="Destination" />}
          {directionsStatus === 'OK' && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default GoogleMaps;
