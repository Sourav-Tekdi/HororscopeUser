import { useEffect, useState } from "react"
import Helpers from "../../Helpers/Helpers"
// import { useLocation, useNavigate } from "react-router-dom"
import Breadcrum from "../../components/Breadcrum"
import RechargePlansCard from "../../components/RechargePlansCard"
import { useProfile } from "../../context/ProfileContext"

const RechargePlansComponent = ({ title }) => {
    const helpers = Helpers()
    const { userInfo } = useProfile()
    // const navigate = useNavigate()
    // const { search } = useLocation()
    // const params = new URLSearchParams(search)

    const [plans, setPlans] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)

    // Observer reference to track when we reach the end of the list
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await helpers.httpRequest(`/recharge-plan`, 'GET')

                if (response.status === 'success') {
                    setPlans(prevAstrologers => [
                        ...prevAstrologers,
                        ...response.data
                    ])
                    setTotal(response.total)
                }
            } catch (error) {
                console.error('Error fetching Astrologers:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <>
            <Breadcrum title={title} />
            <section className="as_shop_wrapper as_padderBottom90 as_padderTop80">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 col-md-8 col-sm-12 col-xs-12" style={{ display: 'flex', justifyContent: 'center', color: 'black' }}>
                            <h1>Add Money to Wallet</h1>
                        </div>
                        <div className="col-lg-12 col-md-8 col-sm-12 col-xs-12">
                            <h5>Available Balance</h5>
                        </div>
                        <div className="col-lg-12 col-md-8 col-sm-12 col-xs-12">
                            <h3>₹ {userInfo.wallet_balance}</h3>
                        </div>
                        <div className="col-lg-12 col-md-8 col-sm-12 col-xs-12">
                            <div className="as_shop_topbar">
                                <span className="as_result_text">
                                    Showing {plans.length} of {total} plans
                                </span>
                                <div className="as_select_box">
                                    <select className="form-control" data-placeholder="Default Shorting">
                                        <option value="name">
                                            By Name
                                        </option>
                                        <option value="price">
                                            By Price
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                {plans.map((plan, index) => (
                                    <div
                                        key={plan.id}
                                        className="col-lg-3 col-md-6 col-sm-12 col-xs-12"
                                    >
                                        <RechargePlansCard plan={plan} />
                                    </div>
                                ))}
                            </div>
                            {loading && <p>Loading...</p>}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RechargePlansComponent
