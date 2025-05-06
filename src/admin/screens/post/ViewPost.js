import React, { useEffect, useState } from 'react';
import Footer from '../../includes/footer';
import Header from '../../includes/header';
import Sidebar from '../../includes/sidebar';
import Helpers from '../../../Helpers/Helpers';
import BackToTop from '../../includes/BackToTop';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Notification from '../../../Helpers/Notification';
import Loader from '../../../components/Loader';

const ViewPost = ({ title }) => {
  const { id } = useParams();
  const helpers = Helpers();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    document.title = title;

    const fetchPost = async () => {
      try {
        const response = await helpers.httpRequest(`/posts/${id}`, 'GET');
        if (response.statusCode === 200) {
          setPost(response);
        } else {
          Notification('error', 'Error fetching data');
          navigate('/post');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        Notification('error', 'Error fetching post data');
      }
    };

    fetchPost().finally(() => setLoading(false));
  }, [id]);

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
              <div className="col-sm-12 text-center">
                <h4 className="page-title">{title}</h4>
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link to="/">{process.env.REACT_APP_NAME}</Link>
                  </li>
                  <li className="breadcrumb-item">Posts</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {title}
                  </li>
                </ol>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body text-center">
                    {post ? (
                      <div className="post-details-container">
                        <div className="post-header">
                          <div className="post-image" style={{ float: 'left', marginRight: '20px' }}>
                            {post.image && (
                              <img
                                src={post.full_image}
                                alt={post.title}
                                style={{ width: '290px', borderRadius: '8px' }}
                              />
                            )}
                          </div>
                          <div className="post-title" style={{ marginTop: '20px' }}>
                            <h2>{post.title}</h2>
                          </div>
                        </div>

                        <div className="post-description" style={{ marginTop: '20px', textAlign: 'justify' }}>
                          <p>{post.description}</p>
                        </div>

                        <div className="post-footer" style={{ marginTop: '40px', textAlign: 'left' }}>
                          <strong>Content Creator:</strong>
                          <p style={{ fontStyle: 'italic', fontSize: '16px' }}>{post?.userId?.name}</p>
                        </div>

                        <div className="form-footer text-center" style={{ marginTop: '30px' }}>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => navigate('/post')}
                          >
                            <i className="fa fa-arrow-left"></i> BACK
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p>No post data available.</p>
                    )}
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
  );
};

export default ViewPost;
