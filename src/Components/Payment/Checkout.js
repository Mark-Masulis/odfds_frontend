import React, {
    useEffect,
    useState
} from 'react'
import PaymentMethodItem from './PaymentMethodItem'
import {Button} from './../StaticComponents'
import '../ButtonStyle.css'

//props.token = token of the user doing the checkout
//props.orderId = the id of the order object being paid
//props.onConfirm = the function called when the checkout is confirmed. Passes the payment intent as a parameter

export default function Checkout(props){
    const [methodsLoading, setMethodsLoading] = useState(true)
    const [orderLoading, setOrderLoading] = useState(true)
    const [paymentMethods, setPaymentMethods] = useState()
    const [selectedMethod, setSelectedMethod] = useState()
    const [order, setOrder] = useState()

    const [disablePayButton, setDisablePayButton] = useState(false);

    const payOrder = async () => {
        setDisablePayButton(true);
        return await fetch(process.env.REACT_APP_API + '/restaurant/order/pay', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                access_token: props.token
            },
            body: JSON.stringify({
                orderId: props.orderId,
                paymentMethodId: selectedMethod.id
            })
        }).then(
            (response) => response.json()
        ).then(
            (data) => {
                alert(JSON.stringify(data))
                switch(data.code){
                    case 200:
                        props.onConfirm(data.data)
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
        ).finally(() => setDisablePayButton(false));
    }

    const getOrder = () => {
        fetch(`${process.env.REACT_APP_API}/restaurant/order?orderId=${props.orderId}`, {
            method: 'GET',
            headers: {
                access_token: props.token
            }
        }).then(
            (result) => result.json()
        ).then(
            (data) => {
                switch(data.code){
                    case 200:
                        setOrder(data.data)
                        setOrderLoading(false)
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

    const getPaymentMethods = () => {
        fetch(process.env.REACT_APP_API + '/payment/methods', {
            method: 'POST',
            headers: {
                access_token: props.token
            }
        }).then(
            (response) => response.json()
        ).then(
            (data) => {
                switch(data.code){
                    case 200:
                        setMethodsLoading(false)
                        setPaymentMethods(data.data.data) //these names are dumb as fuck but i'm not going to do anything about it
                        break;
                    default:
                        break;
                }
            }
        ).catch(
            (error) => {
                alert(error);
            }
        )
    }

    useEffect(() => {
        getPaymentMethods()
        getOrder()
    }, [])

    return(
        orderLoading || <div>
            <h3>Delivery Cost: ${(order.cost * 1.0).toFixed(2)}</h3>
            <p>You will be charged when the delivery request is accepted.</p>
            {methodsLoading
                ? <p>LOADING</p>
                : paymentMethods.length > 0
                    ? <div>
                        <p>Select payment method:</p>
                        {paymentMethods.map(item => 
                            <PaymentMethodItem
                                paymentMethod={item}
                                disabled={methodsLoading}
                                onClick={(paymentMethod) => {
                                    setSelectedMethod(paymentMethod)
                                }}
                            />)}
                        </div>
                    : <p style={{color: 'red'}}>You must add a payment method before making an order.</p>
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
                    {selectedMethod && <div class="styledBtnContainer">
                    <Button variant="contained" size="medium" disabled={disablePayButton} onClick={() => {payOrder()}}>Pay</Button>
                    </div>}
                </div>
            }
        </div>
    )
}