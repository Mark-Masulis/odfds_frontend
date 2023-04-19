import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';
const containerStyle = {
  width: '100%',
  height: '400px'
};



function CustomerHomePage() {
  const location = useLocation();
  const { data } = location.state;
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [distance, setDistance] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState('Preparing');
  const [driverLocation, setDriverLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [restaurantLocation, setRestaurantLocation] = useState(null);
 
  // get restaurant order data, customer location, driver location, and destination location 
  // from the server and set them to state variables
  const getLocationData = () => {
    console.log(data);
    if (data) {
      console.log('data:', data);
     
      console.log('driver location:', { lat: data.driver.latitude, lng: data.driver.longitude });
      console.log('destination location:', data.customerStreet + ' ' + data.customerCity + ' ' + data.customerState + ' ' + data.customerZipCode);
      console.log('restaurant location:', data.restaurant.street + ' ' + data.restaurant.city + ' ' + data.restaurant.state + ' ' + data.restaurant.zipCode);
  
   
    setDriverLocation({ lat: data.driver.latitude, lng: data.driver.longitude });
    setDestinationLocation(data.customerStreet + ' ' + data.customerCity + ' ' + data.customerState + ' ' + data.customerZipCode);
    setRestaurantLocation(data.restaurant.street + ' ' + data.restaurant.city + ' ' + data.restaurant.state + ' ' + data.restaurant.zipCode);                     
  }
  };
      
      
  
  useEffect(() => {
    console.log('component mounted');
    getLocationData();
  }, []);


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
  }, [driverLocation, destinationLocation]);

  return (
   
  <div>
    <LoadScript
      googleMapsApiKey="AIzaSyDs2_jpEfeyLu89MS6szIa6ZKPhfKjd1zA"
      onLoad={() => setIsApiLoaded(true)}
    >
      {isApiLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={driverLocation || destinationLocation || restaurantLocation}  
        zoom={15}

        
      >
        { /* Child components, such as markers, info windows, etc. */}
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
      )}
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

 
export default React.memo(CustomerHomePage)




