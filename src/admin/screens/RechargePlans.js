import React, { useEffect } from 'react'
import Header from './includes/Header.js'
import Footer from './includes/Footer.js'
import RechargePlansComponent from './screenComponent/RechargePlansComponent.js'

const RechargePlans = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [])
    return (
        <>

            <div className="as_main_wrapper">
                <Header />
                <RechargePlansComponent title={title} />
                <Footer />
            </div>
        </>
    )
}

export default RechargePlans
