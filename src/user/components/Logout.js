import React from 'react'
import { useAuth } from '../context/AuthContext';
import Helpers from '../../Helpers/Helpers';
import Notification from '../../Helpers/Notification';

const Logout = () => {
    const { logout } = useAuth();
    const helpers = Helpers();
    const BackendLogout = async () => {
        const response = await helpers.httpRequest(`/auth/logout/`);
        Notification(response.status, response.message)
        if (response.status === 'error') return
        logout()
    }
    return (
        <>
            <li onClick={BackendLogout} className="dropdown-item" style={{ cursor: 'pointer', }}>
                <span style={{ color: 'red' }}><i className="icon-power mr-2" /> Logout</span>
            </li>
        </>
    )
}

export default Logout
