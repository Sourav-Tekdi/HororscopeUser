const Helpers = (navigate = null) => {
    const BASE_URL = process.env.REACT_APP_API_URL

    // Function to set an item in local storage
    const setStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
    }

    // Function to get an item from local storage
    const getStorage = (key) => {
        const value = localStorage.getItem(key)
        return value ? JSON.parse(value) : null
    }

    // Function to delete an item from local storage
    const deleteStorage = (key) => {
        localStorage.removeItem(key)
    }

    const httpRequest = async (path, method = 'GET', data = null, headers = {}) => {
        try {
            const url = `${BASE_URL}${path}` // Construct the full URL

            // Get token from storage
            const accessToken = getStorage('accessToken')

            // Initialize options object
            const options = {
                method,
                headers: {
                    ...headers, // Spread any additional headers
                },
            }

            // Add Authorization header if token exists
            if (accessToken) {
                options.headers['Authorization'] = `Bearer ${accessToken}`
            }

            // Check if data is of type FormData
            if (data instanceof FormData) {
                options.body = data
                // If using FormData, do not set 'Content-Type' header as it will be set automatically by the browser
            } else if (data) {
                options.headers['Content-Type'] = 'application/json'
                options.body = JSON.stringify(data)
            }

            const response = await fetch(url, options)

            if (response.status === 401 && !response.url.includes('auth/login')) {
                deleteStorage('accessToken');
                deleteStorage('user');
                deleteStorage('isAuthenticated');
                window.location.href = '/login';
                return false
            }
            

            // You may want to handle response statuses here (like redirection to login, etc.)
            const result = await response.json()
            if (!response.ok) {
                return {
                    status: 'error',
                    message: result.message || `Request failed with status ${response.status}`,
                }
            }

            return result
        } catch (error) {
            return {
                status: 'error',
                message: error.message,
            }
        }
    }


    const ucFirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    // Helper function to truncate text to a specific number of words
    const truncateText = (text, wordLimit) => {
        const words = text.split(" ");
        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + "..."
            : text;
    };


    return {
        httpRequest,
        setStorage,
        getStorage,
        deleteStorage,
        ucFirst,
        truncateText
    }
}

export default Helpers
