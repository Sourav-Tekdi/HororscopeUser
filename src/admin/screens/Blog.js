import React, { useEffect } from 'react'
import Header from './includes/Header.js'
import Footer from './includes/Footer.js'
import BlogComponent from './screenComponent/BlogComponent'

const Blog = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [])

    return (
        <>
            <div className="as_main_wrapper">
                <Header />
                <BlogComponent title={title}/>
                <Footer />
            </div>
        </>
    )
}

export default Blog
