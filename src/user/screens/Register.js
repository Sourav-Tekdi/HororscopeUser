import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import Notification from '../../src/Helpers/Notification';
import Helpers from '../../src/Helpers/Helpers';

const Register = ({ title }) => {
    const helpers = Helpers();
    const [input, setInput] = useState({
        name: '',
        gender: '',
        address: '',
        mobile: '',
        email: '',
        username: '',
        password: '',
        type: 'user',
    });



    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = title;
    }, [title]);

    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const handleFileChange = (e) => {
        const { files } = e.target;
        if (files[0]) setProfilePic(files[0]);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('gender', input.gender);
        formData.append('address', input.address);
        formData.append('mobile', input.mobile);
        formData.append('email', input.email);
        formData.append('username', input.username);
        formData.append('password', input.password);
        formData.append('type', input.type);

        if (profilePic) formData.append('profile_pic', profilePic);

        try {
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

    const images = [
        "assets/images/Astro_Logo.png",
        "assets/images/Antara.jpg"
    ];
    return (
        <>
            <section className="as_login_wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ad_login_box">
                                <div className="row">
                                    <div className=" col-lg-7 col-md-7 col-sm-12">
                                        <div className="as_padderTop70 as_padderBottom60 text-center">
                                            <Slider ref={sliderRef} {...settings}>
                                                {images.map((image, i) => (
                                                    <div key={i} className="as_login_img">
                                                        <img alt="" src={image} />
                                                    </div>
                                                ))}
                                            </Slider>
                                        </div>
                                    </div>
                                    <div className=" col-lg-5 col-md-7 col-sm-12">
                                        <div className="as_login_detail text-center">
                                            <a href="$">
                                                <img alt="" src="assets/images/astroscop.png" />
                                            </a>
                                            <h1 className="as_padderTop50">Create an Account</h1>
                                            <p className="as_padderBottom30">Sign up!</p>
                                            <form onSubmit={handleRegister} className="d_block">
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        name="username"
                                                        placeholder="Enter your username"
                                                        type="text"
                                                        value={input.username}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        name="password"
                                                        placeholder="Enter a strong password"
                                                        type="password"
                                                        value={input.password}
                                                        onChange={handleChange}
                                                        minLength="8"
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        name="name"
                                                        placeholder="Enter your name"
                                                        type="text"
                                                        value={input.name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <select
                                                        className="form-control"
                                                        name="gender"
                                                        value={input.gender}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="" disabled>
                                                            Select your Gender
                                                        </option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                    </select>
                                                </div>


                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        name="address"
                                                        placeholder="Enter your Address"
                                                        type="text"
                                                        value={input.address}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>


                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        name="email"
                                                        placeholder="Enter your email address"
                                                        type="email"
                                                        value={input.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        name="mobile"
                                                        placeholder="Enter your mobile number"
                                                        type="tel"
                                                        value={input.mobile}
                                                        onChange={handleChange}
                                                        pattern="^\d{10}$"
                                                        required
                                                    />
                                                </div>

                                                {/* Profile Image Upload Field */}
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        name="profile_pic"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                    />
                                                    {profilePic && (
                                                        <p>Profile picture selected: {profilePic.name}</p>
                                                    )}
                                                </div>

                                                <div className="text-center as_padderTop20">
                                                    <button className="as_btn" type="submit" disabled={loading}>
                                                        {loading ? 'Registering...' : 'Register'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;
