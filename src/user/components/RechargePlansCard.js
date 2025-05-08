import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Helpers from '../../Helpers/Helpers'
import Notification from '../../Helpers/Notification'

const RechargePlansCard = ({ plan, column = 4 }) => {
    const navigate = useNavigate();
    const helpers = Helpers()

    return (
        <>
            <div onClick={() => navigate(`/recharge-plans-details/${plan._id}`)} style={{ border: '1px solid black', borderRadius: '10px', marginBottom: 8, cursor: 'pointer' }} key={plan._id}>
                <div className="as_product_img">
                </div>
                <div className="as_product_detail">
                    <h4 className="as_subheading">{plan.name}</h4>
                    <h6>
                        <span className="as_price">
                            ₹ {plan?.amount ? `${plan?.amount}` : "0"}
                        </span>
                    </h6>

                    <div style={{ background: '#2197541a', color: '#219653', padding: 4, borderRadius: 10 }}>
                        ₹ {plan.description ? `${plan.description}` : "0"} extra
                    </div>

                </div>
            </div>

        </>
    )
}

export default RechargePlansCard
