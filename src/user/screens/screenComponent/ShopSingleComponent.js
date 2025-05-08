import { useNavigate, useParams } from "react-router-dom"
import PopularProducts from "../../components/PopularProducts"
import Helpers from "../../Helpers/Helpers"
import { useEffect, useState } from "react"
import Notification from '../../Helpers/Notification'
import Breadcrum from "../../components/Breadcrum"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../redux/actions/cartActions"


const ShopSingleComponent = ({ title }) => {

    const { id } = useParams() // Get product ID from the URL
    const helpers = Helpers()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState(null) // Store the product data
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.cartItems)


    const handleAddToCart = () => {
        // Check if the product is already in the cart

        const isProductInCart = cartItems.some(item => item.id === product.id)

        if (!isProductInCart) {
            dispatch(addToCart(product)) // Dispatch action to add product to cart
        } else {
            console.log("Product is already in the cart")
        }
    }


    useEffect(() => {
        // Fetch product details for pre-populating the form
        const fetchProduct = async () => {
            try {
                const response = await helpers.httpRequest(`/product/${id}?populate=true`, 'GET')
                if (response.status === 'success') {
                    setProduct(response.data)
                } else {
                    Notification('error', 'Error fetching product data')
                    navigate('/notfound')
                }
            } catch (error) {
                console.error('Error fetching product:', error)
                Notification('error', 'Error fetching product data')
            }
        }

        // Show loader until both product and categories are fetched
        Promise.all([fetchProduct()]).finally(() => setLoading(false))
    }, [id])
    return (
        <>
            <Breadcrum title={title} />

            <section className="as_shopsingle_wrapper as_padderBottom80 as_padderTop80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="as_shopsingle_slider">
                                {/* <div className="as_shopsingle_nav">
                                    <div className="as_prod_img">
                                        <img alt="Product image" className="img-responsive" src={product?.full_image} />
                                    </div>
                        
                                </div> */}
                                <div className="as_shopsingle_for">
                                    <div className="as_prod_img">
                                        <img alt="Product image" className="img-responsive" src={product?.full_image} />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="as_product_description">
                                <h3 className="as_subheading as_margin0 as_padderBottom10">
                                    {product?.title}
                                </h3>
                                <h2 className="as_price">
                                    ₹ {product?.price}
                                    <del>
                                        ₹ {product?.del_price}
                                    </del>
                                    <span className="as_off as_btn">
                                        32% Off
                                    </span>
                                </h2>
                                <div className="product_rating as_padderBottom10">
                                    <span className="rating_star">
                                        <img alt="" src="/assets/images/rating.png" />
                                        <span>
                                            {/* (20 customer review) */}
                                        </span>
                                    </span>
                                    <span className="ref_number as_font14 ">
                                        Category: {product?.category?.name}
                                    </span>
                                </div>
                                <p className="as_padderBottom10">
                                    {product?.description}
                                </p>
                                <div className="prod_detail">
                                    <div className="prod_quantity as_padderBottom40">
                                        Quantity :
                                        <div className="quantity">
                                            <button className="qty_button minus" type="button">
                                                <img alt="" src="/assets/images/svg/arrow_down.svg" />
                                            </button>
                                            <input className="input-text form-control qty text" id="quantity_6041ce9eca5d6" inputMode="numeric" max="100" min="1" name="quantity" step="1" title="Qty" type="text" value="1" readOnly />
                                            <button className="qty_button plus" type="button">
                                                <img alt="" src="/assets/images/svg/arrow_up.svg" />
                                            </button>
                                        </div>
                                    </div>
                                    <button onClick={() => handleAddToCart(product)} className="buy_btn as_btn" type="button" value="Buy Now">
                                        <span>
                                            <img alt="" src="/assets/images/svg/cart.svg" />
                                        </span>
                                        add to cart
                                    </button>
                                    {/* <a className="ad_wishlist" href="#">
                                        <img alt="" src="/assets/images/svg/wishlist1.svg" />
                                    </a>
                                    <a className="ad_compare" href="#">
                                        <img alt="" src="/assets/images/svg/compare1.svg" />
                                    </a> */}
                                </div>
                                {/* <div className="as_share_box as_padderTop30">
                                    <ul>
                                        <li>
                                            <a href="">

                                            </a>
                                        </li>
                                        <li>
                                            <a href="">

                                            </a>
                                        </li>
                                        <li>
                                            <a href="">

                                            </a>
                                        </li>
                                    </ul>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <div className="as_tab_wrapper as_padderTop80">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button aria-controls="today" aria-selected="true" className="nav-link active" data-bs-target="#today" data-bs-toggle="tab" id="Today" role="tab" type="button">
                                            Descriptions
                                        </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button aria-controls="tomorrow" aria-selected="false" className="nav-link" data-bs-target="#tomorrow" data-bs-toggle="tab" id="Tomorrow" role="tab" type="button">
                                            Long Description
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content as_padderTop60" id="myTabContent">
                                    <div aria-labelledby="Today" className="tab-pane fade show active" id="today" role="tabpanel">
                                        {product?.description}
                                    </div>

                                    <div aria-labelledby="Tomorrow" className="tab-pane fade" id="tomorrow" role="tabpanel">
                                        <h3 className="as_subheading as_orange as_margin0 as_padderBottom10">
                                            Long Description
                                        </h3>
                                        {product?.long_description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <PopularProducts />

        </>
    )
}

export default ShopSingleComponent
