import React, { useEffect, useState } from 'react'
import Header from './includes/Header'
import Footer from './includes/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import Helpers from '../../Helpers/Helpers'
import Breadcrum from '../components/Breadcrum'
import { useProfile } from '../context/ProfileContext'
import Notification from '../../Helpers/Notification'
import { clearCart } from '../redux/actions/cartActions'
import { useDispatch } from 'react-redux'

const RechargePlanDetails = ({ title }) => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [orederId, setOrderId] = useState('')
    const helpers = Helpers()
    const [plan, setPlan] = useState({})
    const { userInfo, setUserInfo } = useProfile()
    const navigate = useNavigate();

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await helpers.httpRequest(`/recharge-plan/${id}`, 'GET')
                console.log(response);

                if (response.status === 'success') {
                    setPlan(response)
                }
            } catch (error) {
                console.error('Error fetching :', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        // CREATE ORDER
        const creteOrder = async () => {
            setLoading(true)
            try {
                const response = await helpers.httpRequest(`/recharge/create-order/`, 'POST', { planId: id })
                console.log();

                if (response.status === 'success') {
                    setOrderId(response.razorpayOrder.id)
                }
            } catch (error) {
                console.error('Error fetching :', error)
            } finally {
                setLoading(false)
            }
        }

        creteOrder()
    }, [])

    const handlePayment = async () => {
        const totalAmount = (
            Number(plan?.amount) +
            (Number(plan?.amount) * 18) / 100
        ).toFixed(2)

        const options = {
            key: "rzp_test_PCT5F9xbSvssRb", // Replace with your Razorpay key ID
            amount: totalAmount * 100, // Amount in paise
            currency: "INR",
            name: "AstroScope",
            description: "Recharge Plan Payment",
            order_id: orederId,
            handler: async function (response) {
                const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                try {
                    // Send payment verification request to the backend
                    const verifyResponse = await helpers.httpRequest(
                        '/recharge/verify-payment',
                        'POST',
                        {
                            orderId: razorpay_order_id,
                            paymentId: razorpay_payment_id,
                            signature: razorpay_signature,
                        }
                    );

                    Notification(verifyResponse.status, verifyResponse.message)
                    if (verifyResponse.status === 'success') {
                        let usr = helpers.getStorage('user'); // Retrieve the user object
                        if (usr) {
                            usr.wallet_balance = verifyResponse.data.wallet_balance; // Update the wallet balance
                            helpers.setStorage('user', usr)
                            setUserInfo(usr)

                            dispatch(clearCart())
                            navigate('/recharge-success')
                            return false

                        } else {
                            alert('User not found in storage!');
                        }
                    }

                } catch (error) {
                    console.error('Error verifying payment:', error);
                    alert('An error occurred during payment verification.');
                }
            },
            prefill: {
                name: userInfo?.name, // Replace with user's name
                email: userInfo?.email, // Replace with user's email
                contact: userInfo?.mobile // Replace with user's phone number
            },
            theme: {
                color: "#3399cc"
            }
        }

        const razorpay = new window.Razorpay(options)
        razorpay.open()
    }


    return (
        <>
            <div className="as_main_wrapper">
                <Header />
                <Breadcrum title={title} />
                <section className="as_shop_wrapper as_padderBottom90 as_padderTop80">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-8 col-sm-12 col-xs-12" style={{ display: 'flex', justifyContent: 'center', color: 'black' }}>
                                <h1>Plan details</h1>
                            </div>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Recharge Amount</th>
                                        <th>₹ {plan?.amount}</th>
                                    </tr>
                                    <tr>
                                        <th>GST @18%</th>
                                        <th>
                                            ₹ {((Number(plan?.amount) * 18) / 100).toFixed(2)}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>Total Amount</th>
                                        <th>
                                            ₹{" "}
                                            {(
                                                Number(plan?.amount) +
                                                (Number(plan?.amount) * 18) / 100
                                            ).toFixed(2)}
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                            <button
                                className='btn btn-primary'
                                onClick={handlePayment}
                                disabled={loading}
                            >
                                Pay ₹{" "}
                                {(
                                    Number(plan?.amount) +
                                    (Number(plan?.amount) * 18) / 100
                                ).toFixed(2)}
                            </button>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    )
}

export default RechargePlanDetails
