import React from 'react';
import Post from '../Post/Post';
import "./ProfileLikes.css";

function ProfileLikes({user, reloadProfile}) {

    function timeDifference(current, previous) {

        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
    
        var elapsed = current - previous;
    
        if (elapsed < msPerMinute) {
            return 'Just now';   
        }
    
        else if (elapsed < msPerHour) {
             return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
    
        else if (elapsed < msPerDay ) {
             return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }
    
        else if (elapsed < msPerMonth) {
            return Math.round(elapsed/msPerDay) + ' days ago';   
        }
    
        else if (elapsed < msPerYear) {
            return Math.round(elapsed/msPerMonth) + ' months ago';   
        }
    
        else {
            return Math.round(elapsed/msPerYear ) + ' years ago';   
        }
    }

    return (
        <div className="profile-likes-wrapper">
            {
                user.likes.map((like) => {
                    return <Post key={like._id} post={like} timestamp={timeDifference(new Date(), new Date(like.createdAt))} reloadProfile={reloadProfile}/>
                })
            }
            
        </div>
    )
}

export default ProfileLikes
