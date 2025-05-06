import React from 'react';

const NotFoundPage = () => {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
        padding: 0,
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(to right, #fbc2eb, #a6c0fe)'
    };

    const contentStyle = {
        textAlign: 'center',
        background: '#fff',
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        padding: '40px',
        maxWidth: '90%',
        width: '600px',
        margin: '20px'
    };

    const errorWrapperStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    const errorCodeStyle = {
        fontSize: '120px',
        color: '#ff6b6b', // Soft red
        margin: 0,
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
    };

    const errorMessageStyle = {
        fontSize: '24px',
        color: '#333',
        margin: '10px 0',
        fontWeight: '500'
    };

    const errorDescriptionStyle = {
        fontSize: '16px',
        color: '#666',
        marginBottom: '20px'
    };

    const homeButtonStyle = {
        textDecoration: 'none',
        color: '#fff',
        backgroundColor: '#007bff', // Bootstrap primary color
        padding: '12px 25px',
        borderRadius: '5px',
        fontSize: '16px',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: 'inline-block'
    };

    const homeButtonHoverStyle = {
        backgroundColor: '#0056b3', // Darker shade on hover
        transform: 'scale(1.05)'
    };

    const homeButtonActiveStyle = {
        transform: 'scale(0.95)'
    };

    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <div style={errorWrapperStyle}>
                    <h1 style={errorCodeStyle}>404</h1>
                    <p style={errorMessageStyle}>Page Not Found</p>
                </div>
                <p style={errorDescriptionStyle}>
                    Sorry, the page you are looking for does not exist. It might have been moved or deleted.
                </p>
                <a 
                    href="/" 
                    style={homeButtonStyle}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = homeButtonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = homeButtonStyle.backgroundColor}
                    onMouseDown={(e) => e.currentTarget.style.transform = homeButtonActiveStyle.transform}
                    onMouseUp={(e) => e.currentTarget.style.transform = homeButtonStyle.transform}
                >
                    Back to Home
                </a>
            </div>
        </div>
    );
};

export default NotFoundPage;
