import React, { useState, useEffect, useRef  } from 'react'
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
  //const [driverLocation, setDriverLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [restaurantLocation, setRestaurantLocation] = useState(null);
  const [restaurantLatLng, setRestaurantLatLng] = useState(null);
  const [destinationLatLng, setDestinationLatLng] = useState(null);
  const mapRef = useRef(null);
  const map = mapRef.current;

  // get customer location, driver location, and destination location 
  const getLocationData = () => {
    if (data) {
      console.log('data:', data);     
      //console.log('driver location:', { lat: data.driver.latitude, lng: data.driver.longitude });
      console.log('destination location:', data.data.customerStreet + ' ' + data.data.customerCity + ' ' + data.data.customerState + ' ' + data.data.customerZipCode);
      console.log('restaurant location:', data.data.restaurant.street + ' ' + data.data.restaurant.city + ' ' + data.data.restaurant.state + ' ' + data.data.restaurant.zipCode);
      //setDriverLocation({ lat: data.driver.latitude, lng: data.driver.longitude });
      setDestinationLocation(data.data.customerStreet + ' ' + data.data.customerCity + ' ' + data.data.customerState + ' ' + data.data.customerZipCode);
      setRestaurantLocation(data.data.restaurant.street + ' ' + data.data.restaurant.city + ' ' + data.data.restaurant.state + ' ' + data.data.restaurant.zipCode);                     
      }
  };
      
       
  useEffect(() => {
    console.log('component mounted');
    getLocationData();
  }, []);


  useEffect(() => {
    if (window.google && window.google.maps && destinationLocation && restaurantLocation) {     
      const geocoder = new window.google.maps.Geocoder();
      const bounds = new window.google.maps.LatLngBounds();
      const map = mapRef.current;
      // Geocode the restaurant location
      geocoder.geocode({ address: restaurantLocation }, (results, status) => {
        if (status === 'OK') {
          const restaurantLocationLatLng = results[0].geometry.location;
          setRestaurantLatLng(restaurantLocationLatLng);
          const marker = new window.google.maps.Marker({
            position: restaurantLocationLatLng,
            map,
            title: 'Restaurant Location',
          });
          bounds.extend(restaurantLocationLatLng);
        } else {
          console.error('Error geocoding restaurant location:', status);
        }
      });
      // Geocode the destination location
      geocoder.geocode({ address: destinationLocation }, (results, status) => {
        if (status === 'OK') {
          const destinationLocationLatLng = results[0].geometry.location;
          setDestinationLatLng(destinationLocationLatLng);
          const marker = new window.google.maps.Marker({
            position: destinationLocationLatLng,
            map,
            title: 'Destination Location',
          });
          bounds.extend(destinationLocationLatLng);
        } else {
          console.error('Error geocoding destination location:', status);
        }
      });
    }
  }, [destinationLocation, restaurantLocation, mapRef]);
  console.log('mapRef.current:', mapRef.current);
  console.log('isApiLoaded:', isApiLoaded);
  console.log('restaurantLatLng:', restaurantLatLng);
  console.log('destinationLatLng:', destinationLatLng);

    /*// Calculate the distance between the driver and destination locations
    useEffect(() => {
      if (map && destinationLocation && restaurantLocation) {
        const service = new window.google.maps.DistanceMatrixService();      
        const origins = [restaurantLocation];
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
    }, [map, destinationLocation, restaurantLocation]);
     */
    
  return ( 
  <div>
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      onLoad={() => setIsApiLoaded(true)}
    >
      {isApiLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={destinationLatLng || restaurantLatLng} 
        zoom={15}
        ref={mapRef}       
      >
        { /* Child components, such as markers, info windows, etc. */}
        {restaurantLatLng && (
            <Marker position={restaurantLatLng} label="Restaurant" />
          )}
          {destinationLatLng && (
            <Marker position={destinationLatLng} label="Destination" />
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




