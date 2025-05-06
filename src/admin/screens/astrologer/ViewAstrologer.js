import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../../includes/footer'
import Header from '../../includes/header'
import Sidebar from '../../includes/sidebar'
import Helpers from '../../../Helpers/Helpers'
import BackToTop from '../../includes/BackToTop'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Notification from '../../../Helpers/Notification'
import ProfileSchema from '../../validation/ProfileSchema'
import Loader from '../../../components/Loader'

const ViewAstrologer = ({ title }) => {
  const { id } = useParams()
  const [user, setUser] = useState({})
  const helpers = Helpers()
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = title
  }, [title])

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  useEffect(() => {
    const getAstrologer = async (id) => {
      try {
        setLoading(true)
        const response = await helpers.httpRequest(`/astrologer/${id}`)
        setLoading(false)
        return response
      } catch (error) {
        setLoading(false)
        console.error('Error fetching astrologer:', error)
      }
    }

    const fetchAstrologer = async () => {
      if (id) {
        const response = await getAstrologer(id)

        if (response.status === 'error') return
        setUser(response.data)
      }
    }

    fetchAstrologer()
  }, [id])

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('mobile', values.mobile)
      formData.append('email', values.email)
      if (selectedFile) {
        formData.append('file', selectedFile)
      }

      const response = await helpers.httpRequest(`/astrologer/update/${id}`, 'PUT', formData, true)
      Notification(response.status, response.message)
      if (response.status === 'error') return
      setUser(response.data)
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <Header />
        {loading && <Loader />}
        <div className="clearfix"></div>
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row pt-2 pb-2">
              <div className="col-sm-9">
                <h4 className="page-title">Astrologer Profile</h4>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/">{process.env.REACT_APP_NAME}</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">{title}</li>
                </ol>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4">
                <div className="card profile-card-2">
                  <div className="card-img-block">
                    <img className="img-fluid" src="/admin/assets/images/gallery/31.jpg" alt="Card image cap" />
                  </div>
                  <div className="card-body pt-5">
                    <img src={user.full_profile_pic ? user.full_profile_pic : `${process.env.REACT_APP_API_URL}/uploads/default-profile_pic.png`} alt="profile-image" className="profile" height="80px" />
                    <h5 className="card-title">{user && user.name}</h5>
                    <p className="card-text">@{user && user.username}</p>
                    <div className="icon-block">
                      <a href="#"><i className="fa fa-facebook bg-facebook text-white"></i></a>
                      <a href="#"> <i className="fa fa-twitter bg-twitter text-white"></i></a>
                      <a href="#"> <i className="fa fa-google-plus bg-google-plus text-white"></i></a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="card">
                  <div className="card-body">
                    <ul className="nav nav-tabs nav-tabs-primary top-icon nav-justified">
                      <li className="nav-item">
                        <a href="#" data-target="#profile" data-toggle="pill" className="nav-link active"><i className="icon-user"></i> <span className="hidden-xs">Profile</span></a>
                      </li>
                    </ul>
                    <div className="tab-content p-3">
                      <div className="tab-pane active" id="profile">
                        <Formik
                          enableReinitialize
                          initialValues={{
                            name: user.name || '',
                            mobile: user.mobile || '',
                            email: user.email || '',
                          }}
                          validationSchema={ProfileSchema}
                          onSubmit={handleSubmit}
                        >
                          {({ isSubmitting }) => (
                            <Form encType="multipart/form-data">
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label">Name</label>
                                <div className="col-lg-9">
                                  <Field
                                    name="name"
                                    className="form-control"
                                    type="text"
                                    placeholder="Name"
                                  />
                                  <ErrorMessage name="name" component="div" className="text-danger" />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label">Mobile</label>
                                <div className="col-lg-9">
                                  <Field
                                    name="mobile"
                                    className="form-control"
                                    type="text"
                                    placeholder="Mobile"
                                    maxLength="10"
                                  />
                                  <ErrorMessage name="mobile" component="div" className="text-danger" />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label">Email</label>
                                <div className="col-lg-9">
                                  <Field
                                    name="email"
                                    className="form-control"
                                    type="email"
                                    placeholder="Email"
                                  />
                                  <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label">Profile Picture</label>
                                <div className="col-lg-9">
                                  <input
                                    accept="image/*"
                                    name="file"
                                    className="form-control"
                                    type="file"
                                    onChange={handleFileChange}
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label className="col-lg-3 col-form-label form-control-label"></label>
                                <div className="col-lg-9">
                                  <input type="submit" className="btn btn-primary" value="Save Changes" disabled={isSubmitting} />
                                </div>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>

                      {/* Other tab panes... */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BackToTop />
        <Footer />
      </div>
    </>
  )
}

export default ViewAstrologer
