import React from 'react'
import { Link } from 'react-router-dom'
import Helpers from '../../Helpers/Helpers'

const HoroscopeCard = ({ horoscope, timeframe }) => {
    const helpers = Helpers()
    return (
        <>
            <div className="col-lg-12 col-md-8 col-sm-12 col-xs-12">
                <div className="as_blog_box">
                    <div className="as_blog_img">
                        <Link to={`/blogs/view/${horoscope?.id}`}>
                            <img alt="" className="img-responsive" src={horoscope?.full_image} />
                        </Link>
                        <span className="as_btn">
                            {horoscope?.prediction_date}
                        </span>
                    </div>
                    <div className="as_blog_detail">
                        <h4 className="as_subheading">
                            {horoscope.sun_sign} {timeframe}'s Horoscope
                        </h4>
                        <p className="as_font14 as_margin0">
                            <strong>Emotion: </strong> {horoscope?.prediction?.emotions}
                        </p>
                        <hr/>
                        <p className="as_font14 as_margin0">
                            <strong>Health: </strong> {horoscope?.prediction?.health}
                        </p>
                        <hr/>
                        <p className="as_font14 as_margin0">
                            <strong>Luck: </strong> {horoscope?.prediction?.luck}
                        </p>
                        <hr/>
                        <p className="as_font14 as_margin0">
                            <strong>Personal Life: </strong> {horoscope?.prediction?.personal_life}
                        </p>
                        <hr/>
                        <p className="as_font14 as_margin0">
                            <strong>Profession: </strong> {horoscope?.prediction?.profession}
                        </p>
                        <hr/>
                        <p className="as_font14 as_margin0">
                            <strong>Travel: </strong> {horoscope?.prediction?.travel}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HoroscopeCard
