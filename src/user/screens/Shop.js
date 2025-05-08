import React, { useEffect } from 'react'
import Header from './includes/Header'
import Footer from './includes/Footer'
import ShopComponent from './screenComponent/ShopComponent.js'

const Shop = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [])
    return (
        <>

            <div className="as_main_wrapper">
                <Header />
                <ShopComponent title={title} />
                <Footer />
            </div>
        </>
    )
}

export default Shop
