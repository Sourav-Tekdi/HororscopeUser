import React from 'react'
import { Link } from 'react-router-dom'
import { addToCart } from '../../../user/features/cart/cartSlice' // Updated import path
import { useDispatch, useSelector } from 'react-redux'

const ProductCard = ({ product, column = 3 }) => {
    const dispatch = useDispatch()

    // Access the cart items from the Redux state with correct path
    const cartItems = useSelector(state => state.cart?.items || [])

    const handleAddToCart = () => {
        // Check if the product is already in the cart
        const isProductInCart = cartItems.some(item => item._id === product._id)

        if (!isProductInCart) {
            dispatch(addToCart(product)) // Dispatch action to add product to cart
        } else {
            console.log("Product is already in the cart")
        }
    }

    const isWithinAMonth = (dateString) => {
        const date = new Date(dateString);
        const currentDate = new Date();
        const timeDifference = currentDate - date;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert milliseconds to days
        return daysDifference <= 30;
    };

    return (
        <div className={`col-lg-${column} col-md-6 col-sm-6 col-xs-12`} key={product._id}>
            <div className="product-card">
                <div className="card-img-container">
                    <img
                        className="card-img"
                        alt="Product Image"
                        src={product.full_image}
                    />
                    {isWithinAMonth(product.created_at) && isWithinAMonth(product.updated_at) && (
                        <span className="new-tag">new</span>
                    )}
                    <div className="card-overlay">
                        <button onClick={handleAddToCart} className="action-button">
                            <img alt="Add to Cart" src="/assets/images/svg/cart.svg" />
                            Add To Cart
                        </button>
                        <Link to={`/products/view/${product._id}`} className="action-button">
                            <img alt="View Product" src="/assets/images/svg/view.svg" />
                            View Product
                        </Link>
                    </div>
                </div>
                <div className="card-details">
                    <h4 className="card-name">{product.title}</h4>
                    <p className="card-price">
                        <span className="current-price">₹ {product.price}</span>
                        {product.del_price && <del className="original-price">₹ {product.del_price}</del>}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
