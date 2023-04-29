import React from 'react'
import {
    useStripe, 
    useElements, 
    PaymentElement
} from '@stripe/react-stripe-js';
import {
    Button
} from './../StaticComponents'
import '../ButtonStyle.css'

//props.returnUrl = the URL that will be navigated to after form submission
//props.onError = a function that passes the error as a parameter
export default function PaymentSetupForm(props){

    const stripe = useStripe()
    const elements = useElements()

    return(
        <form
            onSubmit={async (event) => {
                event.preventDefault()
                if (!stripe || !elements){
                    return null
                }
                const {error} = await stripe.confirmSetup({
                    elements,
                    confirmParams: {
                        return_url: props.returnUrl
                    }
                })
                if (error){
                    props.onError(error)
                }
            }}
        >
            <PaymentElement/>
            <div class="styledBtnContainer">
                <Button variant="contained" size="medium">Submit</Button>
            </div>
        </form>
    )
}