import React, {
    useState
} from 'react'
import {
    useNavigate
} from 'react-router-dom'
import "./Login.css"
export default function RestauranCreateAcct(props){
    const navigate = useNavigate()
    const states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT",
                    "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [name, setName] = useState("")
    const [phoneNum, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [loading, setLoading] = useState(false)

    const validEmail = (text) =>{
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        return emailRegex.test(text)
    }
    
    const makeCreateAcctRequest = () => {
        if (password == "" || confirmPass == "" || name == "" || phoneNum == "" || address == "" || city == "" || state == "" || zipcode == ""){
            alert("Missing a field")
        } else if(!validEmail(email)){
            alert("Invalid email is invalid")
        } else if (password != confirmPass){
            alert("Passwords must match")
        } else if (!states.includes(state)){
            alert("Invalid state")
        } else {
            setLoading(true)
            fetch(process.env.REACT_APP_API + '/restaurant/token', 
            {
                //get restaurant/emailCode
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    
                })
            }).then(
                (response) => response.json()
            ).then(
                (data) => {
                    switch(data.code){
                        case 200: //good things are happening :)
                            const token = data.data
                            //navigate(`/verify`)
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
                    disabled={loading}
                    onChange={(event) => {
                        setName(event.target.value)
                    }}
                    value={name}
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
                        disabled={loading}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                        value={email}
                    />
                </div>
                <div style={{width:"100%"}}>
                    <label for="phoneNum" style={{display: "block"}}>
                        Phone Number
                    </label>
                    <input
                        id="phone-in" 
                        type="tel"
                        disabled={loading}
                        onChange={(event) => {
                            setPhone(event.target.value)
                        }}
                        value={phoneNum}
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
                        disabled={loading}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                        value={password}
                    />
                </div>
                <div style={{width:"100%"}}>
                    <label for="confirmPass" style={{display: "block"}}>
                        Confirm Password
                    </label>
                    <input id="confirmPass-in" 
                        type="password"
                        disabled={loading}
                        onChange={(event) => {
                            setConfirmPass(event.target.value)
                        }}
                        value={confirmPass}
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
                        disabled={loading}
                        onChange={(event) => {
                            setAddress(event.target.value)
                        }}
                        value={address}
                    />
                </div>
                <div style={{width:"30%"}}>
                    <label for="City" style={{display: "block"}}>
                        City
                    </label>
                    <input style={{width:"95%"}}
                        id="city" 
                        type="text"
                        disabled={loading}
                        onChange={(event) => {
                            setCity(event.target.value)
                        }}
                        value={city}
                    />
                </div>
                <div style={{width:"10%"}}>
                    <label for="state" style={{display: "block"}}>
                        State
                    </label>
                    <input style={{width:"90%"}}
                        id="state" 
                        type="text"
                        disabled={loading}
                        onChange={(event) => {
                            setState(event.target.value)
                        }}
                        value={state}
                    />
                </div>
                <div style={{width:"20%"}}>
                    <label for="zipcode" style={{display: "block"}}>
                        Zip code
                    </label>
                    <input
                        id="zipcode" 
                        type="text"
                        disabled={loading}
                        onChange={(event) => {
                            setZipcode(event.target.value)
                        }}
                        value={zipcode}
                    />
                </div>
            </section>
            <button
                style={{
                    margin: "10px auto",
                    display: "flex"
                }}
                onClick={makeCreateAcctRequest}
            >
                Create Account
            </button>
        </div>)
    }