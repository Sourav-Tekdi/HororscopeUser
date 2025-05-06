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
import CategorySchema from '../../validation/CategorySchema'


const AddCategory = ({ title }) => {
  const helpers = Helpers()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = title
  }, [title])

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)

    try {
      const response = await helpers.httpRequest('/category/create', 'POST', values)
      Notification(response.status, response.message)
      if (response.status === 'success') {
        resetForm()
        navigate('/category')
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
                  <li className="breadcrumb-item">Categories</li>
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
                        description: '',
                      }}
                      validationSchema={CategorySchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form id="signupForm">
                          <h4 className="form-header text-uppercase">
                            <i className="fa fa-address-book-o"></i> Add Category
                          </h4>
                          <div className="form-group row">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-12">
                              <Field type="text" className="form-control" id="name" name="name" placeholder='Name' />
                              <ErrorMessage name="name" component="div" className="text-danger" />
                            </div>
                            <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                            <div className="col-sm-12">
                              <Field as="textarea" type="text" className="form-control" rows="4" id="description" name="description" placeholder='Description' />
                              <ErrorMessage name="description" component="div" className="text-danger" />
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

export default AddCategory
