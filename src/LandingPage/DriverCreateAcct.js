import React, {
    useState
  } from 'react'
  import {
    useNavigate
  } from 'react-router-dom'
  import "./Login.css"
  
  export default function DriverLogin(props){
    return(
        <div
        style={{
            margin: "0 auto",
            width: "80%",
            padding: "25px"
        }}
        >
            <h2>Create an Account - Driver</h2>
            <section style={{padding: "10px"}}>
                <label 
                    for="name"
                    style={{display: "block"}}>
                    Name
                </label>
                <input
                    id="name-in" 
                    type="text"
                    //disabled={loading}
                    onChange={(event) => {
                        //set name
                    }}
                    //value={name}
                />
            </section>
            <section style={{padding: "10px", display: "flex", justifyContent:"start"}}>
                <div style={{width:"100%"}}>
                    <label for="email" style={{display: "block"}}>Email</label>
                    <input style={{width:"95%"}}
                        id="email-in" 
                        type="text"
                        //disabled={loading}
                        onChange={(event) => {
                            //set email
                        }}
                        //value={email}
                    />
                </div>
                <div style={{width:"100%"}}>
                    <label for="phoneNum" style={{display: "block"}}>
                        Phone Number
                    </label>
                    <input
                        id="phone-in" 
                        type="text"
                        //disabled={loading}
                        onChange={(event) => {
                            //set phone Number
                        }}
                        //value={phoneNum}
                    />
                </div>
            </section>

            <section style={{padding: "10px", display: "flex", justifyContent:"start"}}>
                <div style={{width:"100%"}}>
                    <label for="password" style={{display: "block"}}>
                        Password
                    </label>
                    <input style={{width:"95%"}}
                        id="password" 
                        type="password"
                        //disabled={loading}
                        onChange={(event) => {
                            //set password
                        }}
                        //value={password}
                    />
                </div>
                <div style={{width:"100%"}}>
                    <label for="confirmPass" style={{display: "block"}}>
                        Confirm Password
                    </label>
                    <input
                        id="confirmPass" 
                        type="password"
                        //disabled={loading}
                        onChange={(event) => {
                            //set confrimPass
                        }}
                        //value={password}
                    />
                </div>
            </section>

            <section style={{padding: "10px", display: "flex", justifyContent:"start"}}>
                <div style={{width: "100%"}}>
                    <label for="licenseNum" style={{display: "block"}} >
                        Driver's License Number
                    </label>
                    <input style={{width: "95%"}}
                        id="licenseNum" 
                        type="text"
                        //disabled={loading}
                        onChange={(event) => {
                            //set licenseNum
                        }}
                        //value={licenseNum}
                    />
                </div>
                <div style={{width:"100%"}}>
                    <label for="licenseNum" style={{display: "block"}} >
                        Driver's License Image
                    </label>
                    <input type="file" id="img-in" name="img" accept="image/*"
                        Upload Image
                    />
                </div>
            </section>
            <section style={{padding: "10px", display: "flex", justifyContent:"start"}}>
                <div style={{width: "100%"}}>
                    <label for="acctNum" style={{display: "block"}}>
                        Bank Account Number
                    </label>
                    <input style={{width: "95%"}}
                        id="acctNum" 
                        type="number"
                        //disabled={loading}
                        onChange={(event) => {
                            //set acctNum
                        }}
                        //value={acctNum}
                    />
                </div>
                <div style={{width: "100%"}}>
                    <label for="routingNum" style={{display: "block"}}>
                        Bank Account Routing Number
                    </label>
                    <input
                        id="routingNum" 
                        type="number"
                        //disabled={loading}
                        onChange={(event) => {
                            //set routingNum
                        }}
                        //value={routingNum}
                    />
                </div>
            </section>
            <button
                style={{
                    margin: "0 auto",
                    display: "flex"
                }}
                //disabled={loading}
                //onClick={makeLoginRequest}
            >
                Create Account
            </button>
        </div>
        )
}