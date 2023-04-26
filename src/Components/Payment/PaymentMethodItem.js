import React, {useState} from 'react'

//props.paymentMethod is the paymentMethod object returned from the Stripe api that will be represented here.
//props.hasButton is whether or not there should be a button
//props.buttonText is the text that appears on the button
//props.onButtonClick is the function that is called when the button (if it exists) is clicked. It passes the paymentMethod object as a parameter
//props.onClick is the function that is called when the item itself is clicked. It passes the paymentMethod object as a parameter
//props.disabled determines if both buttons are disabled or not
//props.selected determines if this button should be highlighted
export default function PaymentMethodItem(props){
    const [bgColor, setBgColor] = useState('transparent')
    const pm = props.paymentMethod
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: 'none',
                backgroundColor: bgColor,
                padding: '10px',
                margin: '5px',
                borderRadius: '5px'
            }}
            onMouseOver={()=>{
                setBgColor('lightgray')
            }}
            onMouseOut={()=>{
                setBgColor('transparent')
            }}
        >
            <button
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                    border: 'none'
                }}
                disabled={props.disabled}
                onClick={() => {props.onClick(pm)}}
            >
                {(() => {
                    switch(props.paymentMethod.type){
                        case "card":
                            return <CardBody paymentMethod={pm}/>
                        case "us_bank_account":
                            return <BankBody paymentMethod={pm}/>
                    }
                })()}
            </button>
            {props.hasButton && 
                <button
                    disabled={props.disabled}
                    style={{marginLeft: 'auto'}}
                    onClick={() => {props.onButtonClick(pm)}}
                >
                    {props.buttonText}
                </button>
            }
        </div>
    )
}

function CardBody(props){
    const pm = props.paymentMethod
    return (
        <table style={{borderSpacing: '10px'}}>
            <tr>
                <td><h3>{pm.card.brand}</h3></td>
                <td><p>****-****-****-{pm.card.last4}</p></td>
                <td><p>Expires: {pm.card.exp_month}/{pm.card.exp_year}</p></td>
            </tr>
        </table>
    )
}

function BankBody(props){
    const pm = props.paymentMethod
    return(
        <table style={{borderSpacing: '10px'}}>
            <tr>
                <td><h3>{pm.us_bank_account.bank_name}</h3></td>
                <td><p>{pm.us_bank_account.account_type} account</p></td>
                <td><p>********{pm.us_bank_account.last4}</p></td>
            </tr>
        </table>
    )
}