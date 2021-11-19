import React from 'react';
import {useHistory} from 'react-router-dom';
import { Avatar } from "@material-ui/core";
import "./FollowerContainer.css"

function FollowerContainer({user}) {
    const history = useHistory();
    const handleOnClick = () => {
        history.push(
            {
                pathname: "/profile/"+user._id
            }
        )
    }

    return (
        <div onClick={handleOnClick} className="follower-container">
            <div className="follow-avatar">
                {user.avatar && <Avatar src={`http://localhost:5000/api/upload/${user._id}/avatar`}></Avatar>}
                {!user.avatar && <Avatar src=""></Avatar>}
            </div>
            <div className="follow-details">
                <h2>{user.name}</h2>
                <span>@{user.username}</span>
            </div>
        </div>
    )
}

export default FollowerContainer
