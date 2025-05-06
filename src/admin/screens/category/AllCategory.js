import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Footer from '../../includes/footer'
import Header from '../../includes/header'
import Sidebar from '../../includes/sidebar'
import Helpers from '../../../Helpers/Helpers'
import BackToTop from '../../includes/BackToTop'
import Pagination from '../../../components/Pagination'
import Loader from '../../../components/Loader'

const AllCategory = ({ title }) => {
  const helpers = Helpers()
  const navigate = useNavigate()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const pageFromUrl = parseInt(params.get('page'), 10) || 1

  const [categories, setCategories] = useState([])
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
        const response = await helpers.httpRequest(`/category/?page=${currentPage}&limit=10`, 'GET')

        if (response.status === 'success') {
          setCategories(response.data)
          setTotalPages(response.totalPages)
          setTotal(response.total)
        }
      } catch (error) {
        console.error('Error fetching category:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currentPage])

  // Update URL and state when page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    navigate(`/category?page=${newPage}`) // Update URL with new page number
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
                  <h4 className="page-title">Categories</h4>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">{process.env.REACT_APP_NAME}</Link></li>
                    <li className="breadcrumb-item">Categories</li>
                    <li className="breadcrumb-item active" aria-current="page">{title}</li>
                  </ol>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    {/* <div className="card-header text-uppercase text-primary">All categories</div> */}
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table">
                          <thead className="thead-dark">
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Name</th>
                              <th scope="col">Description</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categories.map((category, index) => (
                              <tr key={category._id}>
                                <th scope="row">{index + 1 + (currentPage - 1) * 10}</th>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>
                                  <Link to={'/category/view/' + category._id}>
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
                path='category'
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

export default AllCategory
