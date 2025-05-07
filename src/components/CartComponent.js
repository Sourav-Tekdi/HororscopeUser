import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromCart } from '../redux/actions/cartActions'

const CartComponent = () => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const dispatch = useDispatch()

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    // Mock Redux cartItems data
    const cartItems = useSelector((state) => state.cart.cartItems) || []

    const cartCount = cartItems.length

    const handleRemoveItem = (itemId) => {
        dispatch(removeFromCart(itemId))
    }

    return (
        <div className={`as_cart ${isCartOpen ? 'cart_open' : ''}`}>
            <div className="as_cart_wrapper" onClick={toggleCart}>
                <span>
                    <img className='headerSvg' src="/assets/images/svg/cart.svg" />
                    <span className="as_cartnumber">{cartCount}</span>
                </span>
            </div>
            {isCartOpen && (
                <div className="as_cart_box">
                    <div className="as_cart_list">
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item?._id}>
                                    <div className="as_cart_img">
                                        <img
                                            className="img-responsive"
                                            src={item?.full_image}
                                            alt={item?.title}
                                        />
                                    </div>
                                    <div className="as_cart_info">
                                        <a href="#">{item?.title}</a>
                                        <p>1 X ₹{item?.price}</p>

                                        <i onClick={() => handleRemoveItem(item?._id)} className="fa fa-trash text-danger" style={{ cursor: 'pointer' }}></i>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="as_cart_total">
                        <p>
                            Total
                            <span>
                                ₹{cartItems.reduce((total, item) => total + parseFloat(item?.price), 0)}
                            </span>
                        </p>
                    </div>
                    {
                        cartCount > 0 && (
                            <div className="as_cart_btn">
                                <Link to="/checkout" className="as_btn" type="button">
                                    Checkout
                                </Link>
                            </div>
                        )
                    }


                </div>
            )}
        </div>
    )
}

export default CartComponent
