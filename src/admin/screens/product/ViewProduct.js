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
import { UpdateProductSchema } from '../../validation/ProductSchema'


const ViewProduct = ({ title }) => {
  const { id } = useParams() // Get product ID from the URL
  const helpers = Helpers()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null) // Store the product data

  useEffect(() => {
    document.title = title

    // Fetch product details for pre-populating the form
    const fetchProduct = async () => {
      try {
        const response = await helpers.httpRequest(`/product/${id}`, 'GET')
        if (response.status === 'success') {
          setProduct(response.data)
        } else {
          Notification('error', 'Error fetching product data')
          navigate('/products')
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        Notification('error', 'Error fetching product data')
      }
    }

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await helpers.httpRequest(`/category/`, 'GET')
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    // Show loader until both product and categories are fetched
    Promise.all([fetchCategories(), fetchProduct()]).finally(() => setLoading(false))
  }, [id])

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('price', values.price)
    formData.append('del_price', values.del_price || 0)
    formData.append('category', values.category)
    formData.append('description', values.description)
    formData.append('long_description', values.long_description)
    if (values.file) {
      formData.append('file', values.file) // Only append file if the user has uploaded a new one
    }

    try {
      const response = await helpers.httpRequest(`/product/update/${id}`, 'PUT', formData)
      Notification(response.status, response.message)
      if (response.status === 'success') {
        navigate('/products')
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
                  <li className="breadcrumb-item">Products</li>
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
                        title: product.title || '',
                        price: product.price.$numberDecimal || '',
                        del_price: product.del_price.$numberDecimal || 0,
                        category: product.category._id || '', // Set product's category by default
                        file: null,
                        description: product.description || '',
                        long_description: product.long_description || '',
                      }}
                      validationSchema={UpdateProductSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting, setFieldValue }) => (
                        <Form id="updateForm">
                          <h4 className="form-header text-uppercase">
                            <i className="fa fa-edit"></i> {title}
                          </h4>
                          <div className="form-group row">
                            <div className="col-sm-6">
                              <label htmlFor="title" className="col-form-label">Title</label>
                              <Field type="text" className="form-control" id="title" name="title" placeholder='Title' />
                              <ErrorMessage name="title" component="div" className="text-danger" />
                            </div>

                            {/* Price */}
                            <div className="col-sm-6">
                              <label htmlFor="price" className="col-form-label">Price</label>
                              <Field type="number" className="form-control" id="price" name="price" placeholder='Price' />
                              <ErrorMessage name="price" component="div" className="text-danger" />
                            </div>
                          </div>

                          {/* Delete Price and Category */}
                          <div className="form-group row">
                            <div className="col-sm-6">
                              <label htmlFor="del_price" className="col-form-label">Delete Price</label>
                              <Field type="number" className="form-control" id="del_price" name="del_price" placeholder='Delete Price' />
                              <ErrorMessage name="del_price" component="div" className="text-danger" />
                            </div>

                            <div className="col-sm-6">
                              <label htmlFor="category" className="col-form-label">Category</label>
                              <Field as="select" className="form-control" id="category" name="category">
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                  <option key={category._id} value={category._id}>
                                    {category.name}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage name="category" component="div" className="text-danger" />
                            </div>
                          </div>

                          {/* Image */}
                          <div className="form-group row">
                            <div className="col-sm-6">
                              <label htmlFor="file" className="col-form-label">Image</label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFieldValue('file', e.currentTarget.files[0])}
                                className="form-control"
                                id="file"
                              />
                              {product.image && (
                                <div>
                                  <img src={product.full_image} alt="Current" width="100" />
                                </div>
                              )}
                              <ErrorMessage name="file" component="div" className="text-danger" />
                            </div>
                          </div>

                          {/* Description */}
                          <div className="form-group">
                            <label htmlFor="description" className="col-form-label">Description</label>
                            <Field
                              as="textarea"
                              className="form-control"
                              id="description"
                              name="description"
                              rows="8"
                              placeholder="Description"
                            />
                            <ErrorMessage name="description" component="div" className="text-danger" />
                          </div>

                          {/* Long Description */}
                          <div className="form-group">
                            <label htmlFor="long_description" className="col-form-label">Long Description</label>
                            <Field
                              as="textarea"
                              className="form-control"
                              id="long_description"
                              name="long_description"
                              rows="8"
                              placeholder="Long Description"
                            />
                            <ErrorMessage name="long_description" component="div" className="text-danger" />
                          </div>

                          <div className="form-footer">
                            <button type="button" className="btn btn-danger" onClick={() => navigate('/products')}>
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
      )}

      <BackToTop />
      <Footer />
    </div>
  )
}

export default ViewProduct
