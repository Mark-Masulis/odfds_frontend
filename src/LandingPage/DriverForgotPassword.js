import React, {useState} from 'react'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import "./ForgotPassword.css"

import { validateEmail } from '../Utils/validation'
import { useNavigate } from 'react-router-dom'



export default function DriverForgotPassword(props){
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [loading, setLoading] = useState(false)
    const [hidden, setHidden] = useState(true)
    const [codeSent, emailCodeSent] = useState(false)
    const navigate = useNavigate

    const sendEmailCode = () => {
        if(!validateEmail(email)){
            alert("Invalid Email")
        } else {
            setLoading(true)
            fetch(process.env.REACT_APP_API + '/driver/reset/emailCode?' + (new URLSearchParams({"email": email})).toString()
            ).then(
                (response) => response.json()
            ).then(
                (data) => {
                    switch(data.code){
                        case 200:
                            alert(data.data)
                            emailCodeSent(true)
                            break;
                        default:
                            alert(data.data.message)
                            break;
                    }
                    setHidden(false)
                    setLoading(false)
                }
            )
        }
    }

    const updateRequest = () =>{
        if (email === "" || code === "" || password === "" || confirmPass === ""){
            alert("Missing Field")
        } else if(!validateEmail(email)){
            alert("Invalid Email")
        } else if(password !== confirmPass){
            alert("Passwords must match")
        } else {
            setLoading(true)
            fetch(process.env.REACT_APP_API + "/driver/reset/password",
            {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    code:code
                })
            }).then(
                (response) => response.json()
            ).then(
                (data) => {
                    switch (data.code){
                        case 200: 
                            alert('Successfully Reset')
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
        <div id="hero">
            <h1>Forgot Password - Driver Account</h1>
            <TextField id="emailIn" label="Email" variant="outlined" fullWidth margin="normal" value={email} disabled={loading}
            onChange={(event) => {
                setEmail(event.target.value)
            }} />

            <div class="container">
                <Button id="codeBtn" variant="contained" size="medium" onClick={sendEmailCode} disabled={loading}>Send Code</Button>
            </div>

            {codeSent && <div>
            <TextField id="codeIn" label="Email Code" variant="outlined" fullWidth margin="normal" value={code} disabled={loading} hidden={hidden} color="success"
            onChange={(event) => {
                setCode(event.target.value)
            }} />


            <TextField id="passIn" type="password" label="New Password" variant="outlined" fullWidth margin="normal" value={password} disabled={loading} hidden={hidden}
            onChange={(event) => {
                setPassword(event.target.value)
            }} />

            <TextField id="confrimPassIn" type="password" label="Confirm New Password" variant="outlined" fullWidth margin="normal" value={confirmPass} disabled={loading} hidden={hidden}
            onChange={(event) => {
                setConfirmPass(event.target.value)
            }} />
            <div class="container">
                <Button id="updateBtn" variant="contained" size="medium" onClick={updateRequest} disabled={loading} hidden="false">Update</Button>
            </div>
            </div>
            }
        </div>
    )
}