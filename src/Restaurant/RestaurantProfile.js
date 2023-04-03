import React, {
    useState,
    useEffect
} from 'react'
import {
    useSearchParams,
} from "react-router-dom";
import {
    Alert
} from '@mui/material'
import {
    Container,
    Button
} from './../Components/StaticComponents'
import StateSelector from './../Components/StateSelector'
import {
    getDigitsFromPhoneNumber,
    validatePhoneNumber,
    validateZipCode
} from './../Utils/validation'
import PaymentSetup from '../Components/Payment/PaymentSetup'
import "../Components/ButtonStyle.css"
import PaymentMethodItem from '../Components/Payment/PaymentMethodItem'

//props.token = the JWT used to identify the user whose profile is being rendered
export default function CustomerProfile(props){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState()
    const [editting, setEditting] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const getProfileData = () => {
        const token = props.token
        if (!token){
            setError(true)
            return
        }
        fetch(process.env.REACT_APP_API + '/restaurant/profile', {
            method: "GET",
            headers: {
                "content-type": "application/json",
                access_token: token
            }
        }).then(
            (response) => response.json()
        ).then(
            (data) => {
                setLoading(false)
                setData(data.data)
                switch(data.code){
                    case 200: //good things are happening :)
                        break;
                    default: //bad things are happening :(
                        setError(true)
                        break
                }
            }
        )
    }

    useEffect(getProfileData, [])
    
    useEffect(() => {
        if (searchParams.has("paymentSet")){
            var intentId = searchParams.get("paymentSet")
        }
    }, [])

    return(
        <Container>
            {
            loading
                ? <div>Loading Component</div>
                : error
                    ? <div>Error Component</div>
                    : editting
                            ? <EditPanel 
                                data={data}
                                onButtonClick={()=>{setEditting(false)}}
                                onUpdateSuccess={()=>{
                                    setEditting(false)
                                    getProfileData()
                                }}
                                token={props.token}
                            />
                            : <ViewPanel 
                                data={data}
                                onButtonClick={()=>{setEditting(true)}}
                            />
            }
        </Container>
    )
}

function ViewPanel(props){
    const data = props.data
    return (
    <div>
        <section style={{margin: "10px"}}>
            <label for="email"><h3>Email</h3></label>
            <p id="email">{data.email}</p>
        </section>
        <section style={{margin: "10px"}}>
            <label for="phone"><h3>Phone Number</h3></label>
            <p id="phone">{data.phone}</p>
        </section>
        <section style={{margin: "10px"}}>
            <label for="name"><h3>Restaurant Name</h3></label>
            <p id="name">{data.name}</p>
        </section>
        <section style={{margin: "10px"}}>
            <label for="map"><h3>Restaurant Location</h3></label>
            <div id="map" style={{width: "400px", height:"400px", border: "5px solid black" /*remove this border when map is added*/}}>
                <h2>PLACEHOLDER FOR MAP</h2>
                <p>{data.street}</p>
                <p>{data.city}</p>
                <p>{data.state}</p>
                <p>{data.zipCode}</p>
            </div>
        </section>
    <Button 
            style={{
                margin: '20px auto',
                display: 'block'
            }} 
            onClick={()=>{
                props.onButtonClick()
            }}
        >Edit Profile</Button>
    </div>
    )
}

function EditPanel(props){
    const [phone, setPhone] = useState(props.data.phone)
    const [phoneValid, setPhoneValid] = useState(true) //show error if phone format is bad
    const [name, setName] = useState(props.data.name)
    const [nameValid, setNameValid] = useState(true) //show error if name is empty
    const [street, setStreet] = useState(props.data.street)
    const [city, setCity] = useState(props.data.city)
    const [cityValid, setCityValid] = useState(true) //show error if city is empty
    const [state, setState] = useState(props.data.state)
    const [zip, setZip] = useState(props.data.zipCode)
    const [zipValid, setZipValid] = useState(true) //show error if zip format is bad

    const [dataChanged, setDataChanged] = useState(false) //only make API call if data is changed
    const [loading, setLoading] = useState(false)
    const [confirmDisabled, setConfirmDisabled] = useState(false)

    const [viewPayment, setViewPayment] = useState(false) //when true, shows existing payment methods and the add new payment button
    const [paymentMethods, setPaymentMethods] = useState()
    const [loadingMethods, setLoadingMethods] = useState(false)
    const [addPaymentInformation, setAddPaymentInformation] = useState(false)
    const [loadingDeletion, setLoadingDeletion] = useState(false)

    //determine if editted data can be submitted
    useEffect(() => {
        setConfirmDisabled(loading || !phoneValid || !nameValid || !cityValid || !zipValid)
    }, [loading, phoneValid, nameValid, cityValid, zipValid])

    const updateRestaurantProfile = ()=>{
        setLoading(true)
        fetch(process.env.REACT_APP_API + '/restaurant/profile', {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                access_token: props.token
            },
            body: JSON.stringify({
                phone: getDigitsFromPhoneNumber(phone),
                name: name,
                street: street,
                city: city,
                state: state,
                zipCode: zip
            })
        }).then(
            response => response.json()
        ).then(
            (data) => {
                switch(data.code){
                    case 200:
                        setLoading(false)
                        props.onUpdateSuccess() //return to view page and reload data
                        break
                    default:
                        alert(data.data.message)
                        props.onButtonClick()
                        break

                }
            }
        ).catch(error => {
            alert(error)
        })
    }

    const getPaymentMethods = () => {
        setLoadingMethods(true)
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
                        setPaymentMethods(data.data.data) //these names are dumb as fuck but i'm not going to do anything about it
                        break;
                    default:
                        break;
                }
                setLoadingMethods(false)
            }
        ).catch(
            (error) => {
                alert(error)
            }
        )
    }

    const deletePaymentMethod = async (paymentMethodId) => {
        setLoadingDeletion(true)
        await fetch(`${process.env.REACT_APP_API}/payment/methods?methodId=${paymentMethodId}`, {
            method: 'DELETE',
            headers: {
                access_token: props.token
            }
        }).then(
            (response) => response.json()
        ).then(
            (data) => {
                switch(data.code){
                    case 200:
                        break;
                    default:
                        alert("Failed to delete payment method. Please try again later.")
                        break;
                }
                setLoadingDeletion(false)
            }
        ).catch(
            (error) => {
                alert(error)
            }
        )
    }

    return (
    <div style={{margin: '20px'}}>
        {phoneValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a valid phone number</Alert>}
        {nameValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a valid restaurant name</Alert>}
        {cityValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a valid city name</Alert>}
        {zipValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a valid zip code</Alert>}
        <div>
            <label for="phone">Phone Number</label>
            <input
                id="phone" 
                type="tel"
                pattern="[0-9]{3} [0-9]{3} [0-9]{4}" 
                maxlength="12"
                onChange={(event)=>{
                    setPhone(event.target.value)
                    setDataChanged(true)
                }}
                onBlur={()=>{
                    setPhoneValid(validatePhoneNumber(phone))
                }}
                value={phone}
            />
            <label for="name">Restaurant Name</label>
            <input
                id="name" 
                type="text"
                onChange={(event)=>{
                    setName(event.target.value)
                    setDataChanged(true)
                }}
                onBlur={()=>{
                    setNameValid(name.trim().length > 0)
                }}
                value={name}
            />
            <label for="street">Street Address</label>
            <input
                id="street" 
                type="text"
                onChange={(event)=>{
                    setStreet(event.target.value)
                    setDataChanged(true)
                }}
                value={street}
            />
            <div style={{display: "table"}}>
                <div style={{display: "table-cell", paddingLeft: '10px'}}>
                    <label for="state">State</label>
                    <StateSelector 
                        id="state" 
                        style={{margin: "10px", display: "block"}}
                        onChange={(value)=>{
                            setState(value)
                            setDataChanged(true)
                        }}
                        value={state}
                    />
                </div>
                <div style={{display: "table-cell", paddingLeft: '10px'}}>
                    <label for="city">City</label>
                    <input
                        id="city" 
                        type="text"
                        onChange={(event)=>{
                            setCity(event.target.value)
                            setDataChanged(true)
                        }}
                        onBlur={()=>{
                            setCityValid(city.trim().length > 0)
                        }}
                        value={city}
                />
                </div>
                <div style={{display: "table-cell", paddingLeft: '10px'}}>
                    <label for="zip">Zip Code</label>
                    <input
                        id="zip" 
                        type="text"
                        onChange={(event)=>{
                            setZip(event.target.value)
                            setDataChanged(true)
                        }}
                        onBlur={()=>{
                            setZipValid(validateZipCode(zip))
                        }}
                        value={zip}
                    />
                </div>
            </div>
            <div style={{margin: '0 auto'}}>
                {viewPayment || 
                    <a 
                        href=""
                        onClick={(event)=>{
                            event.preventDefault()
                            setViewPayment(true)
                            if(!paymentMethods){
                                getPaymentMethods()
                            }
                        }}
                        style={{color: "blue", ':visited': {color: 'blue'}}}
                    >
                        Edit Payment Information
                    </a>
                }
            </div>
            {viewPayment && 
                <div>
                    {loadingMethods
                        ? <p>LOADING</p>
                        : paymentMethods.map(item => 
                            <PaymentMethodItem
                                paymentMethod={item}
                                hasButton={true}
                                buttonText="Delete"
                                disabled={loadingDeletion}
                                onButtonClick={(paymentMethod) => {
                                    deletePaymentMethod(paymentMethod.id).then(
                                        props.onButtonClick()
                                    )
                                }}
                            />)
                    }
                    <Button
                    style={{
                        margin: '20px auto',
                        display: 'block',
                        color: loading ? 'gray' : null
                    }} 
                        onClick={() => {
                            setAddPaymentInformation(true)
                        }}
                    >
                        Add New Payment Method
                    </Button>
                    <a 
                        href=""
                        onClick={(event)=>{
                            event.preventDefault()
                            setViewPayment(false)
                        }}
                        style={{color: "blue", ':visited': {color: 'blue'}}}
                    >
                        Hide Payment Information
                    </a>
                    {addPaymentInformation &&
                        <PaymentSetup
                            returnPath={`/restaurant/profile?token=${props.token}`} //refresh same page on completion
                            token={props.token}
                        />
                    }
                </div>
            }
        </div>
        {dataChanged && <Button 
            style={{
                margin: '20px auto',
                display: 'block',
                backgroundColor: confirmDisabled ? 'gray' : null
            }} 
            onClick={()=>{
                if(dataChanged){
                    //make API call to update DB
                    updateRestaurantProfile()
                }
            }}
            disabled={confirmDisabled}
        >
            Confirm
        </Button>}
        <Button 
            style={{
                margin: '20px auto',
                display: 'block',
                color: loading ? 'gray' : null
            }} 
            onClick={()=>{
                props.onButtonClick()
            }}
            disabled={loading}
        >
            Cancel
        </Button>
    </div>
    )
}