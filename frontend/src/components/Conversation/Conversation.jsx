import React, {useState} from 'react';
import "./Conversation.css";
import { Avatar } from "@material-ui/core";

function Conversation({conversation, curId}) {

    const [friend, setfriend] = useState(conversation.members.find((m) => m._id!=curId));
    // console.log(friend._id, curId, conversation.members );
    return (
        <div className="conversation">
            <div className="conversation-avatar">
                {friend.avatar && <Avatar src={`http://localhost:5000/api/upload/${friend._id}/avatar`}></Avatar>}
                {!friend.avatar && <Avatar src=""></Avatar>}
            </div>
            <div className="conversation-details">
                <h2>{friend.name}</h2>
                <span>@{friend.username}</span>
            </div>
        </div>
    )
}

export default Conversation
