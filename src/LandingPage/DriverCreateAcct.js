import { getValue } from '@testing-library/user-event/dist/utils'
import React, {
    useState
  } from 'react'
  import {
    useNavigate
  } from 'react-router-dom'
  import "./Login.css"

  export default function DriverLogin(props){
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [name, setName] = useState("")
    const [phoneNum, setPhone] = useState("")
    const [licenseNum, setLiscenseNum] = useState("")
    const [acctNum, setAcctNum] = useState("")
    const [routingNum, setRoutingNum] = useState("")
    const [emailCode, setEmailCode] = useState("")
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)
    
    const validEmail = (text) =>{
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        return emailRegex.test(text)
    }

    const validName = (name) =>{
        var nameSplit = name.split(" ")
        return nameSplit.length == 3 || nameSplit.length == 2
    }

    const sendEmailCode = () => {
        if(!validEmail(email)){
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
                            const token = data.data
                            alert(token)
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

    async function uploadImage(){
        var file = document.getElementById('img-in').files[0]
        if (!file) {
            alert('please select a file');
            return;
        }
        var data = new FormData()
        data.append("image", file)
        let res = await fetch(process.env.REACT_APP_API + "/common/upload/image",{
            method: "POST",
            body:data
        })
        if(res.status == 200){
            let json = await res.json()
            json.then(state => state).then(result =>{
                return result.data
            })
        }
        throw new Error(res.status)
    }

    async function driverCreateAcctRequest() {
        setLoading(true)
        
        var file = document.getElementById('img-in').files[0]
        if (!file) {
            alert('please select a file');
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
                return;
            }
            url = resp.data
        }).catch(err => {
            alert(err);
            return;
        });
        setLoading(false)

        if (email === "" || password === "" || confirmPass === "" || name === "" || phoneNum === "" || licenseNum === "" || acctNum === "" || routingNum === ""){
            alert("Missing field")
        } else if(!validEmail(email)){
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
            console.log(routingNum)
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
                    middleName: middleName,
                    bankAccountNumber: acctNum,
                    bankRoutingNumber: routingNum
                })
            }).then(
                (response) => response.json()
            ).then(
                (data) => {
                    switch(data.code){
                        case 200:
                            alert(data.data)
                            //route to sign in page
                            //navigate(`/login/driver`)
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
                    disabled={loading}
                    onChange={(event) => {
                        setName(event.target.value)
                    }}
                    value={name}
                />
            </section>
            <section style={{padding: "10px", display: "flex", justifyContent:"start"}}>
                <div style={{width:"50%"}}>
                    <label for="email" style={{display: "block"}}>
                        Email
                    </label>
                    <input style={{width:"95%"}}
                        id="email-in" 
                        type="text"
                        disabled={loading}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                        value={email}
                    />
                </div>
                <div style={{width: "20%"}}>
                    <button class="code-btn" onClick={sendEmailCode}>Send Code</button>
                </div>
                <div style={{width:"30%"}}>
                    <label for="code" style={{display: "block"}}>
                        Email Code
                    </label>
                    <input
                        id="code-in" 
                        type="text"
                        disabled={loading}
                        onChange={(event) => {
                            setEmailCode(event.target.value)
                        }}
                        value={emailCode}
                    />
                </div>
            </section>
            <section style={{padding: "10px", display: "flex", justifyContent:"start"}}>
                <div style={{width:"50%"}}>
                    <label for="phoneNum" style={{display: "block"}}>
                        Phone Number
                    </label>
                    <input style={{width:"95%"}}
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
                <div style={{width: "100%"}}>
                    <label for="licenseNum" style={{display: "block"}} >
                        Driver's License Number
                    </label>
                    <input style={{width: "95%"}}
                        id="licenseNum" 
                        type="text"
                        disabled={loading}
                        onChange={(event) => {
                            setLiscenseNum(event.target.value)
                        }}
                        value={licenseNum}
                    />
                </div>
                <div style={{width:"100%"}}>
                    <label for="licenseNum" style={{display: "block"}} >
                        Driver's License Image
                    </label>
                    <input type="file" id="img-in" name="img" accept="image/*"
                        onChange={(event) =>{
                            setImage(event.target.value)
                        }}
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
                        disabled={loading}
                        onChange={(event) => {
                            setAcctNum(event.target.value)
                        }}
                        value={acctNum}
                    />
                </div>
                <div style={{width: "100%"}}>
                    <label for="routingNum" style={{display: "block"}}>
                        Bank Account Routing Number
                    </label>
                    <input
                        id="routingNum" 
                        type="number"
                        disabled={loading}
                        onChange={(event) => {
                            setRoutingNum(event.target.value)
                        }}
                        value={routingNum}
                    />
                </div>
            </section>
            <button
                style={{
                    margin: "0 auto",
                    display: "flex"
                }}
                disabled={loading}
                onClick={driverCreateAcctRequest}
            >
                Create Account
            </button>
        </div>
        )
}