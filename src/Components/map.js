/* global google */
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';

//create your forceUpdate hook
function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here 
  // is better than directly setting `setValue(value + 1)`
}

const GoogleMaps = ({ containerStyle, destinationLocation, originLocation, driverLocation, originLabel="Restaurant", destinationLabel="Customer", toWhere="Customer" }) => {
 
  const forceUpdate = useForceUpdate();
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const [originLatLng, setOriginLatLng] = useState(null);
  const [destinationLatLng, setDestinationLatLng] = useState(null);
  const [driverLatLng, setDriverLatlng] = useState(null);
  const [directions, setDirections] = useState(null);
  const [directionsStatus, setDirectionsStatus] = useState(null);
  const [path, setPath] = useState([]);
  const mapRef = useRef(null);
  
  useEffect(() => {
    if(!isLoaded){
      return;
    }
    if (window.google && window.google.maps) {
      if (destinationLocation && originLocation) {
        const geocoder = new window.google.maps.Geocoder();
        const bounds = new window.google.maps.LatLngBounds();

        var originCoords;
        var destCoords;

        Promise.all([
          new Promise((resolve, reject) => {
            // if origin location is already a coordinate, no need to ask google maps api
            if (originLocation.lat && originLocation.lng) {
              setOriginLatLng(originLocation);
              originCoords = originLocation;
              bounds.extend(originLocation);
              resolve();
              return;
            }
            // otherwise, ask google maps api
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
            // if destination location is already a coordinate, no need to ask google maps api
            if (destinationLocation.lat && destinationLocation.lng) {
              setDestinationLatLng(destinationLocation);
              destCoords = destinationLocation;
              bounds.extend(destinationLocation);
              resolve();
              return;
            }
            // otherwise, ask google maps api
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
            let request = {
              origin: originCoords,
              destination: destCoords,
              travelMode: window.google.maps.TravelMode.DRIVING
            }

            // if driverLocation exists, showing route from driver to destination, otherwise, showing route from origin to destination (display a static route only)
            if (driverLocation && driverLocation.lat && driverLocation.lng) {
              request.origin = driverLocation;
              setDriverLatlng(driverLocation);
              // if toWhere != Customer, it means the driver is heading to restaurant, hence destination will be the originCoords (Restaurant)
              if (toWhere != "Customer") {
                request.destination = originCoords;
              }
            }
            
            const directionsService = new window.google.maps.DirectionsService();
            const distanceService = new window.google.maps.DistanceMatrixService();
            const origins = [originCoords];
            const destinations = [destCoords];

            console.log(request);

            directionsService.route(request, (result, status) => {
              if (status === 'OK') {
                console.log("DIRECTIONS DONE")
                setDirections(result);
                setDirectionsStatus('OK');

                distanceService.getDistanceMatrix(
                  {
                    origins,
                    destinations,
                    travelMode: window.google.maps.TravelMode.DRIVING
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
      } else if (destinationLocation) {
        // only shows the location of destination (display a marker only)
        const geocoder = new window.google.maps.Geocoder();
        const bounds = new window.google.maps.LatLngBounds();
        
        // if destination is an coordination, no need to fetch data from google
        if (destinationLocation.lat && destinationLocation.lng) {
          setDestinationLatLng(destinationLocation);
          bounds.extend(destinationLocation);
          return;
        }

        new Promise((resolve, reject) => {
          geocoder.geocode({ address: destinationLocation }, (results, status) => {
            if (status === 'OK') {
              setDestinationLatLng(results[0].geometry.location);
              bounds.extend(results[0].geometry.location);
            } else {
              console.error('Error geocoding destination location:', status);
              reject()
              return
            }
            resolve();
          })
        });
      }
    }
  }, [isLoaded, destinationLocation, originLocation, driverLocation, toWhere]);

  const renderMap = () => {
    return (
      <GoogleMap mapContainerStyle={containerStyle} center={driverLocation || destinationLatLng || originLatLng} zoom={15} ref={mapRef} onLoad={forceUpdate}>
          {originLatLng && <Marker position={originLatLng} label={originLabel} />}
          {destinationLatLng && <Marker position={destinationLatLng} label={destinationLabel} />}
          {directionsStatus === 'OK' && <DirectionsRenderer options={{suppressMarkers: true}} directions={directions}/>}
          {driverLatLng && <Marker position={driverLatLng} label="Driver"/>}
        </GoogleMap>
    );
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return (
    <div>
      {isLoaded ? renderMap() : <div>Loading</div>}
    </div>
  );
};

export default GoogleMaps;
