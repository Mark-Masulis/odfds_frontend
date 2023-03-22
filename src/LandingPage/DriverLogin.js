import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import "./Login.css"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { validateEmail } from '../Utils/validation'

export default function DriverLogin(props){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const makeLoginRequest = () => {
      if (!validateEmail(email) || password == ""){
          alert("Email or password is invalid.")
      } else{
          setLoading(true)
          fetch(process.env.REACT_APP_API + '/driver/token', 
          {
              method: "POST",
              headers: {
                  "content-type": "application/json"
              },
              body: JSON.stringify({
                  email: email,
                  password: password
              })
          }).then(
              (response) => response.json()
          ).then(
              (data) => {
                  switch(data.code){
                      case 200:
                          const token = data.data
                          navigate(`/driver/home?token=${token}`)
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
      <div style={{margin: "0 auto", width: "50%", padding: "25px"}}>
        <h2>Driver Sign-in</h2>
        <TextField id="emailIn" label="Email" variant="outlined" fullWidth margin="normal" value={email} disabled={loading}
            onChange={(event) => {
                setEmail(event.target.value)
            }} />
        <TextField id="passIn" label="Password" type="password" variant="outlined" fullWidth margin="normal" value={password} disabled={loading}
            onChange={(event) => {
                setPassword(event.target.value)
            }} />
        <section style={{padding: "10px"}}>
            <a href="/signup">Create an account</a>
            <br/>
            <a href="/login/driver/reset"> Forgot your password?</a>
        </section>
        <div class="container">
            <Button id="loginBtn" variant="contained" size="medium" disabled={loading} onClick={makeLoginRequest}>Login</Button>
        </div>
      </div>
      )
}