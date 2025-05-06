import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="text-center">
                        Copyright © {currentYear} {process.env.REACT_APP_NAME}
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
