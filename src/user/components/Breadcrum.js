import React from 'react'

const Breadcrum = ({ title , url = '/' }) => {

    return (
        <>
            <section className="as_breadcrum_wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            
                            <div>{title === "Shop" ? <img alt="" className="titleImage" src="/assets/images/Antara_page-removebg.png" /> : <h1>{title}</h1>}</div>
                            
                            <ul className="breadcrumb">
                                <li>
                                    <a href={url}>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    {title}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Breadcrum
