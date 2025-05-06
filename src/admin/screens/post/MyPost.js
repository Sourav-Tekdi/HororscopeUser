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
import { useProfile } from '../../context/ProfileContext'

const MyPost = ({ title }) => {
    const helpers = Helpers()
    const navigate = useNavigate()
    const { search } = useLocation()
    const params = new URLSearchParams(search)
    const pageFromUrl = parseInt(params.get('page'), 10) || 1

    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(pageFromUrl)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const userProfile = useProfile()


    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                // if(userProfile?.userInfo?.type === ''){

                // }
                const response = await helpers.httpRequest(`/posts/?page=${currentPage}&limit=10&userId=${userProfile?.userInfo?.id}`, 'GET')

                if (response.status === 'success') {
                    setPosts(response.data)
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
                    const response = await helpers.httpRequest(`/posts/delete/${id}`, 'DELETE')

                    Swal.fire(helpers.ucFirst(response.status), response.message, response.status === 'success' ? 'success' : 'error')

                    if (response.status === 'success') {
                        // Remove the contact where _id equals id
                        setPosts((prevPost) => prevPost.filter(post => post._id !== id))
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
                                    <h4 className="page-title">Posts</h4>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">{process.env.REACT_APP_NAME}</Link></li>
                                        <li className="breadcrumb-item">Posts</li>
                                        <li className="breadcrumb-item active" aria-current="page">{title}</li>
                                    </ol>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        {/* <div className="card-header text-uppercase text-primary">All posts</div> */}
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Image</th>
                                                            <th scope="col">Title</th>
                                                            <th scope="col">Description</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {posts.map((post, index) => (
                                                            <tr key={post._id}>
                                                                <th scope="row">{index + 1 + (currentPage - 1) * 10}</th>
                                                                <td><img alt='Post Image' src={`${post.full_image}`} height='50px' width='50px' /></td>
                                                                <td>{helpers.truncateText(post.title, 5)}</td>
                                                                <td>{helpers.truncateText(post.description, 5)}</td>

                                                                <td>
                                                                    <Link to={'/post/view/' + post._id}>
                                                                        <button className='btn btn-sm btn-success'>
                                                                            <em className='fa fa-eye'></em> View
                                                                        </button>
                                                                    </Link>
                                                                    <Link to={'/post/update/' + post._id}>
                                                                        <button style={{ marginLeft: '5px' }} className='btn btn-sm btn-dark'>
                                                                            <em className='fa fa-edit'></em> Edit
                                                                        </button>
                                                                    </Link>
                                                                    <button style={{ marginLeft: '5px' }} onClick={() => handleDelete(post._id)} className='btn btn-sm btn-danger'>
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
                                path='post'
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

export default MyPost
