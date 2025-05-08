import React from 'react'
import { Link } from 'react-router-dom'
import handleScrollToTop from '../../../Helpers/Helpers'
const Footer = () => {
    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const iconStyle = {
        fontSize: '17px',
        marginRight: '8px',
    };

    const textStyle = {
        marginLeft: '3px',
        margin: 0,
    };

    return (
        <section className="as_footer_wrapper as_padderTop80">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="as_know_sign_wrapper as_padderBottom50 as_padderTop100">
                            <div className="row">
                                {/* <div className="col-lg-4">
                                    <h1 className="as_heading as_heading_center">
                                        Zodiac Sign Finder
                                    </h1>
                                </div> */}
                                {/* <div className="col-lg-8">
                                    <div className="as_sign_form text-left">
                                        <ul>
                                            <li className="as_form_box">
                                                <div className="as_input_feild as_select_box">
                                                    <select className="form-control" data-placeholder="Date">
                                                        <option value="1">
                                                            1
                                                        </option>
                                                        <option value="2">
                                                            2
                                                        </option>
                                                        <option value="3">
                                                            3
                                                        </option>
                                                        <option value="4">
                                                            4
                                                        </option>
                                                        <option value="5">
                                                            5
                                                        </option>
                                                    </select>
                                                </div>
                                            </li>
                                            <li className="as_form_box">
                                                <div className="as_input_feild as_select_box">
                                                    <select className="form-control" data-placeholder="Month">
                                                        <option value="1">
                                                            1
                                                        </option>
                                                        <option value="2">
                                                            2
                                                        </option>
                                                        <option value="3">
                                                            3
                                                        </option>
                                                        <option value="4">
                                                            4
                                                        </option>
                                                    </select>
                                                </div>
                                            </li>
                                            <li className="as_form_box">
                                                <div className="as_input_feild as_select_box">
                                                    <select className="form-control" data-placeholder="Year">
                                                        <option value="1994">
                                                            1994
                                                        </option>
                                                        <option value="1995">
                                                            1995
                                                        </option>
                                                        <option value="1996">
                                                            1996
                                                        </option>
                                                        <option value="1997">
                                                            1997
                                                        </option>
                                                        <option value="1998">
                                                            1998
                                                        </option>
                                                    </select>
                                                </div>
                                            </li>
                                            <li className="as_form_box">
                                                <a className="as_btn" href="">
                                                    Submit
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="as_footer_inner as_padderTop10 as_padderBottom40">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-12">
                                    <div className="as_footer_widget">
                                        <div className="as_footer_logo">
                                            <a href="index.html">
                                                <img alt="" src="assets/images/logo1.svg" />
                                            </a>
                                        </div>
                                        <p>
                                            At Astroscope, we provide expert astrology support and personalized guidance, to help you navigate life's journey with confidence.
                                        </p>
                                        <ul className="as_contact_list">
                                            <li>
                                                <div style={containerStyle}>
                                                    <span className="fa fa-headphones" style={iconStyle}></span>
                                                    <p style={textStyle}>
                                                        We are available 24x7 on chat support.
                                                    </p>
                                                </div>
                                            </li>
                                            <li>
                                                <img alt="" src="assets/images/svg/map.svg" />
                                                <p>
                                                    Kolkata, New Town, 700135
                                                </p>
                                            </li>
                                            <li>
                                                <img alt="" src="assets/images/svg/phone.svg" />
                                                <p>
                                                    <a href="tel:+917407602125">
                                                        +91 7407602125
                                                    </a>
                                                </p>
                                            </li>
                                            <li>
                                                <img alt="" src="assets/images/svg/mail.svg" />
                                                <p>
                                                    <a href="mailto:support@astrologertest.com">
                                                        support@astrologertest.com
                                                    </a>
                                                </p>
                                            </li>
                                        </ul>
                                        <div className="as_social_links" style={{ marginTop: '20px' }}>
                                            <a href="https://facebook.com/astroscope" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', fontSize: '16px' }}>
                                                <span className="fa fa-facebook"></span>
                                            </a>
                                            <a href="https://instagram.com/astroscope" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', fontSize: '16px' }}>
                                                <span className="fa fa-instagram"></span>
                                            </a>
                                            <a href="https://twitter.com/astroscope" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', fontSize: '16px' }}>
                                                <span className="fa fa-twitter"></span>
                                            </a>
                                            <a href="https://youtube.com/astroscope" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', fontSize: '16px' }}>
                                                <span className="fa fa-youtube"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-6 col-sm-12">
                                    <div className="as_footer_widget">
                                        <h3 className="as_footer_heading">
                                            Astrology Forecasts
                                        </h3>
                                        <ul>
                                            <li>
                                                <Link to="/astrologer" onClick={handleScrollToTop}>
                                                    Chat with Astrologers
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/products" onClick={handleScrollToTop}>
                                                    Astroscope Store
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/blogs" onClick={handleScrollToTop}>
                                                    Astrology Blog
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/free-kundli">
                                                    Free Kundli
                                                </Link>
                                            </li>
                                            <li>
                                                <a href="/horoscope/aries">
                                                    My Daily Horoscope
                                                </a>
                                            </li>

                                        </ul>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-6 col-sm-12">
                                    <div className="as_footer_widget">
                                        <h3 className="as_footer_heading">
                                            Company Policy
                                        </h3>
                                        <li>
                                            {/* <Link to="/aboutus" onClick={handleScrollToTop}> */}
                                            Refund & Cancellation Policy
                                            {/* </Link> */}
                                        </li>
                                        <li>
                                            {/* <Link to="/aboutus" onClick={handleScrollToTop}> */}
                                            Terms & Conditions
                                            {/* </Link> */}
                                        </li>
                                        <li>
                                            {/* <Link to="/aboutus" onClick={handleScrollToTop}> */}
                                            Privacy & Policy
                                            {/* </Link> */}
                                        </li>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-md-6 col-sm-12">
                                    <div className="as_footer_widget">
                                        <h3 className="as_footer_heading">
                                            Security
                                        </h3>
                                        <li>
                                            {/* <Link to="/aboutus" onClick={handleScrollToTop}> */}
                                            Private & Confidential

                                            {/* </Link> */}
                                        </li>
                                        <li>
                                            {/* <Link to="/aboutus" onClick={handleScrollToTop}> */}
                                            Verified Astrologers
                                            {/* </Link> */}
                                        </li>
                                        <li>
                                            {/* <Link to="/aboutus" onClick={handleScrollToTop}> */}
                                            Secure Payments
                                            {/* </Link> */}
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="as_copyright_wrapper text-center">
                            <p>
                                Copyright © 2024 Astroscope Services. All Right Reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer
