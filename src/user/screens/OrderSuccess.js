import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = ({title}) => {
    useEffect(() => {
        document.title = title;
      }, [title]);
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
        padding: 0,
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(to right, #8fd3f4, #84fab0)' // Soothing gradient for success
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

    const successWrapperStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    const successIconStyle = {
        fontSize: '100px',
        color: '#28a745', // Green for success
        margin: 0,
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
    };

    const successMessageStyle = {
        fontSize: '24px',
        color: '#333',
        margin: '46px 0',
        fontWeight: '500'
    };

    const successDescriptionStyle = {
        fontSize: '16px',
        color: '#666',
        marginBottom: '20px'
    };

    const homeButtonStyle = {
        textDecoration: 'none',
        color: '#fff',
        backgroundColor: '#28a745', // Green button for success
        padding: '12px 25px',
        borderRadius: '5px',
        fontSize: '16px',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        display: 'inline-block'
    };

    const homeButtonHoverStyle = {
        backgroundColor: '#218838', // Darker shade on hover
        transform: 'scale(1.05)'
    };

    const homeButtonActiveStyle = {
        transform: 'scale(0.95)'
    };

    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <div style={successWrapperStyle}>
                    <div style={successIconStyle}>✓</div> {/* Checkmark icon */}
                    <p style={successMessageStyle}>Order Placed Successfully!</p>
                </div>
                <p style={successDescriptionStyle}>
                    Thank you for your purchase. Your order has been placed successfully and is being processed.
                </p>
                <Link 
                    to="/products" 
                    style={homeButtonStyle}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = homeButtonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = homeButtonStyle.backgroundColor}
                    onMouseDown={(e) => e.currentTarget.style.transform = homeButtonActiveStyle.transform}
                    onMouseUp={(e) => e.currentTarget.style.transform = homeButtonStyle.transform}
                >
                    Back to Shop
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
