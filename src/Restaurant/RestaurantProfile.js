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

import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import "../Components/ButtonStyle.css"

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
        }}> 
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
    <div class="styledBtnContainer">
        <Button variant="contained" size="medium" onClick={()=>{props.onButtonClick()}}>Edit Profile</Button>
    </div>
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
        <h2 style={{margin: '0 auto'}}>Update Profile</h2>
        <div> 
            <TextField id="email" label="Email" value={email} variant="outlined" fullWidth margin="normal"
                onChange={(event)=>{
                    setEmail(event.target.value)
                    setDataChanged(true)
                }}
                onBlur={()=>{
                    setEmailValid(validateEmail(email))
                }}/>
            <TextField id="phone" label="Phone Number" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxlength="12" value={phone} variant="outlined" fullWidth margin="normal"
                onChange={(event)=>{
                    setPhone(event.target.value)
                    setDataChanged(true)
                }}
                onBlur={()=>{
                    setPhoneValid(validatePhoneNumber(phone))
                }}/>
            <TextField id="name" label="Restaurant Name" value={name} variant="outlined" fullWidth margin="normal"
                onChange={(event)=>{
                    setName(event.target.value)
                    setDataChanged(true)
                }}
                onBlur={()=>{
                    setNameValid(name.trim().length > 0)
                }}/>
            <TextField id="street" label="Street Address" value={street} variant="outlined" fullWidth margin="normal"
                onChange={(event)=>{
                    setStreet(event.target.value)
                    setDataChanged(true)
                }}/>
            <TextField id="city" label="City" value={city} variant="outlined" margin="normal"
                onChange={(event)=>{
                    setCity(event.target.value)
                    setDataChanged(true)
                }}
                onBlur={()=>{
                    setCityValid(city.trim().length > 0)
                }}/>
            <label for="state" style={{display:"block"}}>State</label>
            <StateSelector 
                id="state" 
                style={{margin: "10px", display: "block"}}
                onChange={(value)=>{
                    setState(value)
                    setDataChanged(true)
                }}
                value={state}/>
            <TextField id="zip" label="Zip Code" value={zip} variant="outlined" margin="normal"
                onChange={(event)=>{
                    setZip(event.target.value)
                    setDataChanged(true)
                }}
                onBlur={()=>{
                    setZipValid(validateZipCode(zip))
                }}/>
        </div>
        
        {dataChanged && 
        <div class="styledBtnContainer">
            <Button variant="contained" size="medium" disabled={loading || !emailValid || !phoneValid || !nameValid || !cityValid || !zipValid}
                onClick={()=>{
                    if(dataChanged){
                        updateRestaurantProfile() //make API call to update DB
                    }
                }}>Confirm</Button>
        </div>}
        <div class="styledBtnContainer">
            <Button variant="contained" size="medium" disabled={loading} 
                onClick={()=>{
                    props.onButtonClick()
                }}>Cancel</Button>
        </div>
    </div>
    )
}