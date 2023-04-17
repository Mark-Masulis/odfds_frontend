import React, {
    useEffect,
    useState
} from 'react'
import PaymentMethodItem from './PaymentMethodItem'
import {Button} from './../StaticComponents'

//props.token = token of the user doing the checkout
//props.order = the order object being paid
//props.onConfirm = the function called when the checkout is confirmed. Passes the payment intent as a parameter

export default function Checkout(props){

    const [intent, setIntent] = useState()
    const [loading, setLoading] = useState(true)
    const [paymentMethods, setPaymentMethods] = useState()
    const [selectedMethod, setSelectedMethod] = useState()

    const createPaymentIntent = async () => {
        setLoading(true)
        return await fetch(process.env.REACT_APP_API + '/payment/payment_intent', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                access_token: props.token
            },
            body: JSON.stringify({
                orderId: props.order.id,
                paymentMethodId: selectedMethod.id
            })
        }).then(
            (response) => response.json()
        ).then(
            (data) => {
                setLoading(false)
                switch(data.code){
                    case 200:
                        setIntent(data.data)
                        break
                    default:
                        alert(JSON.stringify(data))
                        break
                }
            }
        ).catch(
            (error) => {
                alert(error)
            }
        )
    }

    const getPaymentMethods = () => {
        setLoading(true)
        fetch(process.env.REACT_APP_API + '/payment/methods', {
            method: 'POST',
            headers: {
                access_token: props.token
            }
        }).then(
            (response) => response.json()
        ).then(
            (data) => {
                setLoading(false)
                switch(data.code){
                    case 200:
                        setPaymentMethods(data.data.data) //these names are dumb as fuck but i'm not going to do anything about it
                        break;
                    default:
                        break;
                }
            }
        ).catch(
            (error) => {
                alert(error)
            }
        )
    }

    useEffect(getPaymentMethods, [])

    return(
        <div>
            <h3>Delivery Cost: ${(props.amountCents/100.0).toFixed(2)}</h3>
            <p>You will be charged when the delivery request is completed.</p>
            {loading
                ? <p>LOADING</p>
                : paymentMethods.map(item => 
                    <PaymentMethodItem
                        paymentMethod={item}
                        disabled={loading}
                        onClick={(paymentMethod) => {
                            setSelectedMethod(paymentMethod)
                        }}
                    />)
            }
            {selectedMethod &&
                <div>
                    <h4>Paying With: </h4>
                    {(()=>{
                        switch(selectedMethod.type){
                            case 'card':
                                return (
                                    <table style={{borderSpacing: '10px'}}>
                                        <tr>
                                            <td><h3>{selectedMethod.card.brand}</h3></td>
                                            <td><p>****-****-****-{selectedMethod.card.last4}</p></td>
                                            <td><p>Expires: {selectedMethod.card.exp_month}/{selectedMethod.card.exp_year}</p></td>
                                        </tr>
                                    </table>
                                )
                            case 'us_bank_account':
                                return (
                                    <table style={{borderSpacing: '10px'}}>
                                        <tr>
                                            <td><h3>{selectedMethod.us_bank_account.bank_name}</h3></td>
                                            <td><p>{selectedMethod.us_bank_account.account_type} account</p></td>
                                            <td><p>********{selectedMethod.us_bank_account.last4}</p></td>
                                        </tr>
                                    </table>
                                )
                        }
                    })()}
                    <Button
                        onClick={() => {
                            alert(JSON.stringify(selectedMethod))
                            createPaymentIntent().then(
                                () => {
                                    props.onConfirm(intent)
                                }
                            )
                        }}
                    >
                        Confirm Order
                    </Button>
                </div>
            }
        </div>
    )
}