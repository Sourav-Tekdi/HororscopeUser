import React, { useEffect, useRef, useState } from 'react'
import Footer from '../../includes/footer'
import Header from '../../includes/header'
import Sidebar from '../../includes/sidebar'
import BackToTop from '../../includes/BackToTop'
import { Link, useParams } from 'react-router-dom'
import { io } from "socket.io-client"
import { useProfile } from '../../context/ProfileContext'
import Helpers from '../../../Helpers/Helpers'
import Loader from '../../../components/Loader'
import Notification from '../../../Helpers/Notification'
import Swal from 'sweetalert2'

const Chat = ({ title }) => {
  const { id } = useParams()
  const { getStorage, httpRequest } = Helpers()
  const userProfile = useProfile()
  const [selectedChat, setSelectedChat] = useState({})
  const [messages, setMessages] = useState([])
  const [chatList, setChatList] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [status, setStatus] = useState('pending')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const socket = useRef(null)

  useEffect(() => {
    document.title = title
  }, [title])


  // Initialize Socket.IO client with Authorization token
  // Check if the user is valid and socked is not connect at that time its buid a socket connect 
  useEffect(() => {
    socket.current = io(process.env.REACT_APP_API_URL, {
      auth: {
        token: getStorage('accessToken')
      }
    })

    // Join astrologer’s chat room
    // socket.current.emit("joinAstrologer", { astrologerId: userProfile.id })

    // Listen for incoming messages
    socket.current.on("sendMessage", (data) => {

      const message = {
        content: data.content,
        sender: "Assistant",
        timestamp: data.timestamp
      }
      setMessages((prev) => [...prev, message])
      setIsTyping(false)
    })

    socket.current.on("error", (data) => {

      console.log(data);

    })
    console.log("Socket ID:", socket.current.id);

    // Update chat list only if the user is not already in the list

    socket.current.on("serverInitiateChat", (data) => {
      console.log("chat request send from user");

      setChatList((prev) => {
        if (!prev.find((chat) => chat._id === data.chatSession._id)) {
          const audio = new Audio("/audio/new_message.ogg")
          audio.play().catch((error) => console.error("Audio playback error:", error))
          return [...prev, data.chatSession]
        }
        return prev
      })
    })


    socket.current.on("serverClosedChat", (data) => {
      setChatList((prev) => {
        return prev.filter((chat) => chat._id !== data.chat_id);
      });
      Notification(data.status, data.message)
      setSelectedChat({})
    });


    socket.current.onAny((event, ...args) => {
      console.log('Event received:', event, args);
    });
    

    // Attach the unload event
    // window.addEventListener("beforeunload", handleOnBeforeUnload);

    const handleOnBeforeUnload = (e) => {
      // Use the browser's native confirmation dialog
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave? Your chat session may be interrupted.";
      // This text may not be displayed in modern browsers
    };
  
    const handleOnUnload = () => {
      console.log("userClosedBrowser");
      if (socket.current) {
        socket.current.emit("closedOrRefreshBrowser", {
          chatId: id,
          userId: userProfile?.userInfo?.id,
          reason: "The Astrologer has gone offline. The chat session has been ended.",
        });
        socket.current.disconnect();
      }
      Notification('error', 'You have been logged out of the system. Please log in again to continue.')
    };
  
    // Attach events
    window.addEventListener("beforeunload", handleOnBeforeUnload);
    window.addEventListener("unload", handleOnUnload);
    
    // Clean up socket connection on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleOnBeforeUnload);
      window.removeEventListener("unload", handleOnUnload);
    }
  }, [])

  useEffect(() => {
    // Listen for typing indicator
    socket.current.on("sendTyping", (data) => {
      // console.log("Typing event received:", data)
      // console.log("Current selected chat ID:", selectedChat?.id)

      if (data?.user_id?.toString() === selectedChat?.userDetails?._id?.toString()) {
        setIsTyping(data.message)
      } else {
        setIsTyping(false)
      }
    })
  }, [selectedChat])

  // Fetch and set the selected chat from params on initial render or when id changes
  useEffect(() => {
    if (id && chatList.length > 0) {
      const foundChat = chatList.find((chat) => chat._id === id)
      console.log("foundChat", foundChat);

      if (foundChat) {
        setSelectedChat(foundChat)
        setStatus(foundChat.status)
        setMessages([]) // Clear messages when switching chats
      }
    }
  }, [id, chatList])

  const handleTyping = (message) => {
    try {
      socket.current.emit("receiveTyping", { send_to: selectedChat.userDetails._id, message: message.length > 0 })
    } catch (error) {
      console.error('Error sending typing:', error)
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = {
        content: newMessage,
        sender: 'You',
        send_to: selectedChat.userDetails.id,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setMessages((prev) => [...prev, message])
      setNewMessage('')
      handleTyping('')
      setIsTyping(false)

      try {
        socket.current.emit("receiveMessage", { message })

        console.log("send message",message);
        
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  const handleChatSelection = (chat) => {
    setIsTyping(false)
    setSelectedChat(chat)
    setStatus(chat.status)
    setMessages([])
  }

  useEffect(() => {
    const getChats = async () => {
      try {
        setLoading(true)
        const response = await httpRequest(`/chat/all/?userId=${userProfile.userInfo.id}&status=completed`)
        if (response.status === 'error') return
        console.log("response", response.data);

        // const filteredChatList = response.data.map((res) => ({
        //   id: res.userDetails.id,
        //   name: res.userDetails.name
        // }))
        setChatList(response.data)
      } catch (error) {
        console.error('Error fetching chat list:', error)
      } finally {
        setLoading(false)
      }
    }
    getChats()
  }, [])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scroll({
        top: messagesEndRef.current.scrollHeight,
        left: 0,
        behavior: "smooth"
      })
    }
  }, [messages, isTyping])

  const acceptChat = async () => {

    Swal.fire({
      title: "Are you sure?",
      text: "You want to accept the chat!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const chat_id = selectedChat._id
          const response = await httpRequest(`/chat/accept/${chat_id}`, 'POST')
          if (response.status == 'success') {
            setStatus('accepted')
            socket.current.emit("acceptChat", { chat_id: selectedChat._id, send_to: selectedChat.userDetails._id, astrologer_id: selectedChat.astrologerDetails._id, user_online_status: selectedChat.userDetails.is_online, astrologer_online_status: selectedChat.astrologerDetails.is_online })
          } else {
            Notification(response.status, response.message)
          }
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

  }


  return (
    <>
      <div id="wrapper">
        {loading && <Loader />}
        <Sidebar />
        <Header />
        <div className="clearfix"></div>
        <div className="content-wrapper">
          <div className="container-fluid">
            {/* Page Title */}
            <div className="row pt-2 pb-2">
              <div className="col-sm-9">
                <h4 className="page-title">{title}</h4>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/">{process.env.REACT_APP_NAME}</Link></li>
                  <li className="breadcrumb-item">Chat</li>
                  <li className="breadcrumb-item active" aria-current="page">{title}</li>
                </ol>
              </div>
            </div>

            <div className="row">
              {/* Chat List Sidebar */}
              <div className="col-lg-3 chat-list">
                <div className="chat-list-header">Chats</div>
                <div className="chat-list-items">
                  {chatList.map((chat) => (
                    <div
                      key={chat._id}
                      className={`chat-list-item ${selectedChat._id === chat._id ? 'active' : ''}`}
                      onClick={() => handleChatSelection(chat)}
                    >
                      <Link to={`/chat/${chat._id}`}>
                        <h5 className="chat-name">{chat.userDetails.name}</h5>
                      </Link>
                    </div>
                  ))}
                </div>

              </div>

              {/* Chat Window */}
              {selectedChat._id && (
                <div className="col-lg-9">
                  <div className="card">
                    <div className="card-body chat-window">
                      <div className="chat-header">
                        <h5 className="chat-title">{selectedChat.userDetails.name || "Select a chat"}</h5>
                        {
                          status === 'pending' && <button onClick={acceptChat} className='btn btn-success'>Accept Chat</button>
                        }

                      </div>

                      <div className="chat-messages" ref={messagesEndRef}>
                        {messages.map((msg, index) => (
                          <div key={index} className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
                            <div className="message-text">{msg.content}</div>
                            <div className="message-time">{msg.timestamp}</div>
                          </div>
                        ))}
                        {isTyping && (
                          <div className="typing-indicator">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                          </div>
                        )}
                      </div>

                      {/* Message Input */}
                      {
                        status === 'pending' ? (
                          <h3>Need to start chat!</h3>
                        ) : (
                          <>
                            <div className="chat-input">
                              <input
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => {
                                  setNewMessage(e.target.value)
                                  handleTyping(e.target.value)
                                }}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                              />
                              <button onClick={handleSendMessage}>
                                <i className="fa fa-paper-plane"></i>
                              </button>
                            </div>
                          </>
                        )
                      }



                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <BackToTop />
        <Footer />
      </div>

      <style jsx='true'>{`
        .chat-list {
          background-color: #f8f9fa;
          border-right: 1px solid #ddd;
          height: 75vh;
          overflow-y: auto;
          padding: 15px;
        }
        .chat-list-header {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .chat-list-item {
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .chat-list-item.active,
        .chat-list-item:hover {
          background-color: #e0e0e0;
        }
        .chat-name {
          font-size: 1rem;
          margin: 0;
          font-weight: bold;
        }
        .chat-last-message {
          font-size: 0.85rem;
          color: #666;
        }
        .chat-window {
          display: flex;
          flex-direction: column;
          height: 75vh;
          border-radius: 8px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background-color: #007bff;
          color: #fff;
        }
        .chat-messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background-color: #f4f6f9;
        }
        .message {
          max-width: 60%;
          margin-bottom: 15px;
          padding: 10px 15px;
          border-radius: 20px;
          font-size: 0.95rem;
          position: relative;
          word-wrap: break-word;
        }
        .message.sent {
          align-self: flex-end;
          background-color: #dcf8c6;
          color: #333;
          text-align: right;
          border-top-right-radius: 5px;
          margin-left: auto;
        }
        .message.received {
          align-self: flex-start;
          background-color: #ffffff;
          color: #333;
          border: 1px solid #e0e0e0;
          border-top-left-radius: 5px;
          margin-right: auto;
        }
        .card-body {
          padding: 0px !important;
        }
        .typing-indicator {
            display: flex;
            align-items: center;
            margin-top: 5px;
            background: #5a4f4f;
            width: 60px;
            padding: 10px;
            border-radius: 100px;
        }
        .dot {
            width: 8px;
            height: 8px;
            margin: 0 2px;
            border-radius: 50%;
            background-color: #ffffff;
            animation: typing 0.6s infinite alternate;
        }
        .dot:nth-child(2) {
            animation-delay: 0.2s;
        }
        .dot:nth-child(3) {
            animation-delay: 0.4s;
        }
        @keyframes typing {
            0% {
                transform: translateY(0);
            }
            100% {
                transform: translateY(-5px);
            }
        }
        .chat-input {
          display: flex;
          padding: 10px;
          border-top: 1px solid #ddd;
          background-color: #fff;
        }
        .chat-input input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 20px;
          margin-right: 10px;
        }
        .chat-input button {
          background-color: #007bff;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          cursor: pointer;
        }
        .chat-input button i {
          color: #fff;
          font-size: 1.25rem;
        }
      `}</style>
    </>
  )
}

export default Chat
