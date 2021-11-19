import React, {useState, useEffect, useRef} from 'react';
import Message from '../Message/Message';
import MessageWidget from '../MessageWidget/MessageWidget';
import io from "socket.io-client";
import "./Chatbox.css";

function Chatbox() {

    const [currentChat, setcurrentChat] = useState(null);
    const [messages, setmessages] = useState([]);
    const [newMessage, setnewMessage] = useState("");
    const [arrivalMessage, setarrivalMessage] = useState(null);
    const scrollRef = useRef();
    const userId = localStorage.getItem('LoginId');

    const socket = useRef();
    // const socket = io.connect("http://localhost:3001");

    useEffect(() => {
        console.log("get message use effect running");
        // socket.current = io("ws://localhost:3001");
        // socket.on("getMessage", data => {
        //     setarrivalMessage({
        //         sender: data.senderId,
        //         text: data.text,
        //         createdAt: Date.now()
        //     })
        // })


        socket.current = io("ws://localhost:3001");
        socket.current.on("getMessage", data => {
            setarrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [socket])

    useEffect(() => {
        console.log("arrival message use effct ", arrivalMessage);
        console.log(currentChat);
        var curSender = null;
        if (arrivalMessage) {
            curSender = currentChat?.members.find((m) => m._id === arrivalMessage.sender);
        }
        curSender && setmessages((prev) => [...prev, arrivalMessage])
        // arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        // setmessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        // socket.emit("addUser", userId);
        // socket.on("getUsers", users => {
        //     console.log(users);
        // })

        socket.current.emit("addUser", userId);
        socket.current.on("getUsers", users => {
            console.log(users);
        })
    }, [userId]);

    

    const setCurrentChat = (c) => {
        console.log("current chat called ",c);
        setcurrentChat(c);
    }

    

    useEffect(() => {
        const fetchMessages = async () => {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/message/${currentChat?._id}`, {
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
                console.log("Cannot get messages");
            } else {
                console.log("in fetch messages ",data.messages);
                setmessages(data.messages);
            }
        }
        fetchMessages();
    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(currentChat.members);
        const receiver = currentChat.members.find(member => member._id !== userId);
        console.log("receiver is ", receiver);
        // socket.emit("sendMessage", {
        //     senderId: userId,
        //     receiverId: receiver._id,
        //     text: newMessage
        // })

        socket.current.emit("sendMessage", {
            senderId: userId,
            receiverId: receiver._id,
            text: newMessage
        })
        
        console.log("Message submitted ",newMessage);
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/message`, {
            mode: 'cors',  // this can not be 'no-cors'
            method: "POST",
            headers: new Headers({
                'Accept': "application/json",
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }),
            body: JSON.stringify(
                {
                    conversationId: currentChat._id,
                    sender: userId,
                    text: newMessage
                }
            )
        });
        const data = await res.json();
        if (res.status > 200 || !data) {
            console.log(res.status);
            console.log("Cannot post message");
        } else {
            setmessages([...messages, data.Message]);
        }
        setnewMessage("");
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages])

    return (
        <div className="chatbox-wrapper">
            <div className="chatbox">
                <div className="chatbox-header">
                    <h2>Messages</h2>
                </div>
                {
                    currentChat && 
                    (
                        <>
                        <div className="chatbox-container">
                            {
                                messages.map((m) => {
                                    return (<div key={m._id} ref={scrollRef}>
                                        <Message own={m.sender === userId} message={m}/>
                                    </div>)
                                    
                                })
                            }
                            
                        </div>
                        <div className="chatbox-bottom">
                            <textarea onChange={(e) => setnewMessage(e.target.value)} value={newMessage} className="chat-input"></textarea>
                            <button onClick={handleSubmit} className="chat-button">Send</button>
                        </div>
                        </>
                    )
                }
                
                
            </div>
            
            <MessageWidget setCurrentChat={setCurrentChat}/>
        </div>
    )
}

export default Chatbox
