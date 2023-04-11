import React, {
    useEffect,
    useState
} from 'react'
import { 
    loadStripe 
} from "@stripe/stripe-js";
import { 
    Elements
} from "@stripe/react-stripe-js"

//props.token = token of the user doing the checkout
//props.amountCents = the amount being paid in cents
//props.paymentMethodId = the payment method chosen

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

export default function Checkout(props){

    const [clientSecret, setClientSecret] = useState()

    const createPaymentIntent = () => {
        fetch(process.env.REACT_APP_API + '/create_payment_intent', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                access_token: props.token
            },
            body: JSON.stringify({
                amountCents: props.amountCents,
                paymentMethodId: props.paymentMethodId
            })
        }).then(
            (response) => response.json()
        ).then(
            (data) => {
                switch(data.code){
                    case 200:
                        setClientSecret(data.data.client_secret)
                        break
                    default:
                        break
                }
            }
        ).catch(
            (error) => {
                alert(error)
            }
        )
    }

    useEffect(createPaymentIntent, [])

    return(
        <div>
            {clientSecret
                ? <Elements 
                    options={{
                        clientSecret: clientSecret, 
                        appearance: {theme: 'stripe'}}} 
                        stripe={stripePromise}
                >
                    {
                        loadingIntent || 
                        <CheckoutForm
                            clientSecret={clientSecret}
                        />
                    }
                </Elements>
                : <p>LOADING</p>
            }
         </div>
    )
}