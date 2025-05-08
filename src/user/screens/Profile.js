import React, { useState, useEffect } from 'react';
import Header from './includes/Header'
import { useProfile } from '../context/ProfileContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import ProfileSchema  from '../validation/ProfileSchema';
import Helpers from '../../Helpers/Helpers';


const Profile = ({ title }) => {
    const { userInfo } = useProfile();
    const helpers = Helpers();
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        console.log('User Info:', userInfo);
    }, [userInfo]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formData = new FormData();
            formData.append('name', values?.name);
            formData.append('gender', values?.gender);
            formData.append('dob', values?.dob);
            formData.append('tob', values?.tob);
            formData.append('pob', values?.pob);
            formData.append('address', values?.address);
            formData.append('mobile', values?.mobile);
            formData.append('email', values?.email);
            if (selectedFile) {
                formData.append('profile_pic', selectedFile);
            }

            const response = await helpers.httpRequest(`/astrologer/update/${userInfo._id}`, 'PUT', formData, true);


            Notification(response.status, response.message)
            if (response.status === 'error') return

            helpers.setStorage('user', response.data)
            userInfo.setUserInfo(helpers.getStorage('user'))
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <div id="wrapper">
                <Header />
                <div className="content-wrapper">
                    <div className="container-fluid">
                        <div className="row pt-2 pb-2">
                            <div className="col-sm-9">
                                <h4 className="page-title">Profile</h4>
                                <ol className="breadcrumb">
                                    {/* <li className="breadcrumb-item"><Link to="/">{process.env.REACT_APP_NAME}</Link></li> */}
                                    <li className="breadcrumb-item active" aria-current="page">{title}</li>
                                </ol>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card profile-card-2">
                                    <div className="card-img-block">
                                        <img className="img-fluid" src="assets/images/31.jpg" alt="Card image cap" />
                                    </div>
                                    <div className="card-body pt-5">
                                        <img src={userInfo?.full_profile_pic} alt="profile-image" className="profile" height="80px" />
                                        {/* <img src="/assets/images/sourav.jpg" alt="profile-image" className="profile" /> */}
                                        <h5 className="card-title">{userInfo.name}</h5>
                                        <div className="icon-block">
                                            <a href="#"><i className="fa fa-facebook bg-facebook text-white"></i></a>
                                            <a href="#"> <i className="fa fa-twitter bg-twitter text-white"></i></a>
                                            <a href="#"> <i className="fa fa-google-plus bg-google-plus text-white"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-8">
                                <div className="card">
                                    <div className="card-body">
                                        <ul className="nav nav-tabs nav-tabs-primary top-icon nav-justified">
                                            <li className="nav-item">
                                                <a href="#" data-target="#profile" data-toggle="pill" className="nav-link active"><i className="icon-user"></i> <span className="hidden-xs">Profile</span></a>
                                            </li>
                                        </ul>
                                        <div className="tab-content p-3">
                                            <div className="tab-pane active" id="profile">
                                                <Formik
                                                    initialValues={{
                                                        name: userInfo?.name || '',
                                                        gender: userInfo?.gender || '',
                                                        dob: userInfo?.dob || '',
                                                        tob: userInfo?.tob || '',
                                                        pob: userInfo?.pob || '',
                                                        address: userInfo?.address || '',
                                                        mobile: userInfo?.mobile || '',
                                                        email: userInfo?.email || '',
                                                    }}
                                                    validationSchema={ProfileSchema}
                                                    onSubmit={handleSubmit}
                                                >
                                                    {({ isSubmitting }) => (
                                                        <Form encType="multipart/form-data">
                                                            <div className="form-group row">
                                                                <label className="col-lg-3 col-form-label form-control-label">Name</label>
                                                                <div className="col-lg-9">
                                                                    <Field
                                                                        name="name"
                                                                        className="form-control"
                                                                        type="text"
                                                                    />
                                                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-lg-3 col-form-label form-control-label">Gender</label>
                                                                <div className="col-lg-9">
                                                                    <Field
                                                                        name="gender"
                                                                        className="form-control"
                                                                        type="text"
                                                                    />
                                                                    <ErrorMessage name="gender" component="div" className="text-danger" />
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="form-group row">
                                                                <label className="col-lg-3 col-form-label form-control-label">Date of Birth</label>
                                                                <div className="col-lg-9">
                                                                    <Field
                                                                        name="dob"
                                                                        type="date" // Native time input
                                                                        className="form-control"
                                                                    />
                                                                    <ErrorMessage name="dob" component="div" className="text-danger" />
                                                                </div>
                                                            </div>

                                                            <div className="form-group row">
                                                                <label className="col-lg-3 col-form-label form-control-label">Time of Birth</label>
                                                                <div className="col-lg-9">
                                                                    <Field
                                                                        name="tob"
                                                                        type="time" // Native time input
                                                                        className="form-control"
                                                                    />
                                                                    <ErrorMessage name="tob" component="div" className="text-danger" />
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="form-group row">
                                                                <label className="col-lg-3 col-form-label form-control-label">Place of Birth</label>
                                                                <div className="col-lg-9">
                                                                    <Field
                                                                        name="pob"
                                                                        className="form-control"
                                                                        type="text"
                                                                    />
                                                                    <ErrorMessage name="pob" component="div" className="text-danger" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-lg-3 col-form-label form-control-label">Address</label>
                                                                <div className="col-lg-9">
                                                                    <Field
                                                                        name="address"
                                                                        className="form-control"
                                                                        type="text"
                                                                    />
                                                                    <ErrorMessage name="address" component="div" className="text-danger" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-lg-3 col-form-label form-control-label">Mobile</label>
                                                                <div className="col-lg-9">
                                                                    <Field
                                                                        name="mobile"
                                                                        className="form-control"
                                                                        type="text"
                                                                    />
                                                                    <ErrorMessage name="mobile" component="div" className="text-danger" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-lg-3 col-form-label form-control-label">Email</label>
                                                                <div className="col-lg-9">
                                                                    <Field
                                                                        name="email"
                                                                        className="form-control"
                                                                        type="email"
                                                                    />
                                                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-lg-3 col-form-label form-control-label">Profile Picture</label>
                                                                <div className="col-lg-9">
                                                                    <input
                                                                        name="file"
                                                                        className="form-control"
                                                                        type="file"
                                                                        onChange={handleFileChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label className="col-lg-3 col-form-label form-control-label"></label>
                                                                <div className="col-lg-9">
                                                                    <input type="submit" className="btn btn-primary" value="Save Changes" disabled={isSubmitting} />
                                                                </div>
                                                            </div>
                                                        </Form>
                                                    )}
                                                </Formik>
                                            </div>

                                            {/* Other tab panes... */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Profile;
