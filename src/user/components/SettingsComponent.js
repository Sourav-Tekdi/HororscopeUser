import React, { useState } from 'react'
import { useProfile } from '../../user/context/ProfileContext'
import { useAuth } from '../../user/context/AuthContext';
import { Link } from 'react-router-dom'
import Logout from './Logout'

const SettingsComponent = () => {
    const { isAuthenticated } = useAuth();
    const [isCartOpen, setIsCartOpen] = useState(false)
    const { userInfo } = useProfile();

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    return (
        <div className={`as_cart ${isCartOpen ? 'cart_open' : ''}`}>
            <div className="profile_img_logo" onClick={toggleCart}>
                <span className="user-profile">
                    {/* <img alt="Profile Logo" className="profile-logo" src="/assets/images/icon-5404125_1280.png" /> */}
                    <img alt="Profile Logo" className="profile-logo" src={`${userInfo?.full_profile_pic}`} />
                </span>
            </div>
            {isCartOpen && (
                <div className="as_cart_box">
                    <div className="as_cart_list">
                        <ul>
                            <li>
                                <div className="as_cart_img">
                                    <img className="img-responsive" src={`${userInfo?.full_profile_pic}`} alt="Profile Img" />
                                </div>
                                <div className="as_cart_info">
                                    <p>{userInfo?.name}</p>
                                    <p>{userInfo?.email}</p>
                                </div>
                            </li>


                            <li>
                                <Link to='/profile'>
                                    <li className="dropdown-item">
                                        <i className="fa fa-user" /> Profile
                                    </li>
                                </Link>
                            </li>

                            <li>
                                <Link to='/profile'>
                                    <li className="dropdown-item">
                                        <i className="fa fa-cog" /> Setting
                                    </li>
                                </Link>
                            </li>

                            <li>
                                <li className="dropdown-item">
                                    <Logout />
                                </li>
                            </li>

                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SettingsComponent
