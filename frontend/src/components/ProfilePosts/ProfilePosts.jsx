import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import Loader from '../Loader/Loader';
import "./ProfilePosts.css";

function ProfilePosts({user, reloadProfile}) {

    const [posts, setposts] = useState([]);
    const [postsFlag, setpostsFlag] = useState(false);
    // const userId = JSON.parse(localStorage.getItem('user'))._id;
    const userId = user._id
    const url = "http://localhost:5000/profileRoute/posts/"+userId;

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const res = await fetch(url, {
                mode: 'cors',  // this can not be 'no-cors'
                method: "GET",
                headers: new Headers({
                    'Accept': "application/json",
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                })
            });
            const data = await res.json();
            console.log("in feed",data);
            if (res.status > 200 || !data) {
                console.log(res.status);
                alert("Cannot get posts");
            } else {
                setposts(data.results);
                setpostsFlag(true);
            }
        }
        fetchData();
    }, [])

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

    const reloadFeed = () => {
        console.log("in reload feed");
    }

    return (
        <div className="profile-posts-wrapper">
            {
                !postsFlag &&
                <Loader/>
            }
            {
                posts.map((post) => {
                    return <Post key={post._id} post={post} replyTo={post.replyTo} reloadFeed={reloadFeed} timestamp={timeDifference(new Date(), new Date(post.createdAt))} reloadProfile={reloadProfile} />
                })
            }
        </div>
    )
}

export default ProfilePosts
