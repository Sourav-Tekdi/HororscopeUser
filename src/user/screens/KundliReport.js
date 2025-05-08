import React, { useEffect } from 'react'
import Header from './includes/Header.js'
import Footer from './includes/Footer.js'
import FreeKundliComponent from './screenComponent/FreeKundliComponent.js'
import KundliReportComponent from './screenComponent/KundliReportComponent.js'

const KundliReport = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [])
    return (
        <>

            <div className="as_main_wrapper">
                <Header />
                <KundliReportComponent title={title} />
                <Footer />
            </div>
        </>
    )
}

export default KundliReport
