import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { onMessageListener } from '../firebase';
import '../App.css'

const Notification = () => {
    const [notification, setNotification] = useState({
        title: '',
        body: '',
        icon: '',
        // navigate_to: ''
    });
    const notify = () =>
        toast(<ToastDisplay />, {
            duration: 4000
        });

    const closeNotification = () => toast.dismiss();
    function ToastDisplay() {
        return (
            <div className="notification-container" onClick={handleNotificationClick}>
                <img className="notification-icon" src={notification.icon} alt="Notification Image" />
                <div className="notification-content">
                    <p>
                        <b>{notification?.title}</b>
                    </p>
                    <p>{notification?.body}</p>
                </div>
                <span className="close-icon" onClick={closeNotification}>
                    &times;
                </span>
            </div>
        );
    }
    const handleNotificationClick = () => {
        if (notification.navigate_to != "" && notification.navigate_to != undefined) {
            const url = notification.navigate_to;
            const pathname = new URL(url).pathname;
            window.location.href = pathname;
        }
    };

    useEffect(() => {
        if (notification?.title) {
            notify();
        }
    }, [notification]);

    onMessageListener()
        .then((payload) => {
            if (payload?.notification?.title) {
                setNotification({
                    title: payload?.notification?.title,
                    body: payload?.notification?.body,
                    icon: payload?.notification?.icon,
                    // navigate_to: payload?.notification?.navigate_to
                });
            }
        })
        .catch((err) => console.log('failed: ', err));

    return <Toaster />;
};

export default Notification;
