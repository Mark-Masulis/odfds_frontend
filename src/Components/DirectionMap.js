import React from 'react'
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api'

//props.origin = [lat, lng] array or address string
//props.originLabel = how to label the origin marker
//props.destination = address string
//prps.destinationLabel = how to label the destination marker
export default function DirectionMap(props){

    const geocodeAddress = (addressString) => {
        const geocoder = new window.google.maps.Geocoder()
    }

    return(
        <div>

        </div>
    )
}