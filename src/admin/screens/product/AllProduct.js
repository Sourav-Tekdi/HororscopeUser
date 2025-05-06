import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Footer from '../../includes/footer'
import Header from '../../includes/header'
import Sidebar from '../../includes/sidebar'
import Helpers from '../../../Helpers/Helpers'
import BackToTop from '../../includes/BackToTop'
import Pagination from '../../../components/Pagination'
import Loader from '../../../components/Loader'

const AllProduct = ({ title }) => {
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
    document.title = title
  }, [title])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await helpers.httpRequest(`/product/?page=${currentPage}&limit=10&populate=true`, 'GET')

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
  }

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <Header />
        {loading && <Loader />}
        <>
          <div className="clearfix"></div>
          <div className="content-wrapper">
            <div className="container-fluid">
              <div className="row pt-2 pb-2">
                <div className="col-sm-9">
                  <h4 className="page-title">Products</h4>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">{process.env.REACT_APP_NAME}</Link></li>
                    <li className="breadcrumb-item">Products</li>
                    <li className="breadcrumb-item active" aria-current="page">{title}</li>
                  </ol>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    {/* <div className="card-header text-uppercase text-primary">All products</div> */}
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table">
                          <thead className="thead-dark">
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Image</th>
                              <th scope="col">Title</th>
                              <th scope="col">Price</th>
                              <th scope="col">Del Price</th>
                              <th scope="col">Category</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map((product, index) => (
                              <tr key={product._id}>
                                <th scope="row">{index + 1 + (currentPage - 1) * 10}</th>
                                <td><img alt='Product Image' src={`${product.full_image}`} height='50px' width='50px' /></td>
                                <td>{product.title}</td>
                                <td>{product.price.$numberDecimal}</td>
                                <td>{product.del_price.$numberDecimal}</td>
                                <td>{product.category.name}</td>
                                <td>
                                  <Link to={'/products/view/' + product._id}>
                                    <button className='btn btn-sm btn-dark'>
                                      <em className='fa fa-eye'></em> View
                                    </button>
                                  </Link>
                                </td>

                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
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
        </>


        <BackToTop />
        <Footer />
      </div>
    </>
  )
}

export default AllProduct
