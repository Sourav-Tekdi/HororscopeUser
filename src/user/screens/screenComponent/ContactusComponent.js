import React, { useState } from 'react'
import * as Yup from 'yup'
import Notification from '../../Helpers/Notification'
import Helpers from '../../Helpers/Helpers'

const ContactusComponent = () => {
    const helpers = Helpers()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false) // New state for form submission

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required!'),
        email: Yup.string().email('Invalid email!').required('Email is required!'),
        subject: Yup.string().required('Subject is required!'),
        message: Yup.string().required('Message is required!'),
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true) // Set submitting state to true

        try {
            // Validate the form data
            await validationSchema.validate(formData, { abortEarly: false })
            setErrors({}) // Clear errors if validation is successful

            // Send fetch request
            const response = await helpers.httpRequest(`/contact-us/create`, 'POST', formData)

            if (response.status === 'success') {
                Notification(response.status, response.message)
                // Reset form if needed
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                })
            } else {
                Notification(response.status, response.message)
            }
        } catch (err) {
            if (err.name === 'ValidationError') {
                const formErrors = {}
                err.errors.forEach((error) => {
                    const fieldName = error.split(' ')[0].toLowerCase() // Extract field name from error
                    formErrors[fieldName] = error
                })
                setErrors(formErrors)
            } else {
                Notification('error', 'An unexpected error occurred. Please try again later.')
            }
        } finally {
            setIsSubmitting(false) // Reset submitting state after request completes
        }
    }

    return (
        <>
            <section className="as_contact_wrapper as_padderBottom40 as_padderTop50">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h1 className="as_heading as_heading_center">
                                Get in touch with us!
                            </h1>
                            <p className="as_font14 as_padderBottom50 as_padderTop20">
                                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                                <br />
                                et dolore magna aliqua.
                            </p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="as_contact_detail">
                                <ul>
                                    <li className="as_info_box">
                                        <span className="as_icon">
                                            <img alt="" src="assets/images/svg/pin.svg" />
                                        </span>
                                        <p>
                                            Kolkata, New Town, 700135
                                        </p>
                                    </li>
                                    <li className="as_info_box">
                                        <span className="as_icon">
                                            <img alt="" src="assets/images/svg/contact.svg" />
                                        </span>
                                        <p>
                                            +91 7407602125, +91 8918828565
                                        </p>
                                    </li>
                                    <li className="as_info_box">
                                        <span className="as_icon">
                                            <img alt="" src="assets/images/svg/message.svg" />
                                        </span>
                                        <p>
                                            <a href="mailto:support@astrologertest.com">
                                                support@astrologertest.com
                                            </a>
                                        </p>
                                    </li>
                                </ul>
                                <div className="as_map">
                                    <iframe
                                        allowFullScreen
                                        height="318px"
                                        loading="lazy"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d509.53158507277004!2d88.49385237722448!3d22.5910764514941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a020abf3399c7ad%3A0x78833ef9b1a2a8e!2sGazi%20House!5e1!3m2!1sen!2sin!4v1727628455540!5m2!1sen!2sin"
                                        style={{ border: 0 }} width="100%">
                                    </iframe>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <form className="as_appointment_form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="name"
                                        placeholder="Name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <small className="text-danger">{errors.name}</small>}
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="email"
                                        placeholder="Email Address"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <small className="text-danger">{errors.email}</small>}
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        name="subject"
                                        placeholder="Subject"
                                        type="text"
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                    {errors.subject && <small className="text-danger">{errors.subject}</small>}
                                </div>
                                <div className="form-group as_padderBottom10">
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        placeholder="Message"
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                    {errors.message && <small className="text-danger">{errors.message}</small>}
                                </div>
                                <button className="as_btn" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactusComponent
