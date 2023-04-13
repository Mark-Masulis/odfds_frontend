import React, {
    useEffect,
    useState
} from 'react'
import { 
    loadStripe 
} from "@stripe/stripe-js";
import { 
    Elements
} from "@stripe/react-stripe-js";
import PaymentSetupForm from './PaymentSetupForm'
import { 
    Alert
} from '@mui/material';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

//props.returnPath = the path to automatically navigate to upon successful payment method creation
//props.token = the JWT for the user
export default function PaymentSetup(props){
    const [clientSecret, setClientSecret] = useState()
    const [intentId, setIntentId] = useState()
    const [loadingIntent, setLoadingIntent] = useState(true)
    const [error, setError] = useState()

    const getSetupIntent = () => {
        fetch(`${process.env.REACT_APP_API}/payment/create_setup_intent`,{
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                access_token: props.token
            }
        }).then(
            (response) => response.json()
        ).then(
            (data) => {
                switch(data.code){
                    case 200:
                        setClientSecret(data.data.client_secret)
                        setIntentId(data.data.id)
                        setLoadingIntent(false)
                        break
                    default:
                        break
                }
            }
        )
    }

    useEffect(getSetupIntent, [])
    return(
        <div>
        {error && <Alert severity="error" style={{margin: "10px"}}>{error.message}</Alert>}
        {clientSecret 
            ? <Elements 
                options={{
                    clientSecret: clientSecret, 
                    appearance: {theme: 'stripe'}}} 
                    stripe={stripePromise}
            >
                {
                    loadingIntent || 
                    <PaymentSetupForm
                    returnUrl={`${window.location.protocol}//${window.location.hostname + (window.location.port ? ":" + window.location.port : "")}${props.returnPath}&paymentSet=${intentId}`}
                        onError={(error) => {
                            setError(error)
                        }}
                    />
                }
            </Elements>
            : <p>LOADING</p>}
        </div>
    )
}