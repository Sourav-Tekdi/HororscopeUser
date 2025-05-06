import React, { useEffect } from 'react'
import Footer from '../../includes/footer'
import Header from '../../includes/header'
import Sidebar from '../../includes/sidebar'
import Helpers from '../../../Helpers/Helpers'
import BackToTop from '../../includes/BackToTop'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Notification from '../../../Helpers/Notification'
import { FaqSchema } from '../../validation/FaqSchema'

const AddFaq = ({ title }) => {
  const helpers = Helpers()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = title
  }, [title])

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)

    try {
      const response = await helpers.httpRequest('/faq/create', 'POST', values)
      Notification(response.status, response.message)
      if (response.status === 'success') {
        resetForm()
        navigate('/faq')
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
                  <li className="breadcrumb-item">FAQ</li>
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
                        question: '',
                        answer: '',
                      }}
                      validationSchema={FaqSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting, setFieldValue }) => (
                        <Form id="AddFaqForm">
                          <h4 className="form-header text-uppercase">
                            <i className="fa fa-address-book-o"></i> {title}
                          </h4>
                          <div className="form-group row">
                            <div className="col-sm-6">
                              <label htmlFor="question" className="col-form-label">Question ?</label>
                              <Field type="text" className="form-control" id="question" name="question" placeholder='Question' />
                              <ErrorMessage name="question" component="div" className="text-danger" />
                            </div>
                          </div>


                          <div className="form-group row">
                            <div className="col-sm-12">
                              <label htmlFor="answer" className="col-form-label">Answer</label>
                              <Field as="textarea" type="text" className="form-control" id="answer" name="answer" placeholder='Answer' rows="8" />
                              <ErrorMessage name="answer" component="div" className="text-danger" />
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

export default AddFaq
