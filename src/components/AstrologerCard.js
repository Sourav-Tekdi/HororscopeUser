import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Helpers from '../Helpers/Helpers'
import Notification from '../Helpers/Notification'

const AstrologerCard = ({ astrologer, column = 4 }) => {
    const navigate = useNavigate();
    const helpers = Helpers()
    const initiateChat = async (astrologerId) => {
        const response = await helpers.httpRequest(`/chat/create`, 'POST', { astrologerId })
        Notification(response.status, response.message);
        // console.log(response.data._id);

        if (response.status === 'success') {
            navigate(`/chat/${response.data._id}`)
        }
    }
    return (
        <>
            <div className="astrologer-card" key={astrologer._id}>
                {/* Green active mark if astrologer is online */}

                <div className="active-status">
                    <div
                        className={`outer-circle ${astrologer.is_online ? 'outer-green' : 'outer-red'}`}
                    >
                        <div
                            className={`inner-circle ${astrologer.is_online ? 'inner-green' : 'inner-red'}`}
                        ></div>
                    </div>
                </div>


                <div className="astrologer-left">
                    <div className="astrologer-image">
                        <img
                            className="img-responsive"
                            alt="Astrologer"
                            src={`${astrologer?.full_profile_pic}`}
                        />
                    </div>
                    <div className="rating-and-orders">
                        <div className="rating">
                            {Array.from({ length: 5 }).map((_, index) => {
                                if (index < Math.floor(astrologer.ratingDetails.rating)) {
                                    // Full yellow star
                                    return <span key={index} className="full-star">⭐</span>;
                                } else if (index === Math.floor(astrologer.ratingDetails.rating) && astrologer.ratingDetails.rating % 1 !== 0) {
                                    // Half yellow star
                                    return <span key={index} className="half-star">⭐</span>;
                                } else {
                                    // Empty star
                                    return <span key={index} className="empty-star">☆</span>;
                                }
                            })}
                        </div>
                    </div>
                    <div className={`orders ${!astrologer.ratingDetails.personCount ? 'red-text' : ''}`}>
                        {astrologer.ratingDetails.personCount ? `${astrologer.ratingDetails.rating.toFixed(1)}   (${astrologer.ratingDetails.personCount})` : "New!"}
                    </div>
                </div>

                <div className="astrologer-middle">
                    <h4 className="astrologer-name">{astrologer?.name}</h4>
                    <p className="specialization">{astrologer.specialization ? astrologer.specialization : "-"}</p>
                    <p className="languages">{astrologer?.language ? astrologer?.language : "-"}</p>
                    <p className="experience">Exp: {astrologer?.year_of_exp ? `${astrologer?.year_of_exp} Years` : "0 Years"}</p>
                    <div className="price">
                        {astrologer.fees ? `₹ ${astrologer.fees}/min` : "Free!"}
                    </div>
                </div>

                <div className="astrologer-right">
                    {/* <button className="chat-button" onClick={() => initiateChat(astrologer?.id)}> */}
                    <button
                        className={`chat-button ${astrologer?.is_online === 0 ? 'offline' : 'online'}`}
                        onClick={() => {
                            if (astrologer?.is_online === 0) {
                                Notification('error', 'Astrologer is offline!');
                            } else {
                                initiateChat(astrologer?.id);
                            }
                        }}
                    >
                        Chat
                    </button>
                </div>
            </div>
        </>

    )
}

export default AstrologerCard
