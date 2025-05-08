import React from 'react'
import moment from "moment"
import { Link } from 'react-router-dom'
import Helpers from '../../../Helpers/Helpers'

const BlogCard = ({ blog }) => {
    const helpers = Helpers()
    return (
        <>
            <div className="col-lg-12 col-md-8 col-sm-12 col-xs-12">
                <div className="as_blog_box">
                    <div className="as_blog_img">
                        <Link to={`/blogs/view/${blog?.id}`}>
                            <img alt="" className="img-responsive" style={{ width: '290px', borderRadius: '8px', margin:'20px' }} src={blog?.full_image} />
                        </Link>
                        <span className="as_btn">
                            {moment(blog?.created_at).format("MMM DD, YYYY")}
                        </span>
                    </div>
                    <div className="as_blog_detail">
                        <ul>
                            <li>
                                <a href="">
                                    <img alt="" src="/assets/images/svg/user2.svg" />
                                    By - {blog?.userId?.name}
                                </a>
                            </li>
                        </ul>
                        <h4 className="as_subheading">
                            <Link to={`/blogs/view/${blog?.id}`}>
                                {blog?.title}
                            </Link>
                        </h4>
                        <p className="as_font14 as_margin0">
                            {helpers.truncateText(blog?.description, 20)}
                        </p>
                        <div className="as_padderTop30">
                            <Link className="as_btn" to={`/blogs/view/${blog?.id}`}>
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogCard
