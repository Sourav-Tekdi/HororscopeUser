import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import * as Yup from 'yup'
import Helpers from '../../Helpers/Helpers'
import Notification from '../../Helpers/Notification'



const Login = ({ title }) => {
    const helpers = Helpers()
    const { login } = useAuth()

    const [input, setInput] = useState({
        name: '',
        gender: '',
        dob: '',
        address: '',
        language: [],
        email: '',
        mobile: '',
        fees: '',
        delete_fees: '',
        year_of_exp: '',
        specialization: [],
        username: '',
        password: '',
        type: 'astrologer'
    })
    const [profilePic, setProfilePic] = useState(null);
    const [certificate, setCertificate] = useState(null);

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false) // State to track loading status

    const handelChanges = (e) => {
        const { name, value } = e.target
        if (name === "language" || name === "specialization") {
            // If the language is selected as a single option, make sure it's an array
            setInput((prev) => ({
                ...prev,
                [name]: value ? [value] : [] // Push selected value as array or reset to empty array
            }));
        } else {
            setInput((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    }
    const handleFileChange = (e) => {
        const { files } = e.target;
        if (files[0]) setProfilePic(files[0]);
        if (files[0]) setCertificate(files[0]);

    };

    // Yup validation schema
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Full Name is required!'),
        gender: Yup.string().required('Gender is required!'),
        language: Yup.string().required('Language is required!'),
        mobile: Yup.string()
            .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
            .required('Mobile is required!'),
        fees: Yup.number().required('Fees is required!').positive('Fees must be a positive number!'),
        year_of_exp: Yup.number().required('Years of Experience (year_of_exp) is required!').positive('Years of Experience must be a positive number!'),
        specialization: Yup.string().required('Specialization is required!'),
        username: Yup.string()
            .strict(true)
            .min(4, 'Username must be at least 4 characters!')
            .required('Username is required!'),
        password: Yup.string()
            .min(4, 'Password must be at least 4 characters!')
            .required('Password is required!'),
    });


    const validateInputs = async () => {
        try {
            await validationSchema.validate(input, { abortEarly: false })
            setErrors({})
            return true
        } catch (validationErrors) {
            const formattedErrors = {}
            validationErrors.inner.forEach((error) => {
                formattedErrors[error.path] = error.message
            })
            setErrors(formattedErrors)
            return false
        }
    }


    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('gender', input.gender);
        formData.append('dob', input.dob);
        formData.append('address', input.address);
        // Append languages and specializations as separate fields
        input.language.forEach(lang => formData.append('language[]', lang));
        input.specialization.forEach(spec => formData.append('specialization[]', spec));
        formData.append('email', input.email);
        formData.append('mobile', input.mobile);
        formData.append('fees', input.fees);
        formData.append('year_of_exp', input.year_of_exp);
        formData.append('username', input.username);
        formData.append('password', input.password);
        formData.append('is_active', input.is_active);
        formData.append('type', input.type);

        if (profilePic) formData.append('profile_pic', profilePic);
        if (certificate) formData.append('certificate', certificate);


        try {
            // if (!(await validateInputs())) return
            // setLoading(true)

            const response = await helpers.httpRequest(
                '/astrologer/create',
                'POST',
                formData // No need for Content-Type header here
            );

            Notification(response.status, response.message);
            setLoading(false);

            if (response.status === 'success') {
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1500);
            }
        } catch (error) {
            setLoading(false);
            Notification('error', 'An unexpected error occurred.');
            console.error('Registration error:', error);
        }
    };


    useEffect(() => {
        document.title = title
    }, [title])

    return (
        <>
            <div id="wrapper">
                <div className="card card-authentication1 mx-auto my-5 shadow" style={{ maxWidth: '900px' }}>
                    <div className="card-body">
                        <div className="card-content p-4">
                            <div className="text-center mb-4">
                                <img src="admin/assets/images/Astro_Logo.png" style={{ width: '150px' }} alt="logo icon" />
                            </div>
                            <h4 className="card-title text-uppercase text-center py-3">Astrologer Sign Up</h4>

                            <form onSubmit={handleRegister}>
                                <div className="row">
                                    {/* Left Section */}
                                    <div className="col-md-6">
                                        <h5 className="text-uppercase mb-3">
                                            <i className="fas fa-user-circle"></i> Personal Information
                                        </h5>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputName">Full Name</label>
                                            <input
                                                onChange={handelChanges}
                                                type="text"
                                                name="name"
                                                value={input.name}
                                                id="exampleInputName"
                                                className="form-control input-shadow"
                                                placeholder="Enter Your Name"
                                                disabled={loading}
                                            />
                                            {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputGender">Gender</label>
                                            <select
                                                onChange={handelChanges}
                                                name="gender"
                                                value={input.gender}
                                                id="exampleInputGender"
                                                className="form-control input-shadow"
                                                disabled={loading}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                            {errors.gender && <span style={{ color: 'red' }}>{errors.gender}</span>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputDob">Date of Birth</label>
                                            <input
                                                onChange={handelChanges}
                                                type="date"
                                                name="dob"
                                                value={input.dob}
                                                id="exampleInputDob"
                                                className="form-control input-shadow"
                                                disabled={loading}
                                            />
                                            {errors.dob && <span style={{ color: 'red' }}>{errors.dob}</span>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputAddress">Address</label>
                                            <div className="position-relative has-icon-right">
                                                <input
                                                    onChange={handelChanges}
                                                    type="text"
                                                    name="address"
                                                    value={input.address}
                                                    id="exampleInputAddress"
                                                    className="form-control input-shadow"
                                                    placeholder="Enter Address"
                                                    disabled={loading}
                                                />
                                                {errors.address && <span style={{ color: 'red' }}>{errors.address}</span>}
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputLanguage">Language</label>
                                            <div className="position-relative has-icon-right">
                                                <select
                                                    onChange={handelChanges}
                                                    name="language"
                                                    value={input.language[0] || ''} // Select the first language if it's an array
                                                    id="exampleInputLanguage"
                                                    className="form-control input-shadow"
                                                    disabled={loading}
                                                >
                                                    <option value="">Select Language</option>
                                                    <option value="bengali">Bengali</option>
                                                    <option value="hindi">Hindi</option>
                                                    <option value="english">English</option>
                                                </select>
                                                {errors.language && <span style={{ color: 'red' }}>{errors.language}</span>}
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputProfilePic">Profile Pic</label>
                                            <div className="position-relative has-icon-right">
                                                <input
                                                    onChange={handleFileChange}
                                                    type="file"
                                                    name="profile_pic"
                                                    value={input.profile_pic}
                                                    id="exampleInputProfilePic"
                                                    className="form-control input-shadow"
                                                    placeholder="Enter Years of Experience"
                                                    disabled={loading}
                                                />
                                                {errors.profile_pic && <span style={{ color: 'red' }}>{errors.profile_pic}</span>}
                                            </div>
                                        </div>

                                        <h5 className="text-uppercase mb-3">
                                            <i className="fas fa-envelope"></i> Contact Information
                                        </h5>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail">Email</label>
                                            <input
                                                onChange={handelChanges}
                                                type="email"
                                                name="email"
                                                value={input.email}
                                                id="exampleInputEmail"
                                                className="form-control input-shadow"
                                                placeholder="Enter Your Email"
                                                disabled={loading}
                                            />
                                            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputMobile">Mobile</label>
                                            <input
                                                onChange={handelChanges}
                                                type="text"
                                                name="mobile"
                                                value={input.mobile}
                                                id="exampleInputMobile"
                                                className="form-control input-shadow"
                                                placeholder="Enter Your Mobile No."
                                                disabled={loading}
                                            />
                                            {errors.mobile && <span style={{ color: 'red' }}>{errors.mobile}</span>}
                                        </div>
                                    </div>

                                    {/* Professional Credentials */}
                                    {/* <div className="col-md-6">

                                    </div> */}


                                    {/* Right Section */}
                                    <div className="col-md-6">


                                        <h5 className="text-uppercase mb-3">
                                            <i className="fas fa-envelope"></i> Professional Credentials
                                        </h5>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputFees">Fees</label>
                                            <div className="position-relative has-icon-right">
                                                <input
                                                    onChange={handelChanges}
                                                    type="number"
                                                    name="fees"
                                                    value={input.fees}
                                                    id="exampleInputFees"
                                                    className="form-control input-shadow"
                                                    placeholder="Enter Years of Experience"
                                                    disabled={loading}
                                                />
                                                {errors.fees && <span style={{ color: 'red' }}>{errors.fees}</span>}
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputDeleteFees">Deleted Fees</label>
                                            <div className="position-relative has-icon-right">
                                                <input
                                                    onChange={handelChanges}
                                                    type="number"
                                                    name="delete_fees"
                                                    value={input.delete_fees}
                                                    id="exampleInputDeleteFees"
                                                    className="form-control input-shadow"
                                                    placeholder="Enter Years of Experience"
                                                    disabled={loading}
                                                />
                                                {errors.delete_fees && <span style={{ color: 'red' }}>{errors.delete_fees}</span>}
                                            </div>
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="exampleInputYearOfExp">Year of Experience</label>
                                            <div className="position-relative has-icon-right">
                                                <input
                                                    onChange={handelChanges}
                                                    type="number"
                                                    name="year_of_exp"
                                                    value={input.year_of_exp}
                                                    id="exampleInputYearOfExp"
                                                    className="form-control input-shadow"
                                                    placeholder="Enter Years of Experience"
                                                    disabled={loading}
                                                />
                                                {errors.year_of_exp && <span style={{ color: 'red' }}>{errors.year_of_exp}</span>}
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputSpecialization">Specialization</label>
                                            <div className="position-relative has-icon-right">
                                                <select
                                                    onChange={handelChanges}
                                                    name="specialization"
                                                    value={input.specialization[0] || ''} // Select the first language if it's an array
                                                    id="exampleInputSpecialization"
                                                    className="form-control input-shadow"
                                                    disabled={loading}
                                                >
                                                    <option value="">Select Specialization</option>
                                                    <option value="vedic_astrology_specialist">Vedic Astrology Specialist</option>
                                                    <option value="kp_astrology_practitioner">KP Astrology Practitioner</option>
                                                    <option value="vastu_consultant">Vastu Consultant</option>
                                                    <option value="lal_kitab_expert">Lal Kitab Expert</option>
                                                    <option value="nadi_astrology_expert">Nadi Astrology Expert</option>
                                                    <option value="gemology_specialist">Gemology Specialist</option>
                                                    <option value="horary_astrology_expert">Horary Astrology (Prashna Kundali Expert)</option>
                                                    <option value="numerologist">Numerologist</option>
                                                    <option value="palmistry_consultant">Palmistry Consultant</option>
                                                    <option value="muhurta_specialist">Muhurta Specialist</option>
                                                    <option value="western_astrology_certification">Western Astrology Certification</option>
                                                    <option value="medical_astrology_practitioner">Medical Astrology Practitioner</option>
                                                    <option value="astro_psychology_expert">Astro-Psychology Expert</option>
                                                    <option value="financial_astrology_specialist">Financial Astrology Specialist</option>
                                                    <option value="kundali_matching_expert">Kundali Matching Expert</option>
                                                </select>
                                                {errors.specialization && <span style={{ color: 'red' }}>{errors.specialization}</span>}
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputCertificate">Certificate</label>
                                            <div className="position-relative has-icon-right">
                                                <input
                                                    onChange={handleFileChange}
                                                    type="file"
                                                    name="certificate"
                                                    value={input.certificate}
                                                    id="exampleInputCertificate"
                                                    className="form-control input-shadow"
                                                    placeholder="Enter Years of Experience"
                                                    disabled={loading}
                                                />
                                                {errors.certificate && <span style={{ color: 'red' }}>{errors.certificate}</span>}
                                            </div>
                                        </div>

                                        {/* Login Details */}
                                        <h5 className="text-uppercase mt-4 mb-3">
                                            <i className="fas fa-key"></i> Login Details
                                        </h5>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername">Username</label>
                                            <input
                                                onChange={handelChanges}
                                                type="text"
                                                name="username"
                                                value={input.username}
                                                id="exampleInputUsername"
                                                className="form-control input-shadow"
                                                placeholder="Enter Username"
                                                disabled={loading}
                                            />
                                            {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword">Password</label>
                                            <input
                                                onChange={handelChanges}
                                                type="password"
                                                name="password"
                                                value={input.password}
                                                id="exampleInputPassword"
                                                className="form-control input-shadow"
                                                placeholder="Enter Password"
                                                disabled={loading}
                                            />
                                            {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary shadow-primary btn-block waves-effect waves-light mt-4"
                                    disabled={loading}
                                >
                                    {loading ? 'Signing Up...' : 'Sign Up'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );


}

export default Login
