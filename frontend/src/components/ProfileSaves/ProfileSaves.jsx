import React from 'react';
import Post from '../Post/Post';
import "./ProfileSaves.css";

function ProfileSaves({user, reloadProfile}) {
    return (
        <div className="profile-saves-wrapper">
            {
                user.saves.map((save) => {
                    return <Post key={save._id} post={save} reloadProfile={reloadProfile}/>
                })
            }
        </div>
    )
}

export default ProfileSaves
