import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import Notification from '../../Helpers/Notification';
import Helpers from '../../Helpers/Helpers';
import { Link } from "react-router-dom";

const Login = ({ title }) => {
  const helpers = Helpers()
  const [input, setInput] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Disable button when form submission starts

      const response = await helpers.httpRequest('/auth/login', 'POST', input);

      Notification(response.status, response.message);
      setLoading(false); // Re-enable button after the response is received

      if (response.status === 'error') return;

      helpers.setStorage('user', response.user);
      helpers.setStorage('accessToken', response.accessToken);
      helpers.setStorage('isAuthenticated', true);

      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (error) {
      setLoading(false);
      Notification('error', 'An unexpected error occurred.');
      console.error('Login error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const images = [
    "assets/images/Astro_Logo.png",
    "assets/images/Antara.jpg"
  ];

  return (
    <>

      <section className="as_login_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ad_login_box">
                <div className="row">
                  <div className="col-lg-7 col-md-7 col-sm-12">
                    <div className=" as_padderTop70 as_padderBottom60 text-center">
                      <Slider ref={sliderRef} {...settings}>
                        {images.map((image, i) => (
                          <div key={i} className="as_login_img">
                            <img alt="" src={image} />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-7 col-sm-12">
                    <div className="as_login_detail text-center">
                      <a href="$">
                        <img alt="" src="assets/images/astroscop.png" />
                      </a>
                      <h1 className="as_padderTop50">Welcome back!</h1>
                      <p className="as_padderBottom30">Please Login to your account</p>
                      <form onSubmit={handleLogin} className="d_block">
                        <div className="form-group as_padderBottom10">
                          <input
                            className="form-control"
                            name="username"
                            placeholder="Username"
                            type="text"
                            value={input.username}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={input.password}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <div className="as_login_data">
                            <label>
                              Keep Me Signed In
                              <input name="as_remember_me" type="checkbox" value="" />
                              <span className="checkmark"></span>
                            </label>
                            <a href="#">Forgot password ?</a>
                          </div>
                        </div>
                        <div className="text-center as_padderTop20">
                          <button className="as_btn" type="submit" disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign in'}
                          </button>
                        </div>
                        <div>
                          Not a member? <span class='register-url'><Link to="/register">Signup now</Link></span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
