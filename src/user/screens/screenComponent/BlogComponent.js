import { useEffect, useState } from "react"
import Helpers from "../../../Helpers/Helpers"
import BlogCard from "../../components/card/BlogCard.js"
import { useLocation, useNavigate } from "react-router-dom"
import Pagination from "../../components/Pagination"
import Breadcrum from "../../components/Breadcrum.js"

const BlogComponent = ({ title }) => {
    const helpers = Helpers()
    const navigate = useNavigate()
    const { search } = useLocation()
    const params = new URLSearchParams(search)
    const pageFromUrl = parseInt(params.get('page'), 10) || 1

    const [blogs, setBlogs] = useState([])
    const [currentPage, setCurrentPage] = useState(pageFromUrl)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await helpers.httpRequest(`/posts/?page=${currentPage}&limit=10`, 'GET')

                if (response.status === 'success') {
                    setBlogs(response.data)
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
        navigate(`/blogs?page=${newPage}`) // Update URL with new page number
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
            <Breadcrum title={title} url='/' />
            <section className="as_shop_wrapper as_padderBottom90 as_padderTop80">
                <div className="container">
                    <div className="row">

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

                                {blogs.map((blog) => (
                                    <BlogCard key={blog.id} blog={blog} />
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
                                path='blogs'
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BlogComponent
