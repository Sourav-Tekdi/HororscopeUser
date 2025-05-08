import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const testimonials = [
    {
        image: 'assets/images/c1.jpg',
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
        name: 'A. Dennett',
        profession: 'Astrologer',
    },
    {
        image: 'assets/images/c2.jpg',
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
        name: 'R. Lilly',
        profession: 'Astrologer',
    },
    {
        image: 'assets/images/c3.jpg',
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
        name: 'David Parker',
        profession: 'Astrologer',
    },
    {
        image: 'assets/images/c4.jpg',
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
        name: 'David Lee',
        profession: 'Astrologer',
    },
    {
        image: 'assets/images/c5.jpg',
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
        name: 'H. Wang',
        profession: 'Astrologer',
    },
    {
        image: 'assets/images/c6.jpg',
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
        name: 'G. Zirkle',
        profession: 'Astrologer',
    },
];

const ClientTestimonials = () => {
    const location = useLocation();

    useEffect(() => {
        // This will trigger a re-render when the route changes
    }, [location]);

    return (
        <section className="as_customer_wrapper as_padderBottom80 as_padderTop80">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h1 className="as_heading as_heading_center">What My Client Say</h1>
                        <p className="as_font14 as_padderBottom50 as_padderTop20">
                            Consectetur adipiscing elit, sed do eiusmod tempor incididuesdeentiut labore
                            <br />
                            etesde dolore magna aliquapspendisse and the gravida.
                        </p>
                        <div className="row as_customer_slider">
                            <div className="col-lg-5 col-md-5 as_customer_nav">
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="as_customer_img">
                                        <img
                                            alt=""
                                            className="img-responsive"
                                            src={testimonial.image}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="col-lg-7 col-md-7 as_customer_for">
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="as_customer_box text-center">
                                        <p className="as_margin0">
                                            "{testimonial.quote}"
                                        </p>
                                        <h3>
                                            {testimonial.name} - 
                                            <span> {testimonial.profession}</span>
                                        </h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientTestimonials;
