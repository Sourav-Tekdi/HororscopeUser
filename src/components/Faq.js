import React, { useEffect, useState } from 'react'
import Helpers from '../Helpers/Helpers'
import { useNavigate } from 'react-router-dom'
import Notification from '../Helpers/Notification'
const Faq = () => {
    const helpers = Helpers()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [responseData, setResponseData] = useState([]) // Initialize as an empty array
    const [openIndex, setOpenIndex] = useState(null) // State to track the open accordion item

    useEffect(() => {
        // Fetch product details for pre-populating the form
        const fetchData = async () => {
            try {
                const response = await helpers.httpRequest(`/faq/`, 'GET')
                if (response.status === 'success') {
                    setResponseData(response.data)
                } else {
                    Notification('error', 'Error fetching data')
                    navigate('/notfound')
                }
            } catch (error) {
                console.error('Error fetching:', error)
                Notification('error', 'Error fetching data')
            }
        }

        // Fetch the FAQ data
        fetchData().finally(() => setLoading(false))
    }, [])

    // Function to handle the toggle of accordion items
    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    if (loading) {
        return <div>Loading...</div> // You can customize the loading UI
    }

    return (
        <div className="as_widget as_faq_widget">
            <h3 className="as_widget_title">FAQ</h3>
            <div className="accordion as_accordion" id="accordionPanelsStayOpenExample">
                {responseData.map((faq, index) => (
                    <div className="accordion-item" key={index}>
                        <div className="accordion-header" id={`panelsStayOpen-heading${index}`}>
                            <h2 className="mb-0">
                                <button
                                    aria-controls={`panelsStayOpen-collapse${index}`}
                                    aria-expanded={openIndex === index}
                                    className={`accordion-button ${openIndex === index ? '' : 'collapsed'}`}
                                    data-bs-target={`#panelsStayOpen-collapse${index}`}
                                    data-bs-toggle="collapse"
                                    type="button"
                                    onClick={() => handleToggle(index)}
                                >
                                    {faq.question} {/* Use the question from the response */}
                                </button>
                            </h2>
                        </div>
                        <div
                            aria-labelledby={`panelsStayOpen-heading${index}`}
                            className={`accordion-collapse collapse ${openIndex === index ? 'show' : ''}`}
                            id={`panelsStayOpen-collapse${index}`}
                        >
                            <div className="accordion-body">
                                {faq.answer} {/* Use the answer from the response */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Faq
