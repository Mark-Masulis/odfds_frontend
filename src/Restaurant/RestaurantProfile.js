import React, {
    useState,
    useEffect
} from 'react'
import {
    Alert,
    Modal
} from '@mui/material'
import {
    Container
} from './../Components/StaticComponents'
import StateSelector from './../Components/StateSelector'
import {
    validatePhoneNumber,
    validateEmail,
    validateZipCode
} from './../Utils/validation'

//props.token = the JWT used to identify the user whose profile is being rendered
export default function CustomerProfile(props){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState()
    const [editting, setEditting] = useState(false)

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
    <div 
        style={{
            display: 'grid',
            gridTemplateColumns: '1fr, 1fr',
            columnGap: '200px',
            alignItems: 'center',
            justifyItems: 'center'
        }}
    > 
        <div style={{gridColumnStart: '1'}}>
            <p id="email">{data.email}</p>
            <p id="phone">{data.phone}</p>
            <p id="name">{data.name}</p>
        </div>
        <div style={{gridColumnStart: '2'}}>
            <div style={{width: "400px", height:"400px", border: "5px solid black"}}>
                <h2>PLACEHOLDER FOR MAP</h2>
                <p>{data.street}</p>
                <p>{data.city}</p>
                <p>{data.state}</p>
                <p>{data.zipCode}</p>
            </div>
        </div>
    </div>
    <button 
            style={{
                margin: '20px auto',
                display: 'block'
            }} 
            onClick={()=>{
                props.onButtonClick()
            }}
        >Edit Profile</button>
    </div>
    )
}

function EditPanel(props){

    const [email, setEmail] = useState(props.data.email)
    const [emailValid, setEmailValid] = useState(true) //show error if email format is bad
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

    const getDigitsFromPhoneNumber = (input) => {
        return input.replace(/\D/g, "")
    }

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
                    case 200: //good things are happening :)
                        setLoading(false)
                        props.onUpdateSuccess() //return to view page and reload data
                        break;
                    default: //bad things are happening :(
                        alert(data.data.message)
                        props.onButtonClick()
                        break; //TODO: make error message appear describing error to user

                }
            }
        ).catch(error => {
            alert(error)
        })
    }

    return (
    <div style={{margin: '20px'}}>
        {emailValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a valid email</Alert>}
        {phoneValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a valid phone number</Alert>}
        {nameValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a valid restaurant name</Alert>}
        {cityValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a valid city name</Alert>}
        {zipValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a valid zip code</Alert>}
        <div 
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr, 1fr',
                columnGap: '75px',
                alignItems: 'center',
                justifyItems: 'center'
            }}
        > 
            <div style={{gridColumnStart: '1'}}>
                <label for="email">Email</label>
                <input
                    id="email" 
                    type="text"
                    onChange={(event)=>{
                        setEmail(event.target.value)
                        setDataChanged(true)
                    }}
                    onBlur={()=>{
                        setEmailValid(validateEmail(email))
                    }}
                    value={email}
                />
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
            </div>
            <div style={{gridColumnStart: '2'}}>
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
        {dataChanged && <button 
            style={{
                margin: '20px auto',
                display: 'block'
            }} 
            onClick={()=>{
                if(dataChanged){
                    //make API call to update DB
                    updateRestaurantProfile()
                }
            }}
            disabled={loading || !emailValid || !phoneValid || !nameValid || !cityValid || !zipValid}
        >
            Confirm
        </button>}
        <button 
            style={{
                margin: '20px auto',
                display: 'block'
            }} 
            onClick={()=>{
                props.onButtonClick()
            }}
            disabled={loading}
        >
            Cancel
        </button>
    </div>
    )
}