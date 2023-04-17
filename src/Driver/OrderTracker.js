import React, {
    useEffect,
    useState
} from 'react'
import useWebSocket from 'react-use-websocket'

//props.token = the JWT associated with this driver user
//props.active = whether or not the socket is active and sending/receiving data from server
//props.onOrderReceived = the function called when a new order is received
//props.onOrderRejected = the function called when a received order times out or is manually rejected
//props.onNoLocation = the function called when the browser doesn't allow the user to access location
//props.frequencySeconds = how often in seconds location should be reported
export default function OrderTracker(props){

    const [active, setActive] = useState(props.active)
    const [timerId, setTimerId] = useState()
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()

    const wsAddress = process.env.REACT_APP_WS_URL + '/driver/locationWebsocket?access_token=' + props.token

    const {sendJsonMessage, readyState} = useWebSocket(wsAddress, {
        onMessage: (event) => {
            var data = event.data
            alert(data)
            switch(data.code){
                case 200:
                    //success
                    break
                case 201:
                    //A new order has been received
                    props.onOrderReceived()
                    break
                case 202:
                    //An order still needs to be accepted
                    break
                case 203:
                    //pending order was rejected
                    props.onOrderRejected()
                    break
                case 204:
                    //pending order was accepted
                    break
                case 205:
                    //order was picked up
                    break
                case 206:
                    //order was delivered
                    break
                default:
                    //something is wrong
                    break
            }
        },
        onOpen: () => {
            
        },
        onClose: () => {
            alert("CLOSING")
        }
    })

    const deactivate = () => {
        setActive(false)
        if(timerId){
            clearInterval(timerId)
        }
    }

    const activate = () => {
        setActive(true)
        setTimerId(setInterval(() => {
            if(active){
                getLocation()
                sendJsonMessage({latitude: latitude, longitude: longitude})
            }
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
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)
            }, (error) => {
                //failure - skip this attempt and hope the next one works

            })
        }else{
            //handle no navigation enabled by browser
            deactivate()
            props.onNoLocation()
        }
    }

    //just render empty div
    return(<div></div>)
}