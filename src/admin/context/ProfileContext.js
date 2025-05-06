import React, { createContext, useContext, useState, useEffect } from 'react';
import Helpers from '../../Helpers/Helpers';

const AuthContext = createContext();

export const ProfileProvider = ({ children }) => {
    const helper = Helpers()
    const [userInfo, setUserInfo] = useState(() => {
        return helper.getStorage('user');
    });

    useEffect(() => {
        const handleStorageChange = () => {
            setUserInfo(helper.getStorage('user'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useProfile = () => useContext(AuthContext);
