import React, { createContext, useContext, useState, useEffect } from 'react'

const NetworkContext = createContext()

export const NetworkProvider = ({ children }) => {
    const [isInternet, setIsInternet] = useState(navigator.onLine)

    useEffect(() => {
        // Event handlers to update internet connectivity status
        const handleOnline = () => setIsInternet(true)
        const handleOffline = () => setIsInternet(false)

        // Add event listeners
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    return (
        <NetworkContext.Provider value={{ isInternet }}>
            {children}
        </NetworkContext.Provider>
    )
}

export const useNetwork = () => useContext(NetworkContext)
