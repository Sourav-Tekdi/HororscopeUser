import React, { useEffect, useState } from 'react'
import Helpers from '../../src/Helpers/Helpers'
import { Link } from 'react-router-dom'
import ProductCard from './card/ProductCard'

const PopularProducts = ({ column = 3 }) => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const helpers = Helpers()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await helpers.httpRequest(`/product/?page=1&limit=4&populate=true`, 'GET')

                if (response.status === 'success') {
                    setProducts(response.data)
                }
            } catch (error) {
                console.error('Error fetching Prducts:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])
    return (
        <section className="as_product_wrapper as_padderBottom80 as_padderTop80">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 text-center">
                        <h1 className="as_heading">
                            Popular Products
                        </h1>
                        <span>
                        </span>
                        <p className="as_font14 as_padderTop20 as_padderBottom10">
                            It is a long established fact that a reader will be distracted by the readable content of a page
                            <br />
                            when looking at its layout. The point of using Lorem Ipsum .
                        </p>
                        <div className="row">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} column={column}/>
                            ))}
                        </div>

                        <div className="text-center as_padderTop60">
                            <Link className="as_btn" to="/products">
                                view more
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PopularProducts
