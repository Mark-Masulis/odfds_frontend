/* global google */
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

const GoogleMaps = ({ containerStyle, destinationLocation, originLocation }) => {
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [originLatLng, setOriginLatLng] = useState(null);
  const [destinationLatLng, setDestinationLatLng] = useState(null);
  const [directions, setDirections] = useState(null);
  const [directionsStatus, setDirectionsStatus] = useState(null);
  const mapRef = useRef(null);

  console.log('destination location:',destinationLocation);
  console.log('origin location:', originLocation);
  
  useEffect(() => {
    if(!isApiLoaded){
      return;
    }
    if (window.google && window.google.maps && destinationLocation && originLocation) {
      const geocoder = new window.google.maps.Geocoder();
      const bounds = new window.google.maps.LatLngBounds();

      var originCoords;
      var destCoords;

      Promise.all([
        new Promise((resolve, reject) => {
          geocoder.geocode({ address: originLocation }, (results, status) => {
            if (status === 'OK') {
              setOriginLatLng(results[0].geometry.location);
              originCoords = results[0].geometry.location;
              bounds.extend(results[0].geometry.location);
            } else {
              console.error('Error geocoding origin location:', status);
              reject()
              return
            }
            resolve();
          });
        }),
        new Promise((resolve, reject) => {
          geocoder.geocode({ address: destinationLocation }, (results, status) => {
            if (status === 'OK') {
              setDestinationLatLng(results[0].geometry.location);
              destCoords = results[0].geometry.location;
              bounds.extend(results[0].geometry.location);
            } else {
              console.error('Error geocoding destination location:', status);
              reject()
              return
            }
            resolve();
          });
        }),
      ]).then(() => {
        if (originCoords && destCoords) {
          const request = {
            origin: originCoords,
            destination: destCoords,
            travelMode: window.google.maps.TravelMode.DRIVING,
          };

          const directionsService = new window.google.maps.DirectionsService();
          const distanceService = new window.google.maps.DistanceMatrixService();
          const origins = [originCoords];
          const destinations = [destCoords];

          directionsService.route(request, (result, status) => {
            if (status === 'OK') {
              console.log("DIRECTIONS DONE")
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
              console.log("DIRECTIONS FAILED")
              console.error('Error requesting directions:', status);
              setDirectionsStatus(status);
            }
          });
        }
      }).catch(
        (error) => {
          console.error(error)
        }
      );
    }
  }, [isApiLoaded]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} onLoad={() => setIsApiLoaded(true)}>
      {isApiLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={destinationLatLng || originLatLng} zoom={15} ref={mapRef}>
          {originLatLng && <Marker position={originLatLng} label="Restaurant" />}
          {destinationLatLng && <Marker position={destinationLatLng} label="Destination" />}
          {directionsStatus === 'OK' && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default GoogleMaps;
