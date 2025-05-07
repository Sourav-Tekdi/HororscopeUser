import React, { useEffect } from 'react'
import Header from './includes/Header'
import Footer from './includes/Footer'
import DashboardComponent from './screenComponent/DashboardComponent'

const Dashboard = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [])
    return (
        <>

            <div className="as_main_wrapper">
                <Header />
                <DashboardComponent />
                <Footer />
            </div>
        </>
    )
}

export default Dashboard
