import React, { useEffect } from 'react'
import Header from './includes/Header.js'
import Footer from './includes/Footer.js'
import ContactusComponent from './screenComponent/ContactusComponent'
import Breadcrum from '../components/Breadcrum'

const Contactus = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [])
    return (
        <>

            <div className="as_main_wrapper">
                <Header />
                <Breadcrum title={title} url='/'/>
                <ContactusComponent title={title}/>
                <Footer />
            </div>
        </>
    )
}

export default Contactus
