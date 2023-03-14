import React, {
    useState,
    useEffect
} from 'react'
import {
    Container
} from './../Components/StaticComponents'

//props.token = the JWT used to identify the user whose profile is being rendered
export default function CustomerProfile(props){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState()

    useEffect(()=>{
        const token = props.token
        if (!token){
            return
        }
        fetch(process.env.REACT_APP_API + '/restaurant/profile', {
            method: "GET",
            headers: {
                "content-type": "application/json",
                access_token: token
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

    }, [])

    return(
        <Container>
            {
            loading
                ? <div>Loading Component</div>
                : error
                    ? <div>Error Component</div>
                    :<div 
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr, 1fr',
                            columnGap: '200px',
                            alignItems: 'center',
                            justifyItems: 'center'
                        }}
                    > 
                        <div style={{gridColumnStart: '1'}}>
                            <p id="email">{data.email}</p>
                            <p>{data.phone}</p>
                            <p>{data.name}</p>
                        </div>
                        <div style={{gridColumnStart: '2'}}>
                            <p>{data.street}</p>
                            <p>{data.city}</p>
                            <p>{data.state}</p>
                            <p>{data.zipCode}</p>
                        </div>
                    </div>
            }
        </Container>
    )
}