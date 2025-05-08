import React from 'react'
import { Link } from 'react-router-dom';

const BackToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling
        });
    };

    return (
        <Link className="back-to-top" onClick={scrollToTop}>
            <i className="fa fa-angle-double-up" />{" "}
        </Link>
    );
}

export default BackToTop
