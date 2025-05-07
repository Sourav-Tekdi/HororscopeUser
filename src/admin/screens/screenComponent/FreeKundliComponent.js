import { useEffect, useState, useRef } from "react"
import Helpers from "../../Helpers/Helpers"
import { useNavigate } from "react-router-dom"
import Breadcrum from "../../components/Breadcrum"
import { useProfile } from "../../context/ProfileContext"

const FreeKundliComponent = ({ title }) => {
    const helpers = Helpers()
    const { userInfo } = useProfile()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        day: 0,
        month: 0,
        year: 0,
        hour: 0,
        min: 0,
        place: '',
        lat: 0.0000,
        lon: 0.0000,
        tzone: 5.5
    })

    const [placeSuggestions, setPlaceSuggestions] = useState([])
    const debounceTimer = useRef(null)

    // Handle Input Changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        const parsedValue = ['day', 'month', 'year', 'hour', 'min'].includes(name) 
            ? parseInt(value, 10) || 0 // Parse as number for specific fields
            : value // Keep as string for other fields

        setFormData({ ...formData, [name]: parsedValue })

        if (name === "place") {
            debounceFetchPlaceSuggestions(value)
        }
    }

    // Debounced Fetch Place Suggestions
    const debounceFetchPlaceSuggestions = (query) => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current)
        debounceTimer.current = setTimeout(() => {
            fetchPlaceSuggestions(query)
        }, 500)
    }

    // Fetch Place Suggestions
    const fetchPlaceSuggestions = async (query) => {
        if (!query) return setPlaceSuggestions([])

        try {
            const response = await helpers.httpRequest(`/kundli/coordinates?place=${query}`, 'GET')
            if (response.status === "success") {
                setPlaceSuggestions(response.data)
            } else {
                setPlaceSuggestions([])
            }
        } catch (error) {
            console.error("Error fetching place suggestions:", error)
            setPlaceSuggestions([])
        }
    }

    // Handle Place Selection
    const handlePlaceSelect = (place) => {
        // Ensure lat and lon are valid numbers and format to 4 decimal places
        const lat = parseFloat(place.latitude)
        const lon = parseFloat(place.longitude)    
        // Check if both lat and lon are valid numbers
        if (!isNaN(lat) && !isNaN(lon)) {
            setFormData({
                ...formData,
                place: place.reference,
                lat: parseFloat(lat.toFixed(4)), // Ensure 4 decimal places
                lon: parseFloat(lon.toFixed(4))  // Ensure 4 decimal places
            })
        } else {
            alert("Invalid latitude or longitude")
        }
    
        setPlaceSuggestions([])
    }
    

    // Submit Kundli Form
    const handleSubmit = (e) => {
        e.preventDefault()
        helpers.setStorage('kundliSearchDetails', formData)
        navigate('/kundli-report')
    }

    return (
        <>
            <Breadcrum title={title} />
            <section className="as_shop_wrapper as_padderBottom90 as_padderTop80">
                <div className="container">
                    {/* Kundli Form */}
                    <h3 className="sub_heading_horoscope_matching">New Kundli</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Name */}
                            <div className="col-md-6 form-group">
                                <label htmlFor="name">Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="Enter Name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Birth Details */}
                        <h4 className="maine-birth-details">Birth Details</h4>
                        <div className="row">
                            {/* Day */}
                            <div className="col-md-4 form-group">
                                <label htmlFor="day">Day *</label>
                                <select
                                    id="day"
                                    name="day"
                                    value={formData.day}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    <option value={0}>Select Day</option>
                                    {[...Array(31)].map((_, i) => (
                                        <option key={i} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Month */}
                            <div className="col-md-4 form-group">
                                <label htmlFor="month">Month *</label>
                                <select
                                    id="month"
                                    name="month"
                                    value={formData.month}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    <option value={0}>Select Month</option>
                                    {[...Array(12)].map((_, i) => (
                                        <option key={i} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Year */}
                            <div className="col-md-4 form-group">
                                <label htmlFor="year">Year *</label>
                                <select
                                    id="year"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    <option value={0}>Select Year</option>
                                    {[...Array(100)].map((_, i) => (
                                        <option key={i} value={1990 + i}>{1990 + i}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            {/* Hour */}
                            <div className="col-md-4 form-group">
                                <label htmlFor="hour">Hour *</label>
                                <select
                                    id="hour"
                                    name="hour"
                                    value={formData.hour}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    <option value={0}>Select Hour</option>
                                    {[...Array(24)].map((_, i) => (
                                        <option key={i} value={i}>{i}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Minute */}
                            <div className="col-md-4 form-group">
                                <label htmlFor="minute">Minute *</label>
                                <select
                                    id="min"
                                    name="min"
                                    value={formData.min}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    <option value={0}>Select Minute</option>
                                    {[...Array(60)].map((_, i) => (
                                        <option key={i} value={i}>{i}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Place of Birth */}
                        <div className="form-group position-relative">
                            <label htmlFor="place">Place of Birth *</label>
                            <input
                                type="text"
                                id="place"
                                name="place"
                                value={formData.place}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Enter Place"
                                required
                            />
                            {/* Suggestions */}
                            {placeSuggestions.length > 0 && (
                                <ul className="suggestions-list">
                                    {placeSuggestions.map((place, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handlePlaceSelect(place)}
                                            style={{ cursor: "pointer", listStyle: "none", padding: "5px", borderBottom: '1px solid #ccc' }}
                                        >
                                            {place.reference}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary mt-3">Generate Kundali</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default FreeKundliComponent
