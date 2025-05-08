import React from 'react'
import { useAuth } from '../../user/context/AuthContext';
import Helpers from '../../Helpers/Helpers';
import Notification from '../../Helpers/Notification';

const Logout = () => {
    const { logout } = useAuth();
    const helpers = Helpers();
    const BackendLogout = async () => {
        const response = await helpers.httpRequest(`/auth/logout`);
        Notification(response.status, response.message)
        if (response.status === 'error') return
        logout()
    }
    return (
        <>
            <span onClick={BackendLogout} style={{ cursor: 'pointer' }}>
                <i className="fa fa-lock" style={{ color: 'red' }} /> Logout
            </span>
        </>
    )
}

export default Logout
