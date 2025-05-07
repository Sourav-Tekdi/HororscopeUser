import React, { useEffect } from 'react'
import Header from './includes/Header.js'
import Footer from './includes/Footer.js'
import CheckoutComponent from './screenComponent/CheckoutComponent.js'

const Checkout = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [])
    return (
        <>

            <div className="as_main_wrapper">
                <Header />
                <CheckoutComponent title={title} />
                <Footer />
            </div>
        </>
    )
}

export default Checkout
