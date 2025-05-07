import React, { useEffect } from 'react'
import Header from './includes/Header'
import Footer from './includes/Footer'
import AboutusComponent from './screenComponent/AboutusComponent.js'
import Breadcrum from '../components/Breadcrum.js'

const Aboutus = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [])
    return (
        <>

            <div className="as_main_wrapper">
                <Header />
                <Breadcrum title={title} url='/'/>
                <AboutusComponent title={title}/>
                <Footer />
            </div>
        </>
    )
}

export default Aboutus
