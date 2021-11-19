import React from 'react';
import "./Messages.css"
import Chatbox from '../Chatbox/Chatbox';
import Sidebar from '../Sidebar/Sidebar';

function Messages() {
    return (
        <div className="messages-wrapper">
            <Sidebar/>
            <Chatbox/>
        </div>
    )
}

export default Messages
