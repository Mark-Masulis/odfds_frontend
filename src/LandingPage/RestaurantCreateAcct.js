import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {
    getDigitsFromPhoneNumber,
    validatePhoneNumber,
    validateZipCode,
    validateEmail
} from './../Utils/validation'
import {Alert} from '@mui/material'
import "./Login.css"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import StateSelector from '../Components/StateSelector'

export default function RestauranCreateAcct(props){
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [name, setName] = useState("")
    const [phoneNum, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [emailCode, setEmailCode] = useState("")
    const [loading, setLoading] = useState(false)

    const [phoneValid, setPhoneValid] = useState(true) 
    const [nameValid, setNameValid] = useState(true)
    const [cityValid, setCityValid] = useState(true)
    const [zipValid, setZipValid] = useState(true) 

    const sendEmailCode = () => {
        if(email === ""){
            alert("Please enter an email")
        } else if(!validateEmail(email)){
            alert("Invalid email ")
        } else {
            setLoading(true)
            fetch(process.env.REACT_APP_API + '/restaurant/emailCode?' + (new URLSearchParams({"email": email})).toString()
            ).then(
                (response) => response.json()
            ).then(
                (data) => {
                    switch(data.code){
                        case 200:
                            alert(data.data)
                            break;
                        default:
                            alert(data.data.message)
                            break;
                    }
                    setLoading(false)
                }
            )
        }
    }
    
    const restaurantCreateAcctRequest = () => {
        if (password === "" || confirmPass === "" || name === "" || phoneNum === "" || address === "" || city === "" || zipcode === ""){
            alert("Missing a field")
        } else if(!validateEmail(email)){
            alert("Invalid email")
        } else if (password != confirmPass){
            alert("Passwords must match")
        } else {
            setLoading(true)
            fetch(process.env.REACT_APP_API + '/restaurant/', 
            {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    code: emailCode,
                    password :password,
                    phone: phoneNum,
                    street: address,
                    city: city,
                    state: state,
                    zipCode: zipcode
                })
            }).then(
                (response) => response.json()
            ).then(
                (data) => {
                    switch(data.code){
                        case 200:
                            alert(data.data)
                            //route to login page
                            //navigate(`/login/restaurant`)
                            break;
                        default:
                            alert(data.data.message)
                            break; 
                    }
                    setLoading(false)
                }
            )
        }
    }

    return(
        <div style={{margin: "0 auto",width: "80%",padding: "25px"}}>

            <div style={{margin: '20px'}}>
                {phoneValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a valid phone number</Alert>}
                {nameValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a valid restaurant name</Alert>}
                {cityValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a valid city name</Alert>}
                {zipValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a valid zip code</Alert>}
            </div>
            
            <h2>Create an Account - Restaurant</h2>
            <TextField id="nameIn" label="Restaurant Name" variant="outlined" fullWidth margin="normal" value={name} disabled={loading}
                onChange={(event) => {
                    setName(event.target.value)
                }}
                onBlur={()=>{
                    setNameValid(name.trim().length > 0)
                }}/>
            <TextField id="emailIn" label="Email" variant="outlined" fullWidth margin="normal" value={email} disabled={loading}
                onChange={(event) => {
                    setEmail(event.target.value)
                }}/>
            <div class="container">
                <Button id="sendCodeBtn" variant="contained" size="medium" disabled={loading} onClick={sendEmailCode}>Send Code</Button>
            </div>
            <TextField id="codeIn" label="Email Code" variant="outlined" fullWidth margin="normal" value={emailCode} disabled={loading} 
                onChange={(event) => {
                    setEmailCode(event.target.value)
                }}/>
            <TextField id="phoneIn" label="Phone Number" type="tel" variant="outlined" fullWidth margin="normal" value={phoneNum} disabled={loading}
                onChange={(event) => {
                    setPhone(event.target.value)
                }}
                onBlur={()=>{
                    setPhoneValid(validatePhoneNumber(phoneNum))
                }}/>
                
            <TextField id="passwordIn" label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} disabled={loading}
                onChange={(event) => {
                    setPassword(event.target.value)
                }}/>
            <TextField id="confrimPassIn" label="Confirm Password" type="password" variant="outlined" fullWidth margin="normal" value={confirmPass} disabled={loading}
                onChange={(event) => {
                    setConfirmPass(event.target.value)
                }}/>

            <TextField id="addressIn" label="Address" variant="outlined" fullWidth margin="normal" value={address} disabled={loading}
                onChange={(event) => {
                    setAddress(event.target.value)
                }}/>
            <TextField id="cityIn" label="City" variant="outlined" fullWidth margin="normal" value={city} disabled={loading}
                onChange={(event) => {
                    setCity(event.target.value)
                }}
                onBlur={()=>{
                    setCityValid(city.trim().length > 0)
                }}/>
            
            <label for="stateSelect" style={{display: "block"}}>State</label>
            <StateSelector id="stateSelect" value={state} onChange={(value)=>{setState(value)}}></StateSelector>
            
            <TextField id="zipCodeIn" label="Zipcode" type="number" variant="outlined" fullWidth margin="normal" value={zipcode} disabled={loading}
                onChange={(event) => {
                    setZipcode(event.target.value)
                }}
                onBlur={()=>{
                    setZipValid(validateZipCode(zipcode))
                }}/>
            <div class="container">
                <Button id="createAcctBtn" variant="contained" size="medium" disabled={loading} onClick={restaurantCreateAcctRequest}>Create Account</Button>
            </div>
        </div>
        )
    }