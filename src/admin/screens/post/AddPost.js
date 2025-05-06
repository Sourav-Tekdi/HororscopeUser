import React, { useEffect } from 'react'
import Footer from '../../includes/footer'
import Header from '../../includes/header'
import Sidebar from '../../includes/sidebar'
import Helpers from '../../../Helpers/Helpers'
import BackToTop from '../../includes/BackToTop'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Notification from '../../../Helpers/Notification'
import { PostSchema } from '../../validation/PostSchema'
import { useProfile } from '../../context/ProfileContext'



const AddPost = ({ title }) => {
  const helpers = Helpers()
  const navigate = useNavigate()
  const userProfile = useProfile()

  useEffect(() => {
    document.title = title
  }, [title])

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('userId', userProfile?.userInfo?.id,)
    if (values.file) {
      formData.append('file', values.file)
    }

    try {
      const response = await helpers.httpRequest('/posts/create', 'POST', formData)
      Notification(response.status, response.message)
      if (response.status === 'success') {
        resetForm()
        navigate('/post')
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
                        title: '',
                        description: '',
                        file: null,
                      }}
                      validationSchema={PostSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting, setFieldValue }) => (
                        <Form id="addPostForm">
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

export default AddPost
