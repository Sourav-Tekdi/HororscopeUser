import React, { useEffect } from 'react'
import Header from './includes/Header'
import Footer from './includes/Footer'
import HoroscopeComponent from './screenComponent/HoroscopeComponent'
import { useParams } from 'react-router-dom'

const Horoscope = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [])

    const { sign } = useParams();

    return (
        <>

            <div className="as_main_wrapper">
                <Header />
                <HoroscopeComponent title={title} sign={sign} />
                <Footer />
            </div>
        </>
    )
}

export default Horoscope
