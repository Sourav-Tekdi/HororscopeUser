import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProfile } from '../admin/context/ProfileContext';
import Logout from './Logout';

const Menu = ({ hideMenue = false, onClose, isAuthenticated }) => {
    const location = useLocation();
    const { userInfo } = useProfile(); // Assuming userInfo contains profile image, name, email, and contact number

    // Check if the current path matches the given path
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <div className="as_menu">
            {/* Profile Section */}
            {hideMenue && (
                <Link to="/profile">
                    <div className="menu_profile">
                        <button className="close_btn" onClick={onClose}>
                            &times;
                        </button>
                        <div className="profile_details">
                            <img
                                src={userInfo?.full_profile_pic || '/assets/images/default-avatar.png'}
                                alt="Profile"
                                className="profile_image"
                            />
                            <div className="profile_info">
                                <h3>{userInfo?.name || 'Guest User'}</h3>
                                <p>{userInfo?.email || 'Email not available'}</p>
                                <p>{userInfo?.contact_number || 'Contact not available'}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            )}

            {/* Menu Items */}
            <ul>
                <li>
                    <a className={isActive('/')} href="/">
                        Home
                    </a>
                </li>
                <li>
                    <Link className={isActive('/astrologer')} to="/astrologer">
                        Chat with Astrologers
                    </Link>
                </li>
                <li>
                    <Link className={isActive('/free-kundli')} to="/free-kundli">
                        Free Kundli
                    </Link>
                </li>
                <li>
                    <Link className={isActive('/horoscope/:aries')} to="/horoscope/aries">
                        Horoscope
                    </Link>
                </li>
                <li>
                    <Link className={isActive('/blogs')} to="/blogs">
                        Blog
                    </Link>
                </li>
                <li>
                    <Link className={isActive('/products')} to="/products">
                        Astroscope Store
                    </Link>
                </li>
                <li>
                    <Link className={isActive('/aboutus')} to="/aboutus">
                        About Us
                    </Link>
                </li>
                <li>
                    <Link className={isActive('/contactus')} to="/contactus">
                        Contact Us
                    </Link>
                </li>
                {hideMenue && (
                    <>
                        {isAuthenticated ? (
                            <li>
                                <Link> <Logout /></Link>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login" onClick={onClose}>Login</Link>
                            </li>
                        )}
                    </>
                )}
            </ul>
        </div>
    );
};

export default Menu;
