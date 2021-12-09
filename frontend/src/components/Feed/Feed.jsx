import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import Tweetbox from '../Tweetbox/Tweetbox';
import "./Feed.css";

function Feed() {

    const [posts, setposts] = useState([]);
    const [postFlag, setpostFlag] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const res = await fetch("http://localhost:5000/api/posts", {
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
                alert("Cannot get posts");
            } else {
                setposts(data.results);
                setpostFlag(true);
            }
        }
        fetchData();
    }, [])

    const reloadFeed = () => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const res = await fetch("http://localhost:5000/api/posts", {
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
                console.log("Cannot get posts");
            } else {
                setposts(data.results);
                setpostFlag(true);
            }
        }
        fetchData();
    }


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
        <div className="feed">
            <div className="feed-header">
                <h2>Home</h2>
            </div>
            <Tweetbox reloadFeed={reloadFeed} />
            {
                !postFlag &&
                <Loader/>
            }
            {
                postFlag && posts.length === 0 && 
                <>
                <h2 className="feedh2">Start following people to see posts</h2>
                </>
            }
            {
                posts.map((post) => {
                    return <Post key={post._id} post={post} replyTo={post.replyTo} reloadFeed={reloadFeed} timestamp={timeDifference(new Date(), new Date(post.createdAt))} />
                })
            }
            
            
        </div>
    )
}

export default Feed
