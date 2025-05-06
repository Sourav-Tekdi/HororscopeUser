import React, { useEffect, useState } from 'react'
import Footer from '../../includes/footer'
import Header from '../../includes/header'
import Sidebar from '../../includes/sidebar'
import Helpers from '../../../Helpers/Helpers'
import BackToTop from '../../includes/BackToTop'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Notification from '../../../Helpers/Notification'
import Loader from '../../../components/Loader'
import { UpdatePostSchema } from '../../validation/PostSchema'

const UpdatePost = ({ title }) => {
  const { id } = useParams() // Get product ID from the URL
  const helpers = Helpers()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(null) // Store the product data


  // -webkit-linear-gradient(0deg, rgb(224 170 6) 0%, rgb(255 237 0) 100%)
  // -webkit-linear-gradient(0deg, rgb(211 128 5) 0%, rgb(255 237 0) 100%)
  useEffect(() => {
    document.title = title

    // Fetch product details for pre-populating the form
    const fetchPost = async () => {
      try {
        const response = await helpers.httpRequest(`/posts/${id}`, 'GET')
        if (response.statusCode === 200) {
          setPost(response)
        } else {
          Notification('error', 'Error fetching data')
          navigate('/post')
        }
      } catch (error) {
        console.error('Error fetching post:', error)
        Notification('error', 'Error fetching post data')
      }
    }

    // Show loader until both product and categories are fetched
    Promise.all([fetchPost()]).finally(() => setLoading(false))
  }, [id])

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('description', values.description)
    if (values.file) {
      formData.append('file', values.file) // Only append file if the user has uploaded a new one
    }

    try {
      const response = await helpers.httpRequest(`/posts/update/${id}`, 'PUT', formData)
      Notification(response.status, response.message)
      if (response.status === 'success') {
        navigate('/post')
      }
    } catch (error) {
      Notification('error', 'An error occurred during update')
    } finally {
      setSubmitting(false)
    }
  }

  // Always render sidebar and header, and conditionally render loader and content
  return (
    <div id="wrapper">
      <Sidebar />
      <Header />

      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row pt-2 pb-2">
              <div className="col-sm-9">
                <h4 className="page-title">{title}</h4>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/">{process.env.REACT_APP_NAME}</Link></li>
                  <li className="breadcrumb-item">Posts</li>
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
                        title: post.title || '',
                        description: post.description || '',
                        file: null,
                      }}
                      validationSchema={UpdatePostSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting, setFieldValue }) => (
                        <Form id="updatePostForm">
                          <h4 className="form-header text-uppercase">
                            <i className="fa fa-address-book-o"></i> {title}
                          </h4>
                          <div className="form-group row">
                            <div className="col-sm-6">
                              <label htmlFor="title" className="col-form-label">Title</label>
                              <Field type="text" className="form-control" id="title" name="title" placeholder='Title' />
                              <ErrorMessage name="title" component="div" className="text-danger" />
                            </div>
                            <div className="col-sm-6">
                              <label htmlFor="file" className="col-form-label">Image</label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFieldValue('file', e.currentTarget.files[0])} // Update file in Formik state
                                className="form-control"
                                id="file"
                              />
                              {post.image && (
                                <div>
                                  <img src={post.full_image} alt="Current" width="100" />
                                </div>
                              )}
                              <ErrorMessage name="file" component="div" className="text-danger" />
                            </div>
                          </div>


                          <div className="form-group row">
                            <div className="col-sm-12">
                              <label htmlFor="description" className="col-form-label">Description</label>
                              <Field as="textarea" type="text" className="form-control" id="description" name="description" placeholder='Description' rows="8" />
                              <ErrorMessage name="description" component="div" className="text-danger" />
                            </div>

                          </div>
                          <div className="form-footer">
                            <button type="button" className="btn btn-danger" onClick={() => navigate('/post')}>
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
      )}

      <BackToTop />
      <Footer />
    </div>
  )
}

export default UpdatePost
