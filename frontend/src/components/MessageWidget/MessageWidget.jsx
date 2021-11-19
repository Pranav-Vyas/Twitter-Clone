import React, { useEffect, useState } from 'react';
import Conversation from '../Conversation/Conversation';
import "./MessageWidget.css"

function MessageWidget({setCurrentChat}) {

    const userId = localStorage.getItem('LoginId');
    const [conversations, setconversations] = useState([]);

    useEffect(() => {
        const fetchConversations = async () => {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/conversation/${userId}`, {
                mode: 'cors',  // this can not be 'no-cors'
                method: "GET",
                headers: new Headers({
                    'Accept': "application/json",
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                })
            });
            const data = await res.json();
            if (res.status > 200 || !data) {
                console.log(res.status);
                console.log("Cannot get conversations");
            } else {
                console.log(data);
                console.log("in fetch conversations ",data.conversations);
                setconversations(data.conversations);
                
            }
        }
        fetchConversations();
    }, [])

    
    return (
        <div className="message-widget">
            <div className="message-searchbar">
                <input type="text" placeholder="Search For Friends"/>
            </div>
            {
                conversations.map((c) => {
                    return (
                        <div onClick={() => setCurrentChat(c)} key={c._id} className="widget-conversation">
                            <Conversation conversation={c} curId={userId} />
                        </div>
                    )
                })
            }
            
            
            
        </div>
    )
}

export default MessageWidget
