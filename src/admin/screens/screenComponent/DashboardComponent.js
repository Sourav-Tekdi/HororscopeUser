import ClientTestimonials from "../../../components/ClientTestimonials"
import DashboardBanner from "../../../components/DashboardBanner"
import LatestPosts from "../../../components/LatestPosts"
import PopularProducts from "../../../components/PopularProducts"
import AboutusComponent from "./AboutusComponent"
import HoroscopeList from "./HoroscopeList"
import { Link } from 'react-router-dom';


const DashboardComponent = () => {
    return (
        <>
            <DashboardBanner />
            <section className="as_service_wrapper as_padderTop80 as_padderBottom80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h1 className="as_heading as_heading_center">
                                our services
                            </h1>
                            <p className="as_font14 as_padderTop20 as_padderBottom20">
                                Consectetur adipiscing elit, sed do eiusmod tempor incididuesdeentiut labore
                                <br />
                                etesde dolore magna aliquapspendisse and the gravida.
                            </p>
                        </div>
                    </div>
                    <div className="row as_verticle_center">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="as_service_img">
                                <img alt="" className="as_service_circle img-responsive" src="assets/images/service_img2.png" />
                                <img alt="" className="as_service_img img-responsive" src="assets/images/service_img1.jpg" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <Link to="/astrologer">

                                        <div className="as_service_box text-center">
                                            <h4 className="as_subheading">
                                                Chat with astrologer
                                            </h4>
                                            <p className="as_paddingBottom10">
                                                Connect instantly with expert astrologers for personalized guidance on your life's journey. Explore our trusted services for accurate predictions and meaningful insights.
                                            </p>
                                        </div>
                                    </Link>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <Link to="/astrologer">

                                        <div className="as_service_box text-center">
                                            <h4 className="as_subheading">
                                                Talk to astrologer
                                            </h4>
                                            <p className="as_paddingBottom10">
                                                Talk to expert astrologers for accurate predictions and personalized guidance to navigate your life's path with confidence.
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <Link to="/products">

                                        <div className="as_service_box text-center">
                                            <span className="as_icon">
                                            </span>
                                            <h4 className="as_subheading">
                                                Astromall Shop
                                            </h4>
                                            <p className="as_paddingBottom10">
                                                Discover a wide range of spiritual and astrological products at Astromall Shop - your one-stop destination for gems, crystals, and more!
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <Link to="/horoscope/aries">

                                        <div className="as_service_box text-center">
                                            <span className="as_icon">
                                            </span>
                                            <h4 className="as_subheading">
                                                Today's Horoscope
                                            </h4>
                                            <p className="as_paddingBottom10">
                                                Today's horoscope offers personalized insights into your day, guiding you with valuable astrological advice based on your zodiac sign. Let the stars illuminate your path for the day ahead!
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <Link to="/free-kundli">

                                        <div className="as_service_box text-center">
                                            <span className="as_icon">
                                            </span>
                                            <h4 className="as_subheading">
                                                Free Kundli
                                            </h4>
                                            <p className="as_paddingBottom10">
                                                Get your free Kundli today! Discover detailed astrological insights based on your birth chart, including your planetary positions, zodiac signs, and life predictions.
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className="as_service_box text-center">
                                        <span className="as_icon">
                                        </span>
                                        <h4 className="as_subheading">
                                            Kundli Matching
                                        </h4>
                                        <p className="as_paddingBottom10">
                                            Kundli Matching for marriage helps determine compatibility between partners based on their astrological charts. It analyzes key factors like Guna Milan, doshas, and planetary alignments to ensure a harmonious and prosperous marital life.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="container">
                <HoroscopeList />

            </div>

            <ClientTestimonials />

            <PopularProducts column={3} showAll={false} />
            

            <LatestPosts />
            <AboutusComponent />


        </>
    )
}

export default DashboardComponent
