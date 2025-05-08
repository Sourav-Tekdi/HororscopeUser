import { useEffect, useState } from "react"
import Helpers from "../../../Helpers/Helpers"
import ProductCard from "../../components/card/ProductCard"
import { useLocation, useNavigate } from "react-router-dom"
import Pagination from "../../components/Pagination"
import Breadcrum from "../../components/Breadcrum"

const ShopComponent = ({ title }) => {
    const helpers = Helpers()
    const navigate = useNavigate()
    const { search } = useLocation()
    const params = new URLSearchParams(search)
    const pageFromUrl = parseInt(params.get('page'), 10) || 1

    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(pageFromUrl)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await helpers.httpRequest(`/product/?page=${currentPage}&limit=9&populate=true`, 'GET')

                if (response.status === 'success') {
                    setProducts(response.data)
                    setTotalPages(response.totalPages)
                    setTotal(response.total)
                }
            } catch (error) {
                console.error('Error fetching Prducts:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [currentPage])

    // Update URL and state when page changes
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
        navigate(`/product?page=${newPage}`) // Update URL with new page number
        const element = document.querySelector('.as_shop_wrapper')
        if (element) {
            const elementRect = element.getBoundingClientRect()
            const offset = 180 // Set the offset here (can be positive or negative)
            const scrollToY = window.scrollY + elementRect.top - offset

            window.scrollTo({ top: scrollToY, behavior: 'smooth' })
        }

    }
    return (
        <>
            <Breadcrum title={title} />
            <section className="as_shop_wrapper as_padderBottom90 as_padderTop80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                            <div className="as_shop_sidebar">
                                {/* <div className="as_widget as_search_widget">
                                    <input className="form-control" id="" name="" placeholder="Product Search" type="text" />
                                    <span>
                                        <img alt="" src="assets/images/svg/search.svg" />
                                    </span>
                                </div> */}
                                {/* <div className="as_widget as_category_widget">
                                    <h3 className="as_widget_title">
                                        Top Categories
                                    </h3>
                                    <ul>
                                        <li>
                                            <a href="">
                                                Kundali Dosha
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                Face Reading
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                Daily Horoscope
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                Personal Consultation
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                gem &amp; Stone
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                Manglik Dosha
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                Vastu Shastra
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                planets
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                Numerology
                                            </a>
                                        </li>
                                        <li>
                                            <a href="">
                                                tarot cards
                                            </a>
                                        </li>
                                    </ul>
                                </div> */}
                                {/* <div className="as_widget as_product_widget">
                                    <h3 className="as_widget_title">
                                        New Products
                                    </h3>
                                    <ul>
                                        <li className="as_product">
                                            <a href="shop_single.html">
                                                <span className="as_productimg">
                                                    <img alt="" src="assets/images/p1.png" />
                                                </span>
                                                <span className="as_product_detail">
                                                    <img alt="" src="assets/images/rating.png" />
                                                    <span className="as_title">
                                                        Rudrasha yantra
                                                    </span>
                                                    <span>
                                                        $50.00
                                                        <del>
                                                            $80.00
                                                        </del>
                                                    </span>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="as_product">
                                            <a href="shop_single.html">
                                                <span className="as_productimg">
                                                    <img alt="" src="assets/images/p2.png" />
                                                </span>
                                                <span className="as_product_detail">
                                                    <img alt="" src="assets/images/rating.png" />
                                                    <span className="as_title">
                                                        Rudrasha yantra
                                                    </span>
                                                    <span>
                                                        $50.00
                                                        <del>
                                                            $80.00
                                                        </del>
                                                    </span>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="as_product">
                                            <a href="shop_single.html">
                                                <span className="as_productimg">
                                                    <img alt="" src="assets/images/p3.png" />
                                                </span>
                                                <span className="as_product_detail">
                                                    <img alt="" src="assets/images/rating.png" />
                                                    <span className="as_title">
                                                        Rudrasha yantra
                                                    </span>
                                                    <span>
                                                        $50.00
                                                        <del>
                                                            $80.00
                                                        </del>
                                                    </span>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div> */}

                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="as_shop_topbar">
                                <span className="as_result_text">

                                </span>
                                {/* <div className="as_select_box">
                                    <select className="form-control" data-placeholder="Default Shorting">
                                        <option value="male">
                                            By Name
                                        </option>
                                        <option value="female">
                                            By Price
                                        </option>
                                    </select>
                                </div> */}
                            </div>
                            <div className="row">

                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            <Pagination
                                page={currentPage}
                                lastPage={totalPages}
                                setPage={handlePageChange}
                                response={{
                                    from: (currentPage - 1) * 10 + 1,
                                    to: Math.min(currentPage * 10, total),
                                    total,
                                }}
                                path='products'
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShopComponent
