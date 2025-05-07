import React, { useEffect } from 'react'
import Header from './includes/Header'
import Footer from './includes/Footer'
import ShopSingleComponent from './screenComponent/ShopSingleComponent'

const ShopSingle = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [])
    return (
        <>

            <div className="as_main_wrapper">
                <Header />
                <ShopSingleComponent title={title} />
                <Footer />
            </div>
        </>
    )
}

export default ShopSingle
