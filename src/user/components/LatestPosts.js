import React, { useEffect, useState } from 'react'
import Helpers from '../../Helpers/Helpers'
import { Link } from 'react-router-dom'
import moment from "moment"

const LatestPosts = () => {
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const helpers = Helpers()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await helpers.httpRequest(`/posts/?page=1&limit=4`, 'GET')

                if (response.status === 'success') {
                    setPosts(response.data)
                }
            } catch (error) {
                console.error('Error fetching Posts:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])
    return (
        <section className="as_blog_wrapper as_padderTop80 as_padderBottom80">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 text-center">
                        <h1 className="as_heading">
                            Latest Articles
                        </h1>
                        <p className="as_font14 as_padderTop20 as_padderBottom10">
                            It is a long established fact that a reader will be distracted by the readable content of a page
                            <br />
                            when looking at its layout. The point of using Lorem Ipsum .
                        </p>
                        <div className="v3_blog_wrapper">
                            <div className="row text-left">
                                {
                                    posts.map((post) => (
                                        <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={post.id}>
                                            <div className="as_blog_box">
                                                <div className="as_blog_img">
                                                    <Link to={`/blogs/view/${post?.id}`}>
                                                        <img alt="Post image" className="img-responsive" src={post?.full_image} />
                                                    </Link>
                                                    <span className="as_btn">
                                                        {moment(post?.created_at).format("MMM DD, YYYY")}
                                                    </span>
                                                </div>
                                                <div className="as_blog_detail">
                                                    <ul>
                                                        <li>
                                                            <a href="">
                                                                <img alt="" src="/assets/images/svg/user2.svg" />
                                                                By - {post?.userId?.name}
                                                            </a>
                                                        </li>
                                                        {/* <li>
                                                            <a href="">
                                                                <img alt="" src="assets/images/svg/comment1.svg" />
                                                                0 comments
                                                            </a>
                                                        </li> */}
                                                    </ul>
                                                    <h4 className="as_subheading">
                                                        <Link to={`/blogs/view/${post?.id}`}>
                                                            {post?.title}
                                                        </Link>
                                                    </h4>
                                                    <p className="as_font14 as_margin0">
                                                        {helpers.truncateText(post?.description, 20)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }



                            </div>
                        </div>
                        <div className="text-center as_padderTop60">
                            <Link className="as_btn" to="blogs">
                                view more
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LatestPosts
