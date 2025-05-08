import { useEffect, useState, useRef } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { io } from "socket.io-client"
import Helpers from "../../../Helpers/Helpers"
import Breadcrum from "../../components/Breadcrum"
import { useProfile } from "../../context/ProfileContext"
import FullPageLoader from "../../components/FullPageLoader"
import Swal from 'sweetalert2'
import Notification from '../../../Helpers/Notification'
import { useCallback } from "react";



const ChatComponent = ({ title }) => {
    const { id } = useParams()
    const helpers = Helpers()
    const userProfile = useProfile()
    const navigate = useNavigate()
    const { search } = useLocation()

    const [messages, setMessages] = useState([]) // Start with an empty message array
    const [newMessage, setNewMessage] = useState("")
    const messagesEndRef = useRef(null)
    const socket = useRef(null) // Use a ref to store the socket instance
    const [isTyping, setIsTyping] = useState(false)
    const [astrologer, setAstrologer] = useState({})
    const [loading, setLoading] = useState(false)
    const [initiate, setInitiate] = useState(false)
    const [isBusy, setIsBusy] = useState(true)
    const [chatSession, setChatSession] = useState({})
    const [status, setStatus] = useState('pending')
    const [showRatingModal, setShowRatingModal] = useState(false); // Modal state
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");


    // GET ASTROLOGER INFO
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await helpers.httpRequest(`/chat/${id}`, 'GET')
                // console.log(response);

                if (response.status === 'success') {
                    setAstrologer(response.data)
                    setChatSession(response.data)
                    setStatus(response.data.status)
                    // setIsBusy(response.data.isBusy && response.data.isBusy.userId !== userProfile.userInfo.id);

                } else {
                    navigate('/astrologer')
                }
            } catch (error) {
                console.error('Error fetching Astrologers:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    // Initialize Socket.IO client
    useEffect(() => {
        socket.current = io(process.env.REACT_APP_API_URL, {
            auth: {
                token: helpers.getStorage('accessToken') // Retrieve token from local storage or another source
            }
        })
        console.log(socket.current);

        // Listen for incoming messages
        socket.current.on("sendMessage", (data) => {
            console.log(data);

            const message = {
                content: data.content,
                sender: "Assistant",
                timestamp: data.timestamp
            }
            setMessages((prev) => [...prev, message])
        })

        socket.current.on("sendTyping", (data) => {
            setIsTyping(data.message)
        })

        socket.current.on("astrologerAcceptChat", (data) => {
            setStatus(data.chat_id == id && 'accepted')

        })

        socket.current.on("error", (data) => {
            if (data && data?.msg == 'Astrologer is busy!') {
                setIsBusy(true)
            }
            console.log(data);

        })


        // Add listener for 'sessionEnded' event
        socket.current.on('serverClosedChat', (data) => {
            const status  = data?.status || 'error';
            const reason = data?.message || data?.reason || 'Something wants wrong';
            Notification(status, reason);
            socket.current.disconnect()
        });

        socket.current.onAny((event, ...args) => {
            console.log('Event received:', event, args);
        });


        const handleOnBeforeUnload = (e) => {
            // Use the browser's native confirmation dialog
            e.preventDefault();
            e.returnValue = "Are you sure you want to leave? Your chat session may be interrupted.";
            // This text may not be displayed in modern browsers
        };

        const handleOnUnload = () => {
            if (socket.current) {
                socket.current.emit("closedOrRefreshBrowser", {
                    chatId: id,
                    userId: userProfile?.userInfo?.id,
                    reason: "The Astrologer has gone offline. The chat session has been ended.",
                });
                socket.current.disconnect();
            }
            Notification('error', 'The chat session has ended due to a refresh. To continue, please reconnect.')
        };

        // Attach events
        window.addEventListener("beforeunload", handleOnBeforeUnload);
        window.addEventListener("unload", handleOnUnload);

        // Clean up socket connection on component unmount
        return () => {
            window.removeEventListener("beforeunload", handleOnBeforeUnload);
            window.removeEventListener("unload", handleOnUnload);
        }
    }, [id, helpers])

    useEffect(() => {
        if (messagesEndRef && messagesEndRef.current) {
            const element = messagesEndRef.current
            element.scroll({
                top: element.scrollHeight,
                left: 0,
                behavior: "smooth"
            })
        }
    }, [messages, isTyping])


    useEffect(() => {
        setTimeout(() => {
            initiateChat();
        }, 3000);
    }, [chatSession]);  // Now re-runs when chatSession updates
    
    const initiateChat = useCallback(() => {
        socket.current.emit("initiateChat", { 
            chatSession, 
            user: { name: userProfile.userInfo.name, id: userProfile.userInfo.id }, 
            astrologer: chatSession.astrologerDetails 
        });
    }, [chatSession]);  // Ensures the latest chatSession is used

    

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return

        const message = {
            content: newMessage,
            sender: 'You',
            send_to: chatSession.astrologerId,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }

        // Add the new message to the chat immediately
        setMessages((prev) => [...prev, message])
        setNewMessage("")
        handleTyping('')
        setIsTyping(false)

        try {
            // Emit the message to the server
            socket.current.emit("receiveMessage", { message: message })
            console.log("receiveMessage from Astrologer");
            
        } catch (error) {
            console.error('Error sending message:', error)
        }
    }

    const handleTyping = async (message) => {
        try {
            socket.current.emit("receiveTyping", { user_id: userProfile.userInfo.id, send_to: chatSession.astrologerId, message: message.length > 0 })
        } catch (error) {
            console.error('Error sending typing:', error)
        }
    }

    // // End session due to insufficient balance
    // useEffect(() => {
    //     if (socket?.current) {
    //         console.log('Listening for sessionEnded event...');

    //         // Add listener for 'sessionEnded' event
    //         socket.current.on('sessionEnded', (data) => {
    //             console.log('sessionEnded event received:', data);
    //             alert(`Chat ended: ${data.reason}`); // Fixed string interpolation
    //         });

    //         // Cleanup on component unmount
    //         return () => {
    //             console.log('Cleaning up sessionEnded listener...');
    //             socket.current.off('sessionEnded');
    //         };
    //     }
    // }, [socket]); // Dependency on `socket` instead of `socket?.current`





    const handleEndSession = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to close the chat!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, close it!",
            customClass: {
                confirmButton: 'small-button',
                cancelButton: 'small-button'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await helpers.httpRequest(`/chat/update/${id}`, 'POST', { status: 'completed' });
                    if (response.status == 'success') {
                        setStatus('completed')
                    }

                    socket.current.emit("userClosedChat", { user_id: userProfile.userInfo.id, send_to: chatSession.astrologerId, chat_id: chatSession._id })

                    setTimeout(() => {
                        setShowRatingModal(true); // Open the modal after 1 second
                    }, 1000);

                } catch (error) {
                    console.error("Error closing chat:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to close the chat.",
                        icon: "error"
                    });
                }
            }
        });
    };


    const handleSubmitRating = async () => {
        try {
            const payload = {
                entityId: chatSession.astrologerId, // Astrologer ID
                entityType: "astrologer",
                userId: userProfile.userInfo.id, // User ID
                rating,
                review,
            };

            const response = await helpers.httpRequest("/ratings", "POST", payload);
            if (response.status === "success") {
                Swal.fire({
                    title: "Thank you!",
                    text: response.message,
                    icon: "success",
                });
                setShowRatingModal(false); // Close modal
            }
        } catch (error) {
            console.error("Error submitting rating:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to submit the rating.",
                icon: "error",
            });
        }
    };
    useEffect(() => {
        console.log("showRatingModal changed:", showRatingModal);
    }, [showRatingModal]);

    return (
        <>
            {loading && <FullPageLoader />}
            <Breadcrum title={title} url='/' />
            <section className="chat_wrapper">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            {
                                status === 'completed' ? (
                                    <h1>Chat has been ended!</h1>
                                ) : (
                                    <div className="chat_area">
                                        <div className="chat_header justify-content-between">
                                            <div>
                                                <img src={chatSession?.astrologerDetails?.full_profile_pic} alt={chatSession?.astrologerDetails?.name} className="chat_partner_image" />
                                                <b className="chat_partner_name">{chatSession?.astrologerDetails?.name}</b>
                                            </div>
                                            <div className="chat_header_right">
                                                {
                                                    <button className="btn btn-danger" onClick={() => handleEndSession()}>Close Chat</button>
                                                }
                                            </div>

                                        </div>


                                        {/* Messages container */}
                                        <div className="messages" ref={messagesEndRef}>
                                            {messages.map((msg, index) => (
                                                <div key={index} className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
                                                    <span className="content">{msg.content}</span>
                                                    <span className="timestamp">{msg.timestamp}</span>
                                                </div>
                                            ))}
                                            {/* Typing animation */}
                                            {isTyping && (
                                                <div className="typing-indicator">
                                                    <span className="dot"></span>
                                                    <span className="dot"></span>
                                                    <span className="dot"></span>
                                                </div>
                                            )}
                                        </div>
                                        {
                                            status === 'pending' ? (
                                                <h3>Chat will start once the Astrologer accept, wait...</h3>
                                            ) : (
                                                <div className="message_input">
                                                    <input
                                                        type="text"
                                                        placeholder="Type a message..."
                                                        value={newMessage}
                                                        onChange={(e) => setNewMessage(e.target.value)}
                                                        onKeyUp={(e) => {
                                                            handleTyping(e.target.value);
                                                            if (e.key === 'Enter') {
                                                                if (!initiate) {
                                                                    // initiateChat();
                                                                    handleSendMessage();
                                                                } else {
                                                                    handleSendMessage();
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    <button onClick={() => {
                                                        if (!initiate) {
                                                            // initiateChat();
                                                            handleSendMessage();
                                                        } else {
                                                            handleSendMessage();
                                                        }
                                                    }}>
                                                        Send
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {/* Rating Modal */}
                    {showRatingModal && (
                        // <div className="modal-overlay">
                        <div className={`modal-overlay ${showRatingModal ? "" : "modal-closing"}`}>

                            <div className="modal">
                                {/* Close Icon */}
                                <span
                                    className="modal-close-icon"
                                    onClick={() => setShowRatingModal(false)}
                                >
                                    &times;
                                </span>

                                {/* Astrologer Details */}
                                <img
                                    src={chatSession?.astrologerDetails?.full_profile_pic}
                                    alt={chatSession?.astrologerDetails?.name}
                                    className="chat_partner_rating_img"
                                />
                                <div>
                                    <b className="chat_partner_name">{chatSession?.astrologerDetails?.name}</b>
                                </div>

                                <p>Your feedback is valuable to us!</p>

                                {/* Rating Stars */}
                                <div className="rating-stars">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`star ${star <= rating ? 'filled' : ''}`}
                                            onClick={() => setRating(star)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>

                                {/* Review Input */}
                                <div className="review-input">
                                    <label htmlFor="review">Review:</label>
                                    <textarea
                                        id="review"
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        placeholder="Write your review here..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="modal-actions">
                                    <button className="btn-rating-submit btn-sm" onClick={handleSubmitRating}>
                                        <b>Submit</b>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                </div>
            </section>

        </>
    )
}

export default ChatComponent