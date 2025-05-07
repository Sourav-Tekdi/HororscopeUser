import React from 'react'
import Breadcrum from '../../components/Breadcrum'

const AboutusComponent = ({ title }) => {
    return (
        <>

            
            <section className="as_about_wrapper as_padderTop80 as_padderBottom80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 text-center">
                            <h1 className="as_heading">
                                About Astrology
                            </h1>
                            <span>
                            </span>
                            <p className="as_font14 as_padderTop20 as_padderBottom50">
                                It is a long established fact that a reader will be distracted by the readable content of a page
                                <br />
                                when looking at its layout. The point of using Lorem Ipsum .
                            </p>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="as_aboutimg text-right">
                                <img alt="" className="img-responsive" src="assets/images/about.jpg" />
                                <span className="as_play">
                                    <img alt="" src="assets/images/play.png" />
                                </span>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="as_about_detail">
                                <h1 className="as_heading">
                                    What Do We Do ?
                                </h1>
                                <div className="as_paragraph_wrapper">
                                    <p className="as_margin0 as_font14 as_padderBottom10">
                                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.
                                    </p>
                                    <p className="as_font14">
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                                    </p>
                                </div>
                                <div className="as_contact_expert">
                                    <span className="as_icon">
                                        <img alt="" src="assets/images/svg/about.svg" />
                                    </span>
                                    <span className="as_year_ex">
                                        30
                                    </span>
                                    <div>
                                        <h5>
                                            years of
                                        </h5>
                                        <h1>
                                            Experience
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutusComponent
