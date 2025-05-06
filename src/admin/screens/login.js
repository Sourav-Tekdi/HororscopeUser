import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import * as Yup from 'yup'
import Helpers from '../../Helpers/Helpers'
import { Link } from "react-router-dom";
import Notification from '../../Helpers/Notification'



const Login = ({ title }) => {
  const helpers = Helpers()
  const { login } = useAuth()

  const [input, setInput] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false) // State to track loading status

  const handelChanges = (e) => {
    const { name, value } = e.target
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .strict(true)
      .min(4, 'Username must be at least 4 characters!')
      .required('Username is required!'),
    password: Yup.string()
      .min(4, 'Password must be at least 4 characters!')
      .required('Password is required!'),
  })

  const validateInputs = async () => {
    try {
      await validationSchema.validate(input, { abortEarly: false })
      setErrors({})
      return true
    } catch (validationErrors) {
      const formattedErrors = {}
      validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message
      })
      setErrors(formattedErrors)
      return false
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      if (!(await validateInputs())) return

      setLoading(true) // Disable button when form submission starts

      const response = await helpers.httpRequest('/auth/login', 'POST', input)

      Notification(response.status, response.message)
      setLoading(false) // Re-enable button after the response is received

      if (response.status === 'error') return

      setLoading(true)
      helpers.setStorage('user', response.user)
      helpers.setStorage('accessToken', response.accessToken)

      setTimeout(() => {
        login()
        window.location.href = '/'
      }, 1500)
    } catch (error) {
      setLoading(false)
      Notification('error', 'An unexpected error occurred.')
      console.error('Login error:', error)
    }
  }


  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <>
      <div id="wrapper">
        <div className="card card-authentication1 mx-auto my-5">
          <div className="card-body">
            <div className="card-content p-2">
              <div className="text-center">
                <img src="admin/assets/images/Astro_Logo.png" style={{ width: '180px' }} alt="logo icon" />
              </div>
              <div className="card-title text-uppercase text-center py-3">
                Sign In
              </div>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="exampleInputUsername" className="">
                    Username
                  </label>
                  <div className="position-relative has-icon-right">
                    <input
                      onChange={handelChanges}
                      type="text"
                      name="username"
                      value={input.username}
                      id="exampleInputUsername"
                      className="form-control input-shadow"
                      placeholder="Enter Username"
                      disabled={loading} // Disable input when loading
                    />
                    <div className="form-control-position">
                      <i className="icon-user" />
                    </div>
                    {errors.username && (
                      <span style={{ color: 'red' }}>{errors.username}</span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword" className="">
                    Password
                  </label>
                  <div className="position-relative has-icon-right">
                    <input
                      onChange={handelChanges}
                      name="password"
                      value={input.password}
                      type="password"
                      id="exampleInputPassword"
                      className="form-control input-shadow"
                      placeholder="Enter Password"
                      disabled={loading} // Disable input when loading
                    />
                    <div className="form-control-position">
                      <i className="icon-lock" />
                    </div>
                    {errors.password && (
                      <span style={{ color: 'red' }}>{errors.password}</span>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-6">
                    <div className="icheck-material-primary">
                      <input
                        type="checkbox"
                        id="user-checkbox"
                        defaultChecked={true}
                        disabled={loading} // Disable checkbox when loading
                      />
                      <label htmlFor="user-checkbox">Remember me</label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary shadow-primary btn-block waves-effect waves-light"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
                <div class="d-flex justify-content-center align-items-center py-3">
                  Not a member? <span class='register-url'><Link to="/register"> Signup now</Link></span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
