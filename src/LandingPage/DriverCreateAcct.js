import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {
    validatePhoneNumber,
    validateEmail
} from './../Utils/validation'
import {Alert} from '@mui/material'
import "./Login.css"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function DriverLogin(props){
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [name, setName] = useState("")
    const [phoneNum, setPhone] = useState("")
    const [licenseNum, setLiscenseNum] = useState("")
    const [emailCode, setEmailCode] = useState("")
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)
    
    const [phoneValid, setPhoneValid] = useState(true) 
    const [nameValid, setNameValid] = useState(true)
    const [cityValid, setCityValid] = useState(true)
    const [zipValid, setZipValid] = useState(true) 

    const validName = (name) =>{
        var nameSplit = name.split(" ")
        return nameSplit.length == 3 || nameSplit.length == 2
    }

    function Alert() {
        const handleClick = () => {
          // Navigate to the new page here
          window.location.href = '/new-page';
        };
      
        return (
          <div>
            <p>Click OK to continue to the new page.</p>
            <button onClick={handleClick}>OK</button>
          </div>
        );
      }

    const sendEmailCode = () => {
        if(!validateEmail(email)){
            alert("Invalid email ")
        } else {
            setLoading(true)
            fetch(process.env.REACT_APP_API + '/driver/emailCode?' + (new URLSearchParams({"email": email})).toString()
            ).then(
                (response) => response.json()
            ).then(
                (data) => {
                    switch(data.code){
                        case 200:
                            alert(data.data)
                            break
                        default:
                            alert(data.data.message)
                            break
                    }
                    setLoading(false)
                }
            )
        }
    }

    async function driverCreateAcctRequest() {
        setLoading(true)
        var file = document.getElementById('upload-image').files[0]
        if (!file) {
            alert('please select a file');
            setLoading(false)
            return;
        }
        var data = new FormData()
        data.append("image", file)
        var url = ""
        
        await fetch(process.env.REACT_APP_API + "/common/upload/image",{
            method: "POST",
            body:data
        }).then(res => res.json()).then(resp => {
            if (resp.code != 200) {
                alert(resp.data.message);
                setLoading(false)
                return;
            }
            url = resp.data
        }).catch(err => {
            alert(err);
            setLoading(false)
            return;
        });
        setLoading(false)

        if (email === "" || password === "" || confirmPass === "" || name === "" || phoneNum === "" || licenseNum === ""){
            alert("Missing field")
        } else if(!validateEmail(email)){
            alert("Invalid Email") }
        else if(!validName(name)){
            alert("Invalid Name")
        } else {
            const nameSplit = name.split(" ")
            const firstName = nameSplit[0]
            var middleName = null
            var lastName = nameSplit[1]
            if(nameSplit.length > 2){
                middleName = nameSplit[1]
                lastName = nameSplit[2]
            }
            setLoading(true)
            fetch(process.env.REACT_APP_API + '/driver/', 
            {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email:email,
                    code:emailCode,
                    password:password,
                    phone: phoneNum,
                    driverLicenseNumber: licenseNum,
                    driverLicenseImage: url,
                    firstName: firstName,
                    lastName: lastName,
                    middleName: middleName
                })
            }).then(
                (response) => response.json()
            ).then(
                (data) => {
                    switch(data.code){
                        case 200:
                            alert(data.data)
                            //route to sign in page
                            navigate(`/login/driver`)
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
                {nameValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a valid name</Alert>}
                {cityValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a valid city name</Alert>}
                {zipValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a valid zip code</Alert>}
            </div>

            <h2>Create an Account - Driver</h2>
            <TextField id="nameIn" label="Name" variant="outlined" fullWidth margin="normal" value={name} disabled={loading}
                onChange={(event) => {
                    setName(event.target.value)
                }}
                onBlur={()=>{
                    setNameValid(name.trim().length > 0)
                }}/>
            <div width="60px">
            <TextField id="emailIn" label="Email" variant="outlined" fullWidth margin="normal" value={email} disabled={loading}
                onChange={(event) => {
                    setEmail(event.target.value)
                }}/>
            </div>
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
            <TextField id="licenseNumIn" label="Driver's License Number" variant="outlined" fullWidth margin="normal" value={licenseNum} disabled={loading}
                onChange={(event) => {
                    setLiscenseNum(event.target.value)
                }}/>
            <label for="licenseNum" style={{display: "block"}} >
                Driver's License Image
            </label>
            <div>
                <label htmlFor="upload-image">
                    <input
                    style={{ display: 'none' }}
                    accept="image/*"
                    id="upload-image"
                    type="file"
                    onChange={(event) =>{
                        setImage(event.target.value)
                    }}
                    />
                <Button id="uploadBtn" size="medium" variant="contained" component="span" disabled={loading}>Upload Image<CloudUploadIcon/></Button>
                </label>
            </div>
            <div class="container">
                <Button id="createAcctBtn" variant="contained" size="medium" disabled={loading} onClick={driverCreateAcctRequest}>Create Account</Button>
            </div>
        </div>
        )
}