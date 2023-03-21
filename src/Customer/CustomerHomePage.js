import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GoogleMap, LoadScript, Marker} from "@react-google-maps/api";

const mapStyles = {
  width: '400px',
  height: '400px'
};

export default function CustomerHomePage(props) {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const [deliveryStatus, setDeliveryStatus] = useState("Pending");
  const [restaurantPosition, setRestaurantPosition] = useState(null);
  const [customerPosition, setCustomerPosition] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    // Send a request to the backend to get the current delivery status
    fetch(`/api/delivery/status?token=${token}`)
      .then((response) => {
        // Check if the response was successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        setDeliveryStatus(data.status);
      })
      .catch((error) => {
        console.error(error);
      });

    // Send a request to the backend to get the restaurant position and customer position
    fetch(`/api/delivery/positions?token=${token}`)
      .then((response) => {
        // Check if the response was successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        setRestaurantPosition(data.restaurantPosition);
        setCustomerPosition(data.customerPosition);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  useEffect(() => {
    // Calculate the distance between the restaurant and customer positions
    if (restaurantPosition && customerPosition) {
      const service = new window.google.maps.DistanceMatrixService();
      const origins = [restaurantPosition];
      const destinations = [customerPosition];
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
  }, [restaurantPosition, customerPosition]);

  return (
    <div style={{ margin: "0 auto", width: "70%", padding: "65px" }}>
      <h1 style={{ marginTop: "40px" }}>Current Status: {deliveryStatus}</h1>
      <div style={{ marginTop: "40px" }}>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap mapContainerStyle={mapStyles} center={restaurantPosition}>
            {restaurantPosition && (
              <Marker position={restaurantPosition} label="Restaurant" />
            )}
            {customerPosition && (
              <Marker position={customerPosition} label="Customer" />
            )}
          </GoogleMap>
        </LoadScript>
        {distance && (
          <p style={{ marginTop: "20px" }}>Distance to destination: {distance}</p>
        )}
      </div>
      <p style={{marginTop: "40px", fontSize: "24px"}}>Estimated Time of Arrival: </p>
    </div>
  );
}
