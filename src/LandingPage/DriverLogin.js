import React, {
  useState
} from 'react'
import {
  useNavigate
} from 'react-router-dom'
import "./Login.css"

export default function DriverLogin(props){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false) //used to disable inputs while waiting for fetch request
  const navigate = useNavigate()

  const checkEmail = (text) =>{
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
      return emailRegex.test(text)
  }

  const makeLoginRequest = () => {
      if (!checkEmail(email) || password == ""){
          alert("Email or password is invalid.")
      }else{
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
                      case 200: //good things are happening :)
                          const token = data.data
                          navigate(`/driver/home?token=${token}`)
                          break;
                      default: //bad things are happening :(
                          alert(data.data.message)
                          break; //TODO: make error message appear describing error to user

                  }
                  setLoading(false)
              }
          )
      }
  }

  return(
      <div
      style={{
          margin: "0 auto",
          width: "50%",
          padding: "25px"
      }}
      >
          <h2>Driver Sign-in</h2>
          <section
              style={{
                  padding: "10px"
              }}
          >
              <label 
                  for="email"
                  style={{
                      display: "block"
                  }}
              >
                  Email
              </label>
              <input
                  id="email" 
                  type="text"
                  disabled={loading}
                  onChange={(event) => {
                      setEmail(event.target.value)
                  }}
                  value={email}
              />
          </section>
          <section
              style={{
                  padding: "10px"
              }}
          >
              <label 
                  for="password"
                  style={{
                      display: "block"
                  }}
              >
                  Password
              </label>
              <input
                  id="password" 
                  type="password"
                  disabled={loading}
                  onChange={(event) => {
                      setPassword(event.target.value)
                  }}
                  value={password}
              />
          </section>
          <section
              style={{
                  padding: "10px"
              }}
          >
              <a href="/signup">
                  Create an account
              </a>
              <br/>
              <a href="/login/driver/reset">
                  Forgot your password?
              </a>
          </section>
          <button
              style={{
                  margin: "0 auto",
                  display: "flex"
              }}
              disabled={loading}
              onClick={makeLoginRequest}
          >
              Log In
          </button>
      </div>
      )
}