import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import Footer from '../../includes/footer'
import Header from '../../includes/header'
import Sidebar from '../../includes/sidebar'
import Helpers from '../../../Helpers/Helpers'
import BackToTop from '../../includes/BackToTop'
import Pagination from '../../../components/Pagination'
import Loader from '../../../components/Loader'
import Swal from 'sweetalert2'

const AllContact = ({ title }) => {
  const helpers = Helpers()
  const navigate = useNavigate()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const pageFromUrl = parseInt(params.get('page'), 10) || 1

  const [contacts, setContacts] = useState([])
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
        const response = await helpers.httpRequest(`/contact-us/?page=${currentPage}&limit=10`, 'GET')

        if (response.status === 'success') {
          setContacts(response.data)
          setTotalPages(response.totalPages)
          setTotal(response.total)
        }
      } catch (error) {
        console.error('Error fetching:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currentPage])

  // Update URL and state when page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    navigate(`/post?page=${newPage}`) // Update URL with new page number
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await helpers.httpRequest(`/contact-us/delete/${id}`, 'DELETE')

          Swal.fire(helpers.ucFirst(response.status), response.message, response.status === 'success' ? 'success' : 'error')

          if (response.status === 'success') {
            // Remove the contact where _id equals id
            setContacts((prevContacts) => prevContacts.filter(contact => contact._id !== id))
          }
        } catch (error) {
          console.error('Error deleting:', error)
          Swal.fire('Error!', 'Failed to delete the item.', 'error')
        }
      }
    })
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
                  <h4 className="page-title">Contact</h4>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">{process.env.REACT_APP_NAME}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{title}</li>
                  </ol>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    {/* <div className="card-header text-uppercase text-primary">All contacts</div> */}
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table">
                          <thead className="thead-dark">
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Mobile</th>
                              <th scope="col">Subject</th>
                              <th scope="col">Message</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contacts.map((contact, index) => (
                              <tr key={contact._id}>
                                <th scope="row">{index + 1 + (currentPage - 1) * 10}</th>
                                <td>{helpers.truncateText(contact.name, 5)}</td>
                                <td>{helpers.truncateText(contact.email, 5)}</td>
                                <td>{contact.mobile}</td>
                                <td>{contact.subject}</td>
                                <td>{contact.message}</td>

                                <td>
                                  <button onClick={() => handleDelete(contact._id)} className='btn btn-sm btn-danger'>
                                    <em className='fa fa-trash'></em>
                                  </button>
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
                path='faq'
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

export default AllContact
