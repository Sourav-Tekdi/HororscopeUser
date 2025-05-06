import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../../includes/footer'
import Header from '../../includes/header'
import Sidebar from '../../includes/sidebar'
import Helpers from '../../../Helpers/Helpers'
import BackToTop from '../../includes/BackToTop'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Notification from '../../../Helpers/Notification'
import Loader from '../../../components/Loader'
import CategorySchema from '../../validation/CategorySchema'

const ViewCategory = ({ title }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [category, setCategory] = useState({})
  const helpers = Helpers()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    const getCategory = async (id) => {
      try {
        setLoading(true)
        const response = await helpers.httpRequest(`/category/${id}`)
        setLoading(false)
        return response
      } catch (error) {
        setLoading(false)
        console.error('Error fetching category:', error)
      }
    }

    const fetchCategory = async () => {
      if (id) {
        const response = await getCategory(id)

        if (response.status === 'error') return
        setCategory(response)
      }
    }

    fetchCategory()
  }, [id])

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('description', values.description)

      const response = await helpers.httpRequest(`/category/update/${id}`, 'PUT', formData, true)
      Notification(response.status, response.message)
      if (response.status === 'error') return
      navigate('/category')
      setCategory(response.data)
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
                      enableReinitialize
                      initialValues={{
                        name: category.name || '',
                        description: category.description || '',
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
                            <button type="button" className="btn btn-danger" onClick={() => navigate('/category')}>
                              <i className="fa fa-times"></i> CANCEL
                            </button>
                            <button
                              type="submit"
                              className="btn btn-success"
                              disabled={isSubmitting}
                              style={{ marginLeft: '5px' }}
                            >
                              <i className="fa fa-check-square-o"></i> UPDATE
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

export default ViewCategory
