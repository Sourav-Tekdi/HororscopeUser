import { useEffect, useState } from "react"
import Helpers from "../../../Helpers/Helpers"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Breadcrum from "../../components/Breadcrum"
import HoroscopeCard from "../../components/card/HoroscopeCard"
import horoscopesListData from "../../json/horoscope"

const HoroscopeComponent = ({ title, sign }) => {
    const helpers = Helpers()
    const navigate = useNavigate()
    const { search } = useLocation()
    const params = new URLSearchParams(search)
    const [timeframe, setTimeframe] = useState("today") // Default timeframe is 'today'

    const [horoscope, setHoroscope] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            let endpoint = `/horoscope/prediction_daily/${sign}`
            if (timeframe === "yesterday") {
                endpoint = `/horoscope/prediction_daily_previous/${sign}`
            } else if (timeframe === "tomorrow") {
                endpoint = `/horoscope/prediction_daily_next/${sign}`
            }

            try {
                const response = await helpers.httpRequest(endpoint)
                if (response.status === 'success') {
                    setHoroscope(response.data)
                }
            } catch (error) {
                console.error('Error fetching Horoscope:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [sign, timeframe]) // Dependency array includes 'sign' and 'timeframe'

    useEffect(() => {
        const scrollToElement = () => {
            const element = document.querySelector('.as_blog_img')
            if (element) {
                const elementRect = element.getBoundingClientRect()
                const offset = 280
                const scrollToY = window.scrollY + elementRect.top - offset

                window.scrollTo({ top: scrollToY, behavior: 'smooth' })
            }
        }

        scrollToElement()
    }, [sign]) // Trigger when 'sign' changes

    const handlePageChange = (sign) => {
        navigate(`/horoscope/${sign.toLowerCase()}`)
    }

    return (
        <>
            <Breadcrum title={title} url='/' />
            <section className="as_shop_wrapper as_padderBottom90 as_padderTop80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                            <div className="as_shop_sidebar">
                                <div className="as_widget as_category_widget">
                                    <h3 className="as_widget_title">
                                        Select Other Sign
                                    </h3>
                                    <ul>
                                        {horoscopesListData.map((horoscope) => (
                                            <li className={horoscope.name.toLowerCase() === sign ? 'leftMenuActive' : ''} key={horoscope.name}>
                                                <Link to={`/horoscope/${horoscope.name.toLowerCase()}`} onClick={() => handlePageChange(horoscope.name.toLowerCase())}>
                                                    {horoscope.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8 col-sm-12">
                            <div className="as_shop_topbar row">
                                <div className="col-4">
                                    <button className="as_btn_new" onClick={() => setTimeframe("yesterday")}>Yesterday</button>
                                </div>
                                <div className="col-4">
                                    <button className="as_btn_new" onClick={() => setTimeframe("today")}>Today</button>
                                </div>
                                <div className="col-4">
                                    <button className="as_btn_new" onClick={() => setTimeframe("tomorrow")}>Tomorrow</button>
                                </div>
                            </div>
                            <div className="row">
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <HoroscopeCard horoscope={horoscope} timeframe={timeframe} />
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default HoroscopeComponent
