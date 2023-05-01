import React, {useState, useEffect} from 'react';
import GoogleMaps from '../Components/map';
import { useLocation } from 'react-router-dom';
const CustomerHomePage = () => {
  const containerStyle = {
    width: '100%',
    height: '400px',
  };
  const location = useLocation();
  const { data } = location.state;
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [restaurantLocation, setRestaurantLocation] = useState(null);
  
  useEffect(() => {
    getLocationData();
  }, []);

  const getLocationData = () => { 
    if (data) {
      console.log('data:', data);  
      setDriverLocation({ lat: data.data.driver.latitude, lng: data.data.driver.longitude });
      setDestinationLocation(data.data.customerStreet + ' ' + data.data.customerCity + ' ' + data.data.customerState + ' ' + data.data.customerZipCode);
      setRestaurantLocation(data.data.restaurant.street + ' ' + data.data.restaurant.city + ' ' + data.data.restaurant.state + ' ' + data.data.restaurant.zipCode);                     
      setDeliveryStatus(data.data.status);      
    }
  };
  useEffect(() => {
    console.log('driver location:', driverLocation);
    console.log('destination location:', destinationLocation);
    console.log('restaurant location:', restaurantLocation);
    console.log('delivery status:', deliveryStatus);
  }, [driverLocation, destinationLocation, restaurantLocation, deliveryStatus]);
  
  
  return (
    <div>
      {destinationLocation && restaurantLocation && (
        <GoogleMaps
          containerStyle={containerStyle}
          destinationLocation={destinationLocation}
          restaurantLocation={restaurantLocation}
        />
      )}
   
    <div style={{ margin: '30px', fontSize: '26px' }}>
    <p style={{ margin: 0, fontWeight: 'bold' }}>
      Delivery Status: {deliveryStatus === 'PICKEDUP' ? 'Delivering' : deliveryStatus === 'ACCEPTED' ? 'Preparing' : deliveryStatus}
    </p>
  </div>
  </div>
  );
};

export default CustomerHomePage;
