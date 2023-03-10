import React from 'react'

const Head = () => {
    return (
        <>
            <section className='head'>
                <div className='container flexSB'>
                    <div className='logo'>
                        <h1>
                            <img src="icons8-transportation-delivery-logistics-cargo-parcel-bus-service-27-64.png" alt="ODFDS" />
                        </h1>
                        <span>ON DEMAND FOOD DELIVERY</span>
                    </div>

                    <div className='social'>
                        <i className='fab fa-facebook-f icon'></i>
                        <i className='fab fa-instagram icon'></i>
                        <i className='fab fa-twitter icon'></i>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Head
