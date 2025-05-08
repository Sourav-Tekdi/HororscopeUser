import { useNavigate, useParams } from "react-router-dom"
import Helpers from "../../Helpers/Helpers"
import { useEffect, useState } from "react"
import Notification from '../../Helpers/Notification'
import moment from "moment"
import Faq from "../../components/Faq"
import Breadcrum from "../../components/Breadcrum"


const BlogViewComponent = ({ title }) => {

    const { id } = useParams() // Get product ID from the URL
    const helpers = Helpers()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [post, setBlog] = useState(null) // Store the product data

    useEffect(() => {
        // Fetch product details for pre-populating the form
        const fetchData = async () => {
            try {
                const response = await helpers.httpRequest(`/posts/${id}`, 'GET')
                console.log(response);

                if (response.statusCode === 200) {
                    setBlog(response)
                } else {
                    Notification('error', 'Error fetching product data')
                    navigate('/notfound')
                }
            } catch (error) {
                console.error('Error fetching:', error)
                Notification('error', 'Error fetching data')
            }
        }

        // Show loader until both product and categories are fetched
        Promise.all([fetchData()]).finally(() => setLoading(false))
    }, [id])
    return (
        <>

            <Breadcrum title={title} />

            <section className="as_blog_wrapper as_padderBottom90 as_padderTop80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                            <div className="as_shop_sidebar">
                                <Faq />
                            </div>
                        </div>

                        <div className="col-lg-9 col-md-8 col-sm-12 col-xs-12">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body text-center">
                                            {post ? (
                                                <div className="post-details-container">
                                                    <div className="post-header">
                                                        <div className="post-image" style={{ float: 'left', marginRight: '20px' }}>
                                                            {post.image && (
                                                                <img
                                                                    src={post.full_image}
                                                                    alt={post.title}
                                                                    style={{ width: '290px', borderRadius: '8px' }}
                                                                />
                                                            )}
                                                        </div>

                                                        <div className="post-title" style={{ marginTop: '20px' }}>
                                                            <h2>{post.title}</h2>
                                                        </div>
                                                        <span className="as_btn">
                                                            {moment(post?.created_at).format("MMM DD, YYYY")}
                                                        </span>
                                                    </div>

                                                    <div className="post-description" style={{ marginTop: '20px', textAlign: 'justify' }}>
                                                        <p>{post.description}</p>
                                                    </div>

                                                    <div className="post-footer" style={{ marginTop: '40px', textAlign: 'left' }}>
                                                        <strong>Content Creator:</strong>
                                                        <p style={{ fontStyle: 'italic', fontSize: '16px' }}>{post?.userId?.name}</p>
                                                    </div>
                                                    <div className="form-footer text-center mt-3">
                                                        <a href="/" className="btn btn-outline-success btn-sm">
                                                            <i className="fa fa-arrow-left me-2"></i>BACK
                                                        </a>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p>No post data available.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default BlogViewComponent
