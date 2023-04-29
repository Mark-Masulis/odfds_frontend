import React from 'react'

export default function About(props){
    return(
        <div
            style={{display: 'flex', justifyContent: 'center'}}
        >
            <div
                style={{width: '50%'}}
            >
                <h1>About Us</h1>
                <p
                    style={{margin: '0 auto', padding: '20px'}}
                >On Demand Food Delivery Service allows any restaurant to provide delivery service to their customers without needing to pay full time delivery drivers. Whether you own a family restaurant, just opened for business, or are a franchisee, we can make sure your customers can eat your food no matter where they are.</p>
                <p
                    style={{margin: '0 auto', padding: '20px'}}
                >If you want to start earning money now, consider signing up as a driver for ODFDS! You get paid after each delivery you complete, and our website makes signing up and starting your first delivery simple.</p>
            </div>
        </div>
    )
}