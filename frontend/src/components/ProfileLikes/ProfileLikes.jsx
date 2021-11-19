import React from 'react';
import Post from '../Post/Post';
import "./ProfileLikes.css";

function ProfileLikes({user, reloadProfile}) {
    return (
        <div className="profile-likes-wrapper">
            {
                user.likes.map((like) => {
                    return <Post key={like._id} post={like} reloadProfile={reloadProfile}/>
                })
            }
            
        </div>
    )
}

export default ProfileLikes
