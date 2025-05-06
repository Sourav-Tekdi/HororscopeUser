import React, { useEffect, useState } from 'react'
import Sidebar from '../includes/sidebar'
import Header from '../includes/header'
import Footer from '../includes/footer';
import BackToTop from '../includes/BackToTop';
import { Link, useNavigate } from 'react-router-dom';
import Helpers from '../../Helpers/Helpers';
import ContentLoader from "react-content-loader";

const Dashboard = ({ title }) => {
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState({ astrologer: null, category: null, product: null, posts: null })
  const helpers = Helpers()
  const navigate = useNavigate()


  useEffect(() => {
    document.title = title;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await helpers.httpRequest(`/dashboard/`)

        if (response.status === 'success') {
          setCount(response.data)
        }
      } catch (error) {
        console.error('Error fetching:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <Header />
        <div className="clearfix" />
        <div className="content-wrapper">
          <div className="container-fluid">
            {/*Start Dashboard Content*/}
            <div className="row mt-3">
              <div className="col-12 col-lg-6 col-xl-3">
                <Link to='/astrologers'>
                  <div className="card gradient-bloody">
                    <div className="card-body">
                      <div className="media align-items-center">
                        <div className="media-body">
                          {
                            !count.astrologer ? (
                              <ContentLoader
                                speed={2}
                                width={150}
                                height={50}
                                viewBox="0 0 150 50"
                                backgroundColor="#ecebeb"
                                foregroundColor="#d6d2d2"
                              >
                                <rect x="0" y="10" rx="4" ry="4" width="100" height="15" />
                                <rect x="0" y="30" rx="4" ry="4" width="50" height="20" />
                              </ContentLoader>
                            ) : (
                              <>
                                <p className="text-white">Total Astrologers</p>
                                <h4 className="text-white line-height-5">{count.astrologer}</h4>
                              </>
                            )
                          }
                        </div>
                        <div className="w-circle-icon rounded-circle border border-white">
                          <i className="fa fa-users text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-12 col-lg-6 col-xl-3">
                <Link to='/category'>
                  <div className="card gradient-scooter">
                    <div className="card-body">
                      <div className="media align-items-center">
                        <div className="media-body">
                          {
                            !count.category ? (
                              <ContentLoader
                                speed={2}
                                width={150}
                                height={50}
                                viewBox="0 0 150 50"
                                backgroundColor="#ecebeb"
                                foregroundColor="#d6d2d2"
                              >
                                <rect x="0" y="10" rx="4" ry="4" width="100" height="15" />
                                <rect x="0" y="30" rx="4" ry="4" width="50" height="20" />
                              </ContentLoader>
                            ) : (
                              <>
                                <p className="text-white">Total Categories</p>
                                <h4 className="text-white line-height-5">{count.category}</h4>
                              </>
                            )
                          }
                        </div>
                        <div className="w-circle-icon rounded-circle border border-white">
                          <i className="fa fa-cart-fa fa-list-alt text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-12 col-lg-6 col-xl-3">
                <Link to='/products'>
                  <div className="card gradient-blooker">
                    <div className="card-body">
                      <div className="media align-items-center">
                        <div className="media-body">
                          
                          {
                            !count.product ? (
                              <ContentLoader
                                speed={2}
                                width={150}
                                height={50}
                                viewBox="0 0 150 50"
                                backgroundColor="#ecebeb"
                                foregroundColor="#d6d2d2"
                              >
                                <rect x="0" y="10" rx="4" ry="4" width="100" height="15" />
                                <rect x="0" y="30" rx="4" ry="4" width="50" height="20" />
                              </ContentLoader>
                            ) : (
                              <>
                                <p className="text-white">Total Prducts</p>
                                <h4 className="text-white line-height-5">{count.product}</h4>
                              </>
                            )
                          }
                        </div>
                        <div className="w-circle-icon rounded-circle border border-white">
                          <i className="fa fa-cart-plus text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-12 col-lg-6 col-xl-3">
                <Link to='/post'>
                  <div className="card gradient-ohhappiness">
                    <div className="card-body">
                      <div className="media align-items-center">
                        <div className="media-body">
                          {
                            !count.posts ? (
                              <ContentLoader
                                speed={2}
                                width={150}
                                height={50}
                                viewBox="0 0 150 50"
                                backgroundColor="#ecebeb"
                                foregroundColor="#d6d2d2"
                              >
                                <rect x="0" y="10" rx="4" ry="4" width="100" height="15" />
                                <rect x="0" y="30" rx="4" ry="4" width="50" height="20" />
                              </ContentLoader>
                            ) : (
                              <>
                                <p className="text-white">Total Posts</p>
                                <h4 className="text-white line-height-5">{count.posts}</h4>
                              </>
                            )
                          }
                        </div>
                        <div className="w-circle-icon rounded-circle border border-white">
                          <i className="fa fa-globe text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            {/*End Row*/}
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="card">
                  <div className="card-header">
                    Last 7 Days Report
                    <div className="card-action">
                      <div className="dropdown">
                        <a
                          href="#"
                          className="dropdown-toggle dropdown-toggle-nocaret"
                          data-toggle="dropdown"
                        >
                          <i className="icon-options" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#">
                            Action
                          </a>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                          <div className="dropdown-divider" />
                          <a className="dropdown-item" href="#">
                            Separated link
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <canvas id="dashboard-chart-1" />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="card">
                  <div className="card-header">
                    Most Selling Items
                    <div className="card-action">
                      <div className="dropdown">
                        <a
                          href="#"
                          className="dropdown-toggle dropdown-toggle-nocaret"
                          data-toggle="dropdown"
                        >
                          <i className="icon-options" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#">
                            Action
                          </a>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                          <div className="dropdown-divider" />
                          <a className="dropdown-item" href="#">
                            Separated link
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <canvas id="dashboard-chart-2" />
                  </div>
                </div>
              </div>
            </div>
            {/*End Row*/}
            <div className="row">
              <div className="col-12 col-lg-12 col-xl-12">
                <div className="card">
                  <div className="card-header">
                    <i className="fa fa-area-chart" /> Sales Report
                    <div className="card-action">
                      <div className="form-group mb-0">
                        {/* <select defaultValue='Jan 18' value='Jan 18' className="form-control form-control-sm">
                              <option>Jan 18</option>
                              <option>Feb 18</option>
                              <option>Mar 18</option>
                              <option>Apr 18</option>
                              <option>May 18</option>
                              <option>Jun 18</option>
                              <option>Jul 18</option>
                              <option>Aug 18</option>
                              <option selected="">Sept 18</option>
                            </select> */}
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <canvas id="dashboard-chart-3" height={100} />
                  </div>
                </div>
              </div>
            </div>
            {/*End Row*/}
            <div className="row">
              <div className="col-12 col-lg-6 col-xl-8">
                <div className="card">
                  <div className="card-header border-0">
                    New Customer List
                    <div className="card-action">
                      <div className="dropdown">
                        <a
                          href="#"
                          className="dropdown-toggle dropdown-toggle-nocaret"
                          data-toggle="dropdown"
                        >
                          <i className="icon-options" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#">
                            Action
                          </a>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                          <div className="dropdown-divider" />
                          <a className="dropdown-item" href="#">
                            Separated link
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-items-center table-flush">
                      <thead>
                        <tr>
                          <th>Photo</th>
                          <th>Name</th>
                          <th>Username</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <img
                              src="/admin/assets/images/avatars/avatar-1.png"
                              className="rounded-circle customer-img"
                              alt="user avatar"
                            />
                          </td>
                          <td>Selina Jccoy</td>
                          <td>@selina</td>
                          <td>xyz@example.com</td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="/admin/assets/images/avatars/avatar-2.png"
                              className="rounded-circle customer-img"
                              alt="user avatar"
                            />
                          </td>
                          <td>Michle jhon</td>
                          <td>@Michle</td>
                          <td>xyz@example.com</td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="/admin/assets/images/avatars/avatar-3.png"
                              className="rounded-circle customer-img"
                              alt="user avatar"
                            />
                          </td>
                          <td>Jhon Deo</td>
                          <td>@deojhon</td>
                          <td>xyz@example.com</td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="/admin/assets/images/avatars/avatar-4.png"
                              className="rounded-circle customer-img"
                              alt="user avatar"
                            />
                          </td>
                          <td>Selina Jccoy</td>
                          <td>@selina</td>
                          <td>xyz@example.com</td>
                        </tr>
                        <tr>
                          <td>
                            <img
                              src="/admin/assets/images/avatars/avatar-5.png"
                              className="rounded-circle customer-img"
                              alt="user avatar"
                            />
                          </td>
                          <td>Katrin jade</td>
                          <td>@Katrin</td>
                          <td>xyz@example.com</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 col-xl-4">
                <div className="card">
                  <div className="card-header">Social Traffic</div>
                  <div className="card-body">
                    <div className="media align-items-center">
                      <div>
                        <i className="fa fa-facebook-square fa-2x text-facebook" />
                      </div>
                      <div className="media-body text-left ml-3">
                        <div className="progress-wrapper">
                          <p>
                            Facebook <span className="float-right">65%</span>
                          </p>
                          <div className="progress" style={{ height: 7 }}>
                            <div
                              className="progress-bar bg-facebook"
                              style={{ width: "65%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="media align-items-center">
                      <div>
                        <i className="fa fa-twitter fa-2x text-twitter" />
                      </div>
                      <div className="media-body text-left ml-3">
                        <div className="progress-wrapper">
                          <p>
                            Twitter <span className="float-right">50%</span>
                          </p>
                          <div className="progress" style={{ height: 7 }}>
                            <div
                              className="progress-bar bg-twitter"
                              style={{ width: "50%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="media align-items-center">
                      <div>
                        <i className="fa fa-dribbble fa-2x text-dribbble" />
                      </div>
                      <div className="media-body text-left ml-3">
                        <div className="progress-wrapper">
                          <p>
                            Dribble <span className="float-right">70%</span>
                          </p>
                          <div className="progress" style={{ height: 7 }}>
                            <div
                              className="progress-bar bg-dribbble"
                              style={{ width: "70%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="media align-items-center">
                      <div>
                        <i className="fa fa-linkedin-square fa-2x text-linkedin" />
                      </div>
                      <div className="media-body text-left ml-3">
                        <div className="progress-wrapper">
                          <p>
                            Linkedin <span className="float-right">35%</span>
                          </p>
                          <div className="progress" style={{ height: 7 }}>
                            <div
                              className="progress-bar bg-linkedin"
                              style={{ width: "35%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="media align-items-center">
                      <div>
                        <i className="fa fa-youtube-square fa-2x text-youtube" />
                      </div>
                      <div className="media-body text-left ml-3">
                        <div className="progress-wrapper">
                          <p>
                            Youtube <span className="float-right">5%</span>
                          </p>
                          <div className="progress" style={{ height: 7 }}>
                            <div
                              className="progress-bar bg-youtube"
                              style={{ width: "25%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*End Row*/}
            <div className="card">
              <div className="card-content">
                <div className="row row-group m-0 text-center">
                  <div className="col-12 col-lg-3 col-xl-3">
                    <div className="card-body">
                      <span
                        className="donut"
                        data-peity='{ "fill": ["#5e72e4", "#f2f2f2"], "innerRadius": 45, "radius": 32 }'
                      >
                        4/5
                      </span>
                      <hr />
                      <h6 className="mb-0">Total Viwes : 4521</h6>
                    </div>
                  </div>
                  <div className="col-12 col-lg-3 col-xl-3">
                    <div className="card-body">
                      <span
                        className="donut"
                        data-peity='{ "fill": ["#ff2fa0", "#f2f2f2"], "innerRadius": 45, "radius": 32 }'
                      >
                        2/5
                      </span>
                      <hr />
                      <h6 className="mb-0">Page Click : 4521</h6>
                    </div>
                  </div>
                  <div className="col-12 col-lg-3 col-xl-3">
                    <div className="card-body">
                      <span
                        className="donut"
                        data-peity='{ "fill": ["#2dce89", "#f2f2f2"], "innerRadius": 45, "radius": 32 }'
                      >
                        3/5
                      </span>
                      <hr />
                      <h6 className="mb-0">Server Load : 4521</h6>
                    </div>
                  </div>
                  <div className="col-12 col-lg-3 col-xl-3">
                    <div className="card-body">
                      <span
                        className="donut"
                        data-peity='{ "fill": ["#172b4d", "#f2f2f2"], "innerRadius": 45, "radius": 32 }'
                      >
                        2/5
                      </span>
                      <hr />
                      <h6 className="mb-0">Used RAM : 4521</h6>
                    </div>
                  </div>
                </div>
                {/*End Row*/}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header border-0">
                    Recent Orders Table
                    <div className="card-action">
                      <div className="dropdown">
                        <a
                          href="#"
                          className="dropdown-toggle dropdown-toggle-nocaret"
                          data-toggle="dropdown"
                        >
                          <i className="icon-options" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#">
                            Action
                          </a>
                          <a className="dropdown-item" href="#">
                            Another action
                          </a>
                          <a className="dropdown-item" href="#">
                            Something else here
                          </a>
                          <div className="dropdown-divider" />
                          <a className="dropdown-item" href="#">
                            Separated link
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-items-center table-flush">
                      <thead>
                        <tr>
                          <th>Action</th>
                          <th>Product</th>
                          <th>Photo</th>
                          <th>Product ID</th>
                          <th>Status</th>
                          <th>Amount</th>
                          <th>Completion</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="icheck-material-primary">
                              <input type="checkbox" id="check1" />
                              <label htmlFor="check1" />
                            </div>
                          </td>
                          <td>Iphone 5</td>
                          <td>
                            <img
                              src="/admin/assets/images/products/01.png"
                              className="product-img"
                              alt="product img"
                            />
                          </td>
                          <td>#9405822</td>
                          <td>
                            <span className="btn btn-sm btn-outline-success btn-round btn-block">
                              Paid
                            </span>
                          </td>
                          <td>$ 1250.00</td>
                          <td>
                            <div className="progress shadow" style={{ height: 4 }}>
                              <div
                                className="progress-bar gradient-ohhappiness"
                                role="progressbar"
                                style={{ width: "100%" }}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-material-primary">
                              <input type="checkbox" id="check2" />
                              <label htmlFor="check2" />
                            </div>
                          </td>
                          <td>Earphone GL</td>
                          <td>
                            <img
                              src="/admin/assets/images/products/02.png"
                              className="product-img"
                              alt="product img"
                            />
                          </td>
                          <td>#9405820</td>
                          <td>
                            <span className="btn btn-sm btn-outline-info btn-round btn-block">
                              Pending
                            </span>
                          </td>
                          <td>$ 1500.00</td>
                          <td>
                            <div className="progress shadow" style={{ height: 4 }}>
                              <div
                                className="progress-bar gradient-scooter"
                                role="progressbar"
                                style={{ width: "80%" }}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-material-primary">
                              <input type="checkbox" id="check3" />
                              <label htmlFor="check3" />
                            </div>
                          </td>
                          <td>HD Hand Camera</td>
                          <td>
                            <img
                              src="/admin/assets/images/products/03.png"
                              className="product-img"
                              alt="product img"
                            />
                          </td>
                          <td>#9405830</td>
                          <td>
                            <span className="btn btn-sm btn-outline-danger btn-round btn-block">
                              Failed
                            </span>
                          </td>
                          <td>$ 1400.00</td>
                          <td>
                            <div className="progress shadow" style={{ height: 4 }}>
                              <div
                                className="progress-bar gradient-ibiza"
                                role="progressbar"
                                style={{ width: "60%" }}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-material-primary">
                              <input type="checkbox" id="check4" />
                              <label htmlFor="check4" />
                            </div>
                          </td>
                          <td>Clasic Shoes</td>
                          <td>
                            <img
                              src="/admin/assets/images/products/04.png"
                              className="product-img"
                              alt="product img"
                            />
                          </td>
                          <td>#9405825</td>
                          <td>
                            <span className="btn btn-sm btn-outline-success btn-round btn-block">
                              Paid
                            </span>
                          </td>
                          <td>$ 1200.00</td>
                          <td>
                            <div className="progress shadow" style={{ height: 4 }}>
                              <div
                                className="progress-bar gradient-ohhappiness"
                                role="progressbar"
                                style={{ width: "100%" }}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-material-primary">
                              <input type="checkbox" id="check5" />
                              <label htmlFor="check5" />
                            </div>
                          </td>
                          <td>Hand Watch</td>
                          <td>
                            <img
                              src="/admin/assets/images/products/05.png"
                              className="product-img"
                              alt="product img"
                            />
                          </td>
                          <td>#9405840</td>
                          <td>
                            <span className="btn btn-sm btn-outline-danger btn-round btn-block">
                              Failed
                            </span>
                          </td>
                          <td>$ 1800.00</td>
                          <td>
                            <div className="progress shadow" style={{ height: 4 }}>
                              <div
                                className="progress-bar gradient-ibiza"
                                role="progressbar"
                                style={{ width: "75%" }}
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="icheck-material-primary">
                              <input type="checkbox" id="check6" />
                              <label htmlFor="check6" />
                            </div>
                          </td>
                          <td>HD Hand Camera</td>
                          <td>
                            <img
                              src="/admin/assets/images/products/03.png"
                              className="product-img"
                              alt="product img"
                            />
                          </td>
                          <td>#9405830</td>
                          <td>
                            <span className="btn btn-sm btn-outline-info btn-round btn-block">
                              Pending
                            </span>
                          </td>
                          <td>$ 1400.00</td>
                          <td>
                            <div className="progress shadow" style={{ height: 4 }}>
                              <div
                                className="progress-bar gradient-scooter"
                                role="progressbar"
                                style={{ width: "70%" }}
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/*End Row*/}
            {/*End Dashboard Content*/}
          </div>
          {/* End container-fluid*/}
        </div>
        <BackToTop />

        <Footer />
      </div>
    </>

  )
}

export default Dashboard
