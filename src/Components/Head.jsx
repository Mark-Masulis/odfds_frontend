import React from 'react'

const Head = () => {
    return (
        <>
            <section className='head'>
                <div className='container flexSB'>
                    <div className='logo'>
                        <h1> 
                        ON DEMAND FOOD <img src="logoHeader.png" alt="ODFDS" /> DELIVERY
                        </h1>
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
