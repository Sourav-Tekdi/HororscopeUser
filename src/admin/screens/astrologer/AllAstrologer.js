import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Footer from '../../includes/footer'
import Header from '../../includes/header'
import Sidebar from '../../includes/sidebar'
import Helpers from '../../../Helpers/Helpers'
import BackToTop from '../../includes/BackToTop'
import Pagination from '../../../components/Pagination'
import Loader from '../../../components/Loader'
import Switch from "react-switch";
import Notification from '../../../Helpers/Notification'


const AllAstrologer = ({ title }) => {
  const helpers = Helpers()
  const navigate = useNavigate()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const pageFromUrl = parseInt(params.get('page'), 10) || 1

  const [astrologers, setAstrologers] = useState([])
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
        const response = await helpers.httpRequest(`/astrologer/?page=${currentPage}&limit=10&type=astrologer`, 'GET')

        if (response.status === 'success') {
          setAstrologers(response.data)
          setTotalPages(response.totalPages)
          setTotal(response.total)
        }
      } catch (error) {
        console.error('Error fetching astrologers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currentPage])

  // Update URL and state when page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    navigate(`/astrologers?page=${newPage}`) // Update URL with new page number
  }

  const activeDeactive = async (id, checked) => {
    try {
      setAstrologers((prev) =>
        prev.map((astro) =>
          astro._id === id ? { ...astro, is_active: !astro.is_active } : astro
        )
      );
      const response = await helpers.httpRequest(`/astrologer/active-deactive`, 'POST', { id, status: checked })  
      Notification(response.status, response.message)
    } catch (error) {
      console.error('Error fetching astrologers:', error)
    } finally {
      setLoading(false)
    }
  };


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
                  <h4 className="page-title">Astrologers</h4>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">{process.env.REACT_APP_NAME}</Link></li>
                    <li className="breadcrumb-item">Astrologers</li>
                    <li className="breadcrumb-item active" aria-current="page">{title}</li>
                  </ol>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    {/* <div className="card-header text-uppercase text-primary">All Astrologers</div> */}
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table">
                          <thead className="thead-dark">
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Image</th>
                              <th scope="col">Name</th>
                              <th scope="col">Username</th>
                              <th scope="col">Gender</th>
                              <th scope="col">Mobile</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {astrologers.map((astrologer, index) => (
                              <tr key={astrologer._id}>
                                <th scope="row">{index + 1 + (currentPage - 1) * 10}</th>
                                <td><img alt='Profile Picture' src={`${astrologer.full_profile_pic}`} height='50px' width='50px' /></td>
                                <td>{astrologer.name}</td>
                                <td>{astrologer.username}</td>
                                <td>{helpers.ucFirst(astrologer.gender)}</td>
                                <td>{astrologer.mobile}</td>
                                <td style={{ display: 'flex', justifyContent: 'space-around' }}>
                                  <Link to={'/astrologers/view/' + astrologer._id}>
                                    <button className='btn btn-sm btn-dark'>
                                      <em className='fa fa-eye'></em> View
                                    </button>
                                  </Link>

                                  <Switch
                                    onChange={(checked) => activeDeactive(astrologer._id, checked)}
                                    checked={astrologer.is_active}
                                    checkedIcon={false}
                                    uncheckedIcon={false} />
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
                path='astrologers'
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

export default AllAstrologer
