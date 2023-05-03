import React, {useState, useEffect} from 'react';
import GoogleMaps from '../Components/map';
import { useLocation } from 'react-router-dom';
const CustomerHomePage = () => {
  const containerStyle = {
    width: '100%',
    height: '400px',
  };
  const location = useLocation();
  const [data, setData] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [restaurantLocation, setRestaurantLocation] = useState(null);
  const [trace, setTrace] = useState(null);

  useEffect(() => {
  const fetchData = async() => {
    fetch(`${process.env.REACT_APP_API}/customer/order?token=${location.state.token}`, {
      method: 'GET',
      headers: {          
        'Content-Type': 'application/json'         
      }
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if(data.code != 200){
          if (data.data.message) {
            alert(data.data.message);
          } else {
            alert(data.data);
          }
        } else {
          setData(data);
        }
      })
      .catch(error => {         
        console.error('Error fetching data:', error);
      });
    }

    fetchData();
  }, [])
  
  useEffect(() => {
    if (data) {
      getLocationData();
    }
  }, [data]);

  const getLocationData = () => { 
    if (data) {
      console.log('data:', data);  
      setDriverLocation({ lat: data.data.driver.latitude, lng: data.data.driver.longitude });
      setDestinationLocation(data.data.customerStreet + ' ' + data.data.customerCity + ' ' + data.data.customerState + ' ' + data.data.customerZipCode);
      setRestaurantLocation(data.data.restaurant.street + ' ' + data.data.restaurant.city + ' ' + data.data.restaurant.state + ' ' + data.data.restaurant.zipCode);                     
      setDeliveryStatus(data.data.status);
      setTrace(data.data.trace);   
    }
  };

  useEffect(() => {
    console.log('driver location:', driverLocation);
    console.log('destination location:', destinationLocation);
    console.log('restaurant location:', restaurantLocation);
    console.log('delivery status:', deliveryStatus);
  }, [driverLocation, destinationLocation, restaurantLocation, deliveryStatus]);
  
  if (!data) {
    return <div>loading</div>
  }

  return (
    <div>
      <span>
        {(data.data.status == "ACCEPTED" ) && destinationLocation && restaurantLocation && (
          <GoogleMaps
            containerStyle={containerStyle}
            destinationLocation={destinationLocation}
            originLocation={restaurantLocation}
            driverLocation={driverLocation}
            toWhere='Restaurant'
          />
        )}
      </span>

      <span>
        {(data.data.status == "PICKEDUP") && destinationLocation && restaurantLocation && (
          <GoogleMaps
            containerStyle={containerStyle}
            destinationLocation={destinationLocation}
            originLocation={restaurantLocation}
            driverLocation={driverLocation}
            toWhere='Customer'
          />
        )}
      </span>
    
    <div style={{ margin: '30px', fontSize: '20px' }}>
    <p style={{ fontWeight: 'bold' }}>
      Order Status: <span>{data.data.status == "PICKEDUP" ? "driver picked up, delivering" : ""}</span>
      <span>{data.data.status == "ACCEPTED" ? "driver accepted, picking up" : ""}</span>
      <span>{data.data.status == "CANCELLED" ? "cancelled" : "" }</span>
      <span>{data.data.status == "DELIVERED" ? "delivered" : "" }</span>
      <span>{data.data.status != "PICKEDUP" && data.data.status != "ACCEPTED" && data.data.status != "CANCELLED" && data.data.status != "DELIVERED" && data.data.status ? data.data.status : ""}</span>
    </p>
    <p>Order #{ data.data.id }</p>
    <p>Driver Name: { data.data.driver.firstName + " " + data.data.driver.lastName }</p>
    <p>Driver Phone: { data.data.driver.phone }</p>
    <p>Restaurant Name: { data.data.restaurant.name }</p>
    <p>Restaurant Phone: { data.data.restaurant.phone }</p>
    <span>
        {(data.data.status == "PICKEDUP" || data.data.status == "ACCEPTED") && (
          <div>
            <p>Estimated Time: {new Date(data.data.estimatedDeliveryTime).toLocaleString()} </p>
          </div>
        )}
      </span>
    <span>
        {(data.data.status == "DELIVERED") && (
          <div>
            <p>Delivered Time: {new Date(data.data.actualDeliveryTime).toLocaleString()} </p>
          </div>
        )}
      </span>
  </div>
  </div>
  );
  
};

export default CustomerHomePage;
