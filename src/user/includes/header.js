import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Helpers from '../../Helpers/Helpers';
import { useProfile } from '../context/ProfileContext';
import Logout from '../components/Logout';
import Notification from '../../Helpers/Notification';

const Header = () => {
    const helpers = Helpers();
    const { getStorage } = Helpers();
    const user = getStorage('user');
    const userProfile = useProfile();

    const [astrologers, setAstrologers] = useState([]);
    const [total, setTotal] = useState(0); // Set total to a number
    const [selectedAstrologer, setSelectedAstrologer] = useState(null); // Store the selected astrologer for the modal
    const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

    // Fetch astrologers data
    const fetchData = async () => {
        try {
            const response = await helpers.httpRequest(`/astrologer/new-astrologer`, 'GET');
            if (response.status === 'success') {
                setAstrologers(response.data); // Assuming this is an array of astrologer objects
                setTotal(response.total); // Set total count
            } else{
                setTotal(0);
            }
        } catch (error) {
            console.error('No new astrologer onboard:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Call fetchData when component mounts
    }, []); // Empty dependency array to run only once when the component mounts

    // Handle Accept and Reject actions
    const handleAction = async (astrologerId, action) => {
        try {
            const requestBody = {
                status: action,
            };

            const response = await helpers.httpRequest(
                `/astrologer/account-status/${astrologerId}`,
                'PATCH',
                requestBody
            );

            if (response.status === 'success') {
                Notification(response.status, response.message); // Show notification based on the response
                setAstrologers(astrologers.filter(astrologer => astrologer.id !== astrologerId)); // Remove the astrologer from the list
                fetchData(); // Re-fetch the updated list of astrologers
                setIsModalOpen(false); // Close modal after action
            }
        } catch (error) {
            console.error('Error accepting astrologer:', error);
        }
    };

    // Function to open the modal and show astrologer details
    const handleShowDetails = (astrologer) => {
        setSelectedAstrologer(astrologer);
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAstrologer(null);
    };

    return (
        <>
            <header className="topbar-nav">
                <nav className="navbar navbar-expand fixed-top bg-white">
                    <ul className="navbar-nav mr-auto align-items-center">
                        {/* Other elements remain the same */}
                    </ul>
                    <ul className="navbar-nav align-items-center right-nav-link">
                        {/* Other elements remain the same */}
                        <li className="nav-item dropdown-lg">
                            <a
                                className="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect"
                                data-toggle="dropdown"
                                href="#"
                            >
                                <i className="fa fa-bell-o" />
                                <span className="badge badge-info badge-up">{total}</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        You have {astrologers.length} new registered users
                                        <span className="badge badge-info">{astrologers.length}</span>
                                    </li>
                                    {astrologers.length > 0 ? (
                                        astrologers.map(astrologer => (
                                            <li key={astrologer.id} className="list-group-item">
                                                <a
                                                    href="#"
                                                    onClick={() => handleShowDetails(astrologer)} // On click, show the astrologer details in the modal
                                                >
                                                    <div className="media">
                                                        <div className="avatar">
                                                            <img
                                                                className="align-self-start mr-3"
                                                                src={astrologer.profile_pic || '/default-avatar.png'}
                                                                alt="user avatar"
                                                            />
                                                        </div>
                                                        <div className="media-body">
                                                            <h6 className="mt-0 msg-title">{astrologer.name}</h6>
                                                            <p className="msg-info">{astrologer.email}</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="list-group-item">No new registered users</li>
                                    )}
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                                data-toggle="dropdown"
                                href="#"
                            >
                                <span className="user-profile">
                                    <img
                                        src={userProfile.userInfo.full_profile_pic}
                                        className="img-circle"
                                        alt="user avatar"
                                    />
                                </span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li className="dropdown-item user-details">
                                    <a href="#">
                                        <div className="media">
                                            <div className="avatar">
                                                <img
                                                    className="align-self-start mr-3"
                                                    src={userProfile.userInfo.full_profile_pic}
                                                    alt="user avatar"
                                                />
                                            </div>
                                            <div className="media-body">
                                                <h6 className="mt-2 user-title">{userProfile.userInfo.name}</h6>
                                                <p className="user-subtitle">{userProfile.userInfo.email}</p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="dropdown-divider" />
                                <Link to='/profile'>
                                    <li className="dropdown-item">
                                        <i className="icon-user mr-2" /> Profile
                                    </li>
                                </Link>
                                <li className="dropdown-divider" />
                                <li className="dropdown-item">
                                    <i className="icon-wallet mr-2" /> Account
                                </li>
                                <li className="dropdown-divider" />
                                <Link to='/settings'>
                                    <li className="dropdown-item">
                                        <i className="icon-settings mr-2" /> Setting
                                    </li>
                                </Link>
                                <li className="dropdown-divider" />
                                <Logout />
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* Modal to show astrologer details */}
            {isModalOpen && selectedAstrologer && (
                <div className="modal" style={{ display: 'block' }} onClick={closeModal}>
                    <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Astrologer Details</h5>
                                <button type="button" className="close" onClick={closeModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="media">
                                    <div className="avatar">
                                        <img
                                            className="align-self-start mr-3"
                                            src={selectedAstrologer.profile_pic || '/default-avatar.png'}
                                            alt="user avatar"
                                        />
                                    </div>
                                    <div className="media-body">
                                        <h6 className="mt-0">Name: {selectedAstrologer.name}</h6>
                                        <div className="row">
                                            <div className="col-6">
                                                <p><strong>Email:</strong> {selectedAstrologer?.email}</p>
                                                <p><strong>Gender:</strong> {selectedAstrologer?.gender}</p>
                                                <p><strong>Date of Birth:</strong> {selectedAstrologer.dob}</p>
                                                {selectedAstrologer?.address && <p><strong>Address:</strong> {selectedAstrologer?.address}</p>}
                                                <p><strong>Language:</strong> {selectedAstrologer?.language}</p>
                                            </div>
                                            <div className="col-6">
                                                <p><strong>Fees:</strong> {selectedAstrologer?.fees}</p>
                                                <p><strong>Year of Experience:</strong> {selectedAstrologer?.year_of_exp}</p>
                                                <p><strong>Specialization:</strong> {selectedAstrologer?.specialization}</p>
                                                {selectedAstrologer.certificate_pic && (
                                                    <p><strong>Certificate Image:</strong>
                                                        <a href={selectedAstrologer?.certificate_pic} target="_blank" rel="noopener noreferrer">
                                                            View Certificate
                                                        </a>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                {/* Accept and Reject Buttons inside the Modal */}
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => handleAction(selectedAstrologer.id, 'accepted')}
                                >
                                    Accept
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleAction(selectedAstrologer.id, 'rejected')}
                                >
                                    Reject
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
