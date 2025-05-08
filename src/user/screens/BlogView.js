import React, { useEffect } from 'react'
import Header from './includes/Header'
import Footer from './includes/Footer'
import BlogViewComponent from './screenComponent/BlogViewComponent'

const BlogView = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [])
    return (
        <>

            <div className="as_main_wrapper">
                <Header />
                <BlogViewComponent title={title} />
                <Footer />
            </div>
        </>
    )
}

export default BlogView
