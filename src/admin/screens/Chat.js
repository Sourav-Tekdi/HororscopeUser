import React, { useEffect } from 'react'
import Header from './includes/Header.js'
import Footer from './includes/Footer.js'
import BlogComponent from './screenComponent/BlogComponent'
import ChatComponent from './screenComponent/ChatComponent.js'

const Chat = ({ title }) => {
    useEffect(() => {
        document.title = title
    }, [])

    return (
        <>

            <div className="as_main_wrapper">
                <Header />
                <ChatComponent title={title}/>
                <Footer />
            </div>
        </>
    )
}

export default Chat
