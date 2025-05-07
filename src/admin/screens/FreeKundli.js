import React, { useEffect } from 'react'
import Header from './includes/Header.js'
import Footer from './includes/Footer.js'
import FreeKundliComponent from './screenComponent/FreeKundliComponent'

const FreeKundli = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [])
    return (
        <>

            <div className="as_main_wrapper">
                <Header />
                <FreeKundliComponent title={title} />
                <Footer />
            </div>
        </>
    )
}

export default FreeKundli
