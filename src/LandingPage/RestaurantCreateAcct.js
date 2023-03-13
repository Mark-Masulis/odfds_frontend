import React, {
    useState
} from 'react'
import {
    useNavigate
} from 'react-router-dom'
import "./Login.css"
  
export default function RestauranCreateAcct(props){
    return(
        <div
        style={{
            margin: "0 auto",
            width: "80%",
            padding: "25px"
        }}>
            <h2>Create an Account - Restaurant</h2>
            <section style={{padding: "10px",width: "100%"}}>
                <label for="name"style={{display: "block"}}>
                    Restaurant Name
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
                    <label for="email" style={{display: "block"}}>
                        Email
                    </label>
                    <input style={{width: "95%"}}
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
                        type="tel"
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
                    <input id="password-in" 
                        style={{width:"95%"}}
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
                    <input id="confirmPass-in" 
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
                <div style={{width: "60%"}}>
                    <label for="Address" style={{display: "block"}}>
                        Address
                    </label>
                    <input style={{width:"95%"}}
                        id="address" 
                        type="text"
                        //disabled={loading}
                        onChange={(event) => {
                            //set address
                        }}
                        //value={address}
                    />
                </div>
                <div style={{width:"30%"}}>
                    <label for="City" style={{display: "block"}}>
                        City
                    </label>
                    <input style={{width:"95%"}}
                        id="city" 
                        type="text"
                        //disabled={loading}
                        onChange={(event) => {
                            //set city
                        }}
                        //value={city}
                    />
                </div>
                <div style={{width:"10%"}}>
                    <label for="state" style={{display: "block"}}>
                        State
                    </label>
                    <input style={{width:"90%"}}
                        id="state" 
                        type="text"
                        //disabled={loading}
                        onChange={(event) => {
                            //set state
                        }}
                        //value={state}
                    />
                </div>
                <div style={{width:"20%"}}>
                    <label for="zipcode" style={{display: "block"}}>
                        Zip code
                    </label>
                    <input
                        id="zipcode" 
                        type="text"
                        //disabled={loading}
                        onChange={(event) => {
                            //set zipcode
                        }}
                        //value={zipcode}
                    />
                </div>
            </section>
            <button
                style={{
                    margin: "10px auto",
                    display: "flex"
                }}
                //disabled={loading}
                //onClick={makeLoginRequest}
            >
                Create Account
            </button>
        </div>)
    }