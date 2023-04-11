import React, { useEffect, useState } from "react"
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js"


//props.clientSecret = the key for the payment intent being used for this checkout
export default function CheckoutForm(props){

    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false)

    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        if (!stripe) {
          return
        }
    
        if (!props.clientSecret) {
          return
        }
    
        stripe.retrievePaymentIntent(props.clientSecret).then(({ paymentIntent }) => {
          switch (paymentIntent.status) {
            case "succeeded":
              setMessage("Payment succeeded!")
              break
            case "processing":
              setMessage("Your payment is processing.")
              break
            case "requires_payment_method":
              setMessage("Your payment was not successful, please try again.")
              break
            default:
              setMessage("Something went wrong.")
              break
          }
        })
      }, [stripe])

    const handleSubmit = () => {
        if (!stripe || !elements) {
            return
        }

        setLoading(true)

        stripe.confirmPayment({
        elements,
        confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: "http://localhost:3000",
        },
        }).catch(
            (error) => {
                if (error.type === "card_error" || error.type === "validation_error") {
                    setMessage(error.message)
                } else {
                    setMessage("An unexpected error occurred.")
                }
            }
        )

        setLoading(false)
    }

    return(
        <form 
            onSubmit={(event) => {
                event.preventDefault()
                handleSubmit()
            }}
        >
            <PaymentElement 
                options={{layout: "tabs"}} 
            />
            <button disabled={loading || !stripe || !elements}>
            <span>
                {loading ? "Loading" : "Pay now"}
            </span>
            </button>
            {message && <div>{message}</div>}
      </form>
    )
}