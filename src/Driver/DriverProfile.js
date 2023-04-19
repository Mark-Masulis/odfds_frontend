import React, {
    useState,
    useEffect
} from 'react'
import {
    Alert
} from '@mui/material'
import {
    Container,
    Button
} from './../Components/StaticComponents'
import {
    validatePhoneNumber,
    getDigitsFromPhoneNumber
} from './../Utils/validation'

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
        fetch(process.env.REACT_APP_API + '/driver/profile', {
            method: "GET",
            headers: {
                "content-type": "application/json",
                token: token
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
    const [showBankInfo, setShowBankInfo] = useState(false)

    const data = props.data
    return (
    <div>
        <section style={{margin: "10px"}}>
            <label for="email"><h3>Email</h3></label>
            <p id="email">{data.email}</p>
        </section>
        <section style={{margin: "10px"}}>
            <label for="phone"><h3>Phone Number</h3></label>
            <p id="phone">{data.phone}</p>
        </section>
        <section style={{margin: "10px"}}>
            <label for="name"><h3>Name</h3></label>
            <p id="name">{`${data.lastName}, ${data.firstName} ${data.middleName || ''}`}</p>
        </section>
        <section style={{margin: "10px"}}>
            <label for="photo"><h3>Driver's License</h3></label>
            <img id="photo" src={data.driverLicenseImage} style={{maxWidth: '400px', maxHeight: '400px', width: 'auto', height: 'auto'}}/>
        </section>
        <section style={{margin: "10px"}}>
            <label for="dlnum"><h3>License Number</h3></label>
            <p id="dlnum">{data.driverLicenseNumber}</p>
        </section>
        <section style={{margin: "10px"}}>
            <label for="status"><h3>Account Status</h3></label>
            <p id="status">{data.verification}</p>
        </section>
        {showBankInfo || 
            <a 
                href=""
                onClick={(event)=>{
                    event.preventDefault()
                    setShowBankInfo(true)
                }}
                style={{color: "blue", ':visited': {color: 'blue'}}}
            >
                Show bank information
            </a>
        }
        {showBankInfo && 
            <div>
                <section style={{margin: "10px"}}>
                    <label for="bankaccnum"><h3>Bank Account Number</h3></label>
                    <p id="bankaccnum">{data.bankAccountNumber}</p>
                </section>
                <section style={{margin: "10px"}}>
                    <label for="bankrtnum"><h3>Bank Routing Number</h3></label>
                    <p id="bankrtnum">{data.bankRoutingNumber}</p>
                </section>
                <a 
                href=""
                onClick={(event)=>{
                    event.preventDefault()
                    setShowBankInfo(false)
                }}
                style={{color: "blue", ':visited': {color: 'blue'}}}
                >
                    Hide bank information
                </a>
            </div>
        }
    <Button 
            style={{
                margin: '20px auto',
                display: 'block'
            }} 
            onClick={()=>{
                props.onButtonClick()
            }}
        >Edit Profile</Button>
    </div>
    )
}

function EditPanel(props){

    //const [email, setEmail] = useState(props.data.email)
    //const [emailValid, setEmailValid] = useState(true) //show error if email format is bad
    const [phone, setPhone] = useState(props.data.phone)
    const [phoneValid, setPhoneValid] = useState(true) //show error if phone format is bad
    const [image, setImage] = useState()
    const [dlNumber, setDlNumber] = useState(props.data.driverLicenseNumber)
    const [dlNumValid, setDlNumValid] = useState(true) //show error if dl number is empty
    const [bankAccNumber, setBankAccNumber] = useState(props.data.bankAccountNumber)
    const [bankAccNumberValid, setBankAccNumberValid] = useState(true) //show error if bank account is blank
    const [bankRtNumber, setBankRtNumber] = useState(props.data.bankRoutingNumber)
    const [bankRtNumberValid, setBankRtNumberValid] = useState(true)

    const [editBankInfo, setEditBankInfo] = useState(false)
    const [dataChanged, setDataChanged] = useState(false) //only make API call if data is changed
    const [loading, setLoading] = useState(false)
    const [confirmDisabled, setConfirmDisabled] = useState(false)

    //determine if editted data can be submitted
    useEffect(() => {
        setConfirmDisabled(loading || !phoneValid || !dlNumValid || !bankAccNumberValid || !bankRtNumberValid)
    }, [loading, phoneValid, dlNumValid, bankAccNumberValid, bankRtNumberValid])

    const uploadImage = async () => {
        var file = document.getElementById('licensepic').files[0]
        if (!file) {
            return
        }
        var data = new FormData()
        data.append("image", file)
        return await fetch(process.env.REACT_APP_API + "/common/upload/image",{ //return promise
            method: "POST",
            body:data
        }).then(
            response => response.json()
        ).then(
            (data) => {
                switch(data.code){
                    case 200:
                        return data.data //hooks are too slow, so must return directly
                    default:
                        alert(data.data.message)
                        return null
                }
            }
        )
    }

    const updateDriverProfile = ()=>{
        setLoading(true)
        uploadImage().then(
            (url) => {
                var body = {
                    phone: getDigitsFromPhoneNumber(phone),
                    driverLicenseNumber: dlNumber,
                    bankAccountNumber: bankAccNumber,
                    bankRoutingNumber: bankRtNumber
                }
                if(url){
                    body.driverLicenseImage = url
                }
                fetch(process.env.REACT_APP_API + '/driver/profile', {
                    method: 'PATCH',
                    headers: {
                        "content-type": "application/json",
                        access_token: props.token
                    },
                    body: JSON.stringify(body)
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
                                break;
        
                        }
                    }
                ).catch(error => {
                    alert(error)
                })
            }
        )
    }

    return (
    <div style={{margin: '20px'}}>
        {phoneValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a valid phone number</Alert>}
        {dlNumValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a Driver's License Number</Alert>}
        {bankAccNumberValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a Bank Account Number</Alert>}
        {bankRtNumberValid || <Alert severity="error" style={{margin: "10px"}}>Please enter a Bank Account Routing Number</Alert>}
        <div>
            <label for="phone">Phone Number</label>
            <input
                id="phone" 
                type="tel"
                pattern="[0-9]{3} [0-9]{3} [0-9]{4}" 
                maxlength="12"
                onChange={(event)=>{
                    setPhone(event.target.value)
                    setDataChanged(true)
                }}
                onBlur={()=>{
                    setPhoneValid(validatePhoneNumber(phone))
                }}
                value={phone}
            />
            <label for="licensepic" style={{display: "block"}} >
                Update Driver's License
            </label>
            <input 
                type="file" 
                id="licensepic" 
                name="img" 
                accept="image/*"
                style={{border: "none", background: "none"}}
                onChange={(event) =>{
                    setImage(event.target.value)
                    setDataChanged(true)
                }}
                Upload Image
            />
            <label for="licensenum" style={{display: "block"}} >
                License Number
            </label>
            <input
                id="licensenum" 
                type="text"
                onChange={(event)=>{
                    setDlNumber(event.target.value)
                    setDataChanged(true)
                }}
                onBlur={()=>{
                    setDlNumValid(dlNumber.length > 0)
                }}
                value={dlNumber}
            />
            {editBankInfo || 
                <a 
                    href=""
                    onClick={(event)=>{
                        event.preventDefault()
                        setEditBankInfo(true)
                    }}
                    style={{color: "blue", ':visited': {color: 'blue'}}}
                >
                    Edit bank information
                </a>
            }
            {editBankInfo && 
                <div>
                    <label for="bankaccnum" style={{display: "block"}}>Bank Account Number</label>
                    <input
                        id="bankaccnum" 
                        type="text"
                        onChange={(event)=>{
                            setBankAccNumber(event.target.value)
                            setDataChanged(true)
                        }}
                        onBlur={()=>{
                            setBankAccNumberValid(bankAccNumber.length > 0)
                        }}
                        value={bankAccNumber}
                    />
                    <label for="bankrtnum" style={{display: "block"}}>Bank Routing Number</label>
                    <input
                        id="bankrtnum" 
                        type="text"
                        onChange={(event)=>{
                            setBankRtNumber(event.target.value)
                            setDataChanged(true)
                        }}
                        onBlur={()=>{
                            setBankRtNumberValid(bankRtNumber.length > 0)
                        }}
                        value={bankRtNumber}
                    />
                    <a 
                    href=""
                    onClick={(event)=>{
                        event.preventDefault()
                        setEditBankInfo(false)
                    }}
                    style={{color: "blue", ':visited': {color: 'blue'}}}
                    >
                        Hide bank information
                    </a>
                </div>
            }
        </div>
        {dataChanged && <Button 
            style={{
                margin: '20px auto',
                display: 'block',
                backgroundColor: confirmDisabled ? 'gray' : null
            }} 
            onClick={()=>{
                if(dataChanged){
                    //make API call to update DB
                    updateDriverProfile()
                }
            }}
            disabled={confirmDisabled}
        >
            Confirm
        </Button>}
        <Button 
            style={{
                margin: '20px auto',
                display: 'block',
                color: loading ? 'gray' : null
            }} 
            onClick={()=>{
                props.onButtonClick()
            }}
            disabled={loading}
        >
            Cancel
        </Button>
    </div>
    )
}