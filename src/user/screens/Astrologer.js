import React, { useEffect } from 'react'
import Header from './includes/Header.js'
import Footer from './includes/Footer.js'
import AstrologerComponent from './screenComponent/AstrologerComponent'

const Shop = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [])
    return (
        <>

            <div className="as_main_wrapper">
                <Header />
                <AstrologerComponent title={title} />
                <Footer />
            </div>
        </>
    )
}

export default Shop
