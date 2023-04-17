import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};


const driverLocation = { lat: 37.7749, lng: -122.4194 };
const destinationLocation = { lat: 37.7749, lng: -122.4316 };
const restaurantLocation = { lat: 37.7749, lng: -122.4085 };




function MyComponent({ deliveryStatus }) {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
    // Calculate the distance between the driver and destination locations
      if (driverLocation && destinationLocation) {
        const service = new window.google.maps.DistanceMatrixService();
        const origins = [driverLocation];
        const destinations = [destinationLocation];
        service.getDistanceMatrix(
          {
            origins,
            destinations,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === "OK") {
              const distance = response.rows[0].elements[0].distance.text;
              setDistance(distance);
            } else {
              console.error("Error calculating distance:", status);
            }
          }
        );
      }
    }
  })
  return (
     
  <div>
    <LoadScript
      googleMapsApiKey=""
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={driverLocation || destinationLocation || restaurantLocation}        
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {restaurantLocation && (
            <Marker position={restaurantLocation} label="Restaurant" />
          )}
          {driverLocation && (
            <Marker position={driverLocation} label="Driver" />
          )}
          {destinationLocation && (
            <Marker position={destinationLocation} label="Destination" />
          )}
      </GoogleMap>
    </LoadScript>

    <div style={{ margin: '30px', fontSize: '26px' }} >     
    <p style={{ margin: 0, fontWeight: 'bold' }}>Delivery Status: {deliveryStatus}</p>
        {distance && (
          <p style={{ margin: 0 }}>Distance to destination: {distance}</p>
        )}
     
    </div>
   </div>
  )
}
    
export default React.memo(MyComponent)
