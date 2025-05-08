import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CartComponent from '../../../components/CartComponent';
import SettingsComponent from '../../../components/SettingsComponent';
import Menu from '../../../components/Menu';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';

const Header = () => {
    const { isAuthenticated } = useAuth();
    const { userInfo } = useProfile();
    const [isSliderOpen, setSliderOpen] = useState(false);
    const location = useLocation(); // Get the current path

    const toggleSlider = () => setSliderOpen(!isSliderOpen);
    const closeSlider = () => setSliderOpen(false);

    // Hide wallet and notification on specific routes
    const shouldHideWalletAndNotification = location.pathname === '/products'; // Add other paths as needed

    return (
        <section className="as_header_wrapper">
            {!isSliderOpen && (
                <div className="header-row">
                    <span className="as_toggle" onClick={toggleSlider}>
                        <img alt="Menu" src="/assets/images/svg/menu.svg" />
                    </span>
                    <a href="/" className="logo-container">
                        <img className="headerLogo" src="/assets/images/astroscop.png" alt="Astroscope Logo" />
                    </a>
                    <Menu isAuthenticated={isAuthenticated} /> {/* Pass isAuthenticated here */}
                    <CartComponent />
                    
                    {!shouldHideWalletAndNotification && (
                        <>
                            <Link to="/recharge-plans" className="as_cart">
                                <div className="as_cart_wrapper">
                                    <img alt="" className='headerSvg' src="/assets/images/svg/wallet.svg" />
                                    <span className="walletAmount">
                                        &nbsp; {userInfo?.wallet_balance ? `₹ ${userInfo?.wallet_balance}` : ''}
                                    </span>
                                </div>
                            </Link>
                            <a href="#" className="as_cart">
                                <div className="as_cart_wrapper">
                                    <span>
                                        <img alt="#" className='headerSvg' src="/assets/images/svg/notification.svg" />
                                        <span className="as_cartnumber">0</span>
                                    </span>
                                </div>
                            </a>
                        </>
                    )}

                    {!isAuthenticated ? (
                        <a href="/login" className="profileLogin">Login</a>
                    ) : (
                        <SettingsComponent />
                    )}
                </div>
            )}

            {/* Slider */}
            {isSliderOpen && (
                <div
                    className={`menu_slider ${isSliderOpen ? 'menu_open' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="as_logo">
                        <a href="/">
                            <img alt="" src="/assets/images/astroscop.png" />
                        </a>
                    </div>
                    <button className="close_btn" onClick={closeSlider}>
                        &times;
                    </button>
                    <Menu
                        isAuthenticated={isAuthenticated} // Pass the isAuthenticated prop
                        hideMenue={isSliderOpen}
                        onClose={closeSlider}
                    />
                </div>
            )}

            {/* Backdrop */}
            {isSliderOpen && <div className="backdrop" onClick={closeSlider}></div>}
        </section>
    );
};

export default Header;
