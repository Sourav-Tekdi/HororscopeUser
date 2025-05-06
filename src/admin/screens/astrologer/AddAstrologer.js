import * as Yup from 'yup'
import React, { useEffect } from 'react'
import Footer from '../../includes/footer'
import Header from '../../includes/header'
import Sidebar from '../../includes/sidebar'
import Helpers from '../../../Helpers/Helpers'
import BackToTop from '../../includes/BackToTop'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Notification from '../../../Helpers/Notification'
import AstrologerSchema from '../../validation/AstrologerSchema'

const AddAstrologer = ({ title }) => {
  const helpers = Helpers()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = title
  }, [title])

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)

    const { confirmPassword, ...data } = values

    try {
      const response = await helpers.httpRequest('/astrologer/create', 'POST', data)
      Notification(response.status, response.message)
      if (response.status === 'success') {
        resetForm()
        navigate('/astrologers')
      }
    } catch (error) {
      Notification('error', 'An error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <Header />
        <div className="clearfix"></div>
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row pt-2 pb-2">
              <div className="col-sm-9">
                <h4 className="page-title">{title}</h4>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/">{process.env.REACT_APP_NAME}</Link></li>
                  <li className="breadcrumb-item">Astrologers</li>
                  <li className="breadcrumb-item active" aria-current="page">{title}</li>
                </ol>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <Formik
                      initialValues={{
                        name: '',
                        username: '',
                        mobile: '',
                        email: '',
                        gender: '',
                        password: '',
                        confirmPassword: '',
                      }}
                      validationSchema={AstrologerSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form id="astrologerAddForm">
                        <h4 className="form-header text-uppercase">
                          <i className="fa fa-address-book-o"></i> Astrologer Profile
                        </h4>
                        
                        {/* Name */}
                        <div className="form-group row">
                          <div className="col-sm-6">
                            <label htmlFor="name" className="col-form-label">Name</label>
                            <Field type="text" className="form-control" id="name" name="name" placeholder='Name' />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                          </div>
                          <div className="col-sm-6">
                            <label htmlFor="username" className="col-form-label">Username</label>
                            <Field type="text" className="form-control" id="username" name="username" placeholder='Username' />
                            <ErrorMessage name="username" component="div" className="text-danger" />
                          </div>
                        </div>
                      
                        <h4 className="form-header text-uppercase">
                          <i className="fa fa-envelope-o"></i> Contact Info & Security
                        </h4>
                      
                        {/* Mobile and Email */}
                        <div className="form-group row">
                          <div className="col-sm-6">
                            <label htmlFor="mobile" className="col-form-label">Mobile</label>
                            <Field type="text" className="form-control" id="mobile" name="mobile" maxLength={10} placeholder='Mobile' />
                            <ErrorMessage name="mobile" component="div" className="text-danger" />
                          </div>
                          <div className="col-sm-6">
                            <label htmlFor="email" className="col-form-label">E-mail</label>
                            <Field type="email" className="form-control" id="email" name="email" placeholder='Email address' />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                          </div>
                        </div>
                      
                        {/* Gender */}
                        <div className="form-group row">
                          <div className="col-sm-12">
                            <label htmlFor="gender" className="col-form-label">Gender</label>
                            <Field as="select" name="gender" className="form-control" id="gender">
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </Field>
                            <ErrorMessage name="gender" component="div" className="text-danger" />
                          </div>
                        </div>
                      
                        {/* Password and Confirm Password */}
                        <div className="form-group row">
                          <div className="col-sm-6">
                            <label htmlFor="password" className="col-form-label">Password</label>
                            <Field type="password" className="form-control" id="password" name="password" placeholder='Password' />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                          </div>
                          <div className="col-sm-6">
                            <label htmlFor="confirmPassword" className="col-form-label">Confirm Password</label>
                            <Field type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder='Confirm Password' />
                            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                          </div>
                        </div>
                      
                        <div className="form-footer">
                          <button type="button" className="btn btn-danger" onClick={() => navigate('/')}>
                            <i className="fa fa-times"></i> CANCEL
                          </button>
                          <button
                            type="submit"
                            className="btn btn-success"
                            disabled={isSubmitting}
                            style={{ marginLeft: '5px' }}
                          >
                            <i className="fa fa-check-square-o"></i> SAVE
                          </button>
                        </div>
                      </Form>
                      
                      )}
                    </Formik>
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

export default AddAstrologer
