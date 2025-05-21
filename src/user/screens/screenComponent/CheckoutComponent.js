import { useEffect, useState } from "react";
import Helpers from "../../../Helpers/Helpers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrum from "../../components/Breadcrum";
import Notification from "../../../Helpers/Notification";
import { clearCart } from "../../features/cart/cartSlice";

const CheckoutComponent = ({ title }) => {
    const dispatch = useDispatch()
    const helpers = Helpers();
    const cartItems = useSelector((state) => state.cart.items) || [];
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cod"); // State to track selected payment method
    const navigate = useNavigate();

    // Calculate total price from cart items
    const totalPrice = cartItems.reduce((total, item) => {
        const price = parseFloat(item.price);
        return total + price;
    }, 0);

    // Handle payment method change
    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handlePayment = async () => {
        setLoading(true);
        try {
            const productIds = cartItems.map(item => item.id);
            const response = await helpers.httpRequest("/order-payment/create-order", "POST", {
                product_ids: productIds,  // Adding the product ids to the request data
                payment_method: paymentMethod,  // Dynamically using selected payment method
            });

            if (paymentMethod === 'cod') {
                Notification(response.status, response.message)
                dispatch(clearCart())
                navigate('/order-success')
                return false
            }

            if (response && response.data.order_id && paymentMethod !== 'cod') {
                const options = {
                    key: "rzp_test_PCT5F9xbSvssRb",
                    amount: response.data.total_amount,
                    currency: "INR",
                    name: "AstroScope",
                    description: "Order Payment",
                    image: "/assets/images/logo.png",
                    order_id: response.data.order_id,
                    handler: async function (paymentResponse) {
                        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = paymentResponse;
                        console.log("Payment successful", paymentResponse);
                        try {
                            // Send payment verification request to the backend
                            const verifyResponse = await helpers.httpRequest('/order-payment/verify-payment',
                                'POST',
                                {
                                    order_id: razorpay_order_id,
                                    payment_id: razorpay_payment_id,
                                    signature: razorpay_signature,
                                }
                            );

                            // Notification(verifyResponse.status, verifyResponse.message)
                            if (verifyResponse.status === 'success') {
                                dispatch(clearCart())
                                navigate('/order-success')
                                return false
                            }

                        } catch (error) {
                            console.error('Error verifying payment:', error);
                            alert('An error occurred during payment verification.');
                        }
                    },
                    prefill: {
                        name: "Customer Name",
                        email: "customer@example.com",
                        contact: "9876543210",
                    },
                    theme: {
                        color: "#3399cc",
                    },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            }
        } catch (error) {
            console.error("Error initiating payment:", error);
            alert("Payment initiation failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Breadcrum title={title} />
            <section className="as_shop_wrapper as_padderTop20">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3>Checkout</h3>
                        </div>
                        {cartItems.map((item) => (
                            <div className="col-md-4" key={item.id}>
                                <div className="card mb-4">
                                    <img
                                        src={item.full_image}
                                        className="card-img-top"
                                        alt={item.title}
                                        style={{ maxHeight: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">
                                            Price: ₹{parseFloat(item.price).toFixed(2)} <br />
                                            Quantity: 1 <br />
                                            Total: ₹{(parseFloat(item.price)).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {
                            cartItems.length > 0 && (
                                <div className="col-12">
                                    <h4 className="mt-4">Total Price: ₹{totalPrice.toFixed(2)}</h4>

                                    {/* Payment Method Selection */}
                                    <div className="form-group">
                                        <label>Choose Payment Method:</label><br />
                                        <input
                                            type="radio"
                                            id="cod"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={paymentMethod === "cod"}
                                            onChange={handlePaymentMethodChange}
                                        />
                                        <label htmlFor="cod">Cash on Delivery (COD)</label>
                                        <input
                                            type="radio"
                                            id="online"
                                            name="paymentMethod"
                                            value="online"
                                            checked={paymentMethod === "online"}
                                            onChange={handlePaymentMethodChange}
                                        />
                                        <label htmlFor="online">Online Payment</label>
                                    </div>

                                    {/* Payment Button */}
                                    <button
                                        className="btn btn-primary"
                                        onClick={handlePayment}
                                        disabled={loading || totalPrice === 0}
                                    >
                                        {loading ? "Processing..." : paymentMethod === 'cod' ? 'Confirm order' : "Pay with Razorpay"}
                                    </button>
                                </div>
                            )
                        }

                    </div>
                </div>
            </section>
        </>
    );
};

export default CheckoutComponent;
