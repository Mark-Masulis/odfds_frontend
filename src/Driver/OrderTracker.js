import React, {
    useEffect,
    useState
} from 'react'
import useWebSocket from 'react-use-websocket'

//props.token = the JWT associated with this driver user
//props.active = whether or not the socket is active and sending/receiving data from server
//props.frequencySeconds = how often in seconds location should be reported
//THE FOLLOWING FUNCTIONS ARE OPTIONAL
//props.onOrderReceived = the function called when a new order is received
//props.onOrderRejected = the function called when a received order times out or is manually rejected
//props.onOrderAccept = the function called when an available order is accepted
//props.onOrderPickup = the function called when an accepted order is picked up
//props.onNoLocation = the function called when the browser doesn't allow the user to access location
//props.onError = the function called when an error is returned from the server
export default function OrderTracker(props){
    const [timerId, setTimerId] = useState()

    const wsAddress = process.env.REACT_APP_WS_URL + '/driver/location?access_token=' + props.token

    const {sendJsonMessage, readyState} = useWebSocket(wsAddress, {
        onMessage: (event) => {
            var data = event.data
            switch(data.code){
                case 200:
                    //success
                    break
                case 201:
                    //A new order has been received
                    props.onOrderReceived(data.data)
                    break
                case 202:
                    //An order still needs to be accepted
                    break
                case 203:
                    //pending order was rejected
                    props.onOrderRejected(data.data)
                    break
                case 204:
                    //pending order was accepted
                    props.onOrderAccept(data.data)
                    break
                case 205:
                    //order was picked up
                    props.onOrderPickup(data.data)
                    break
                case 206:
                    //order was delivered
                    props.onDeliver(data.data)
                    break
                default:
                    if(data.code > 400 || JSON.parse(data).code > 400){
                        props.onError(data)
                    }
                    //something is wrong
                    break
            }
        }
    })

    const deactivate = () => {
        if(timerId){
            clearInterval(timerId)
        }
    }

    const activate = () => {
        setTimerId(setInterval(() => {
            getLocation()
        }, props.frequencySeconds * 1000))
    }

    useEffect(() => {
        if(!props.active){
            deactivate()
        }else{
            activate()
            getLocation()
        }
    }, [props.active])

    const getLocation = () => {
        if(navigator.geolocation){
            const coords = navigator.geolocation.getCurrentPosition((position) => {
                //success
                sendJsonMessage({latitude: position.coords.latitude, longitude: position.coords.longitude})
            }, (error) => {
                //failure
                deactivate()
                props.onNoLocation()
            })
        }else{
            //handle no navigation allowed by browser
            deactivate()
            props.onNoLocation()
        }
    }

    //just render empty div
    return(<div></div>)
}