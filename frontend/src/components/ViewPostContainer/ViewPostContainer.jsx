import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';
import "./ViewPostContainer.css";

function ViewPostContainer({post}) {

    console.log("post id ",post);

    const [replies, setreplies] = useState([]);

    useEffect(() => {

        const fetchReplies = async () => {
            const token = localStorage.getItem('token');
            const res = await fetch("http://localhost:5000/postRoute/replies", {
            mode: 'cors',  // this can not be 'no-cors'
            method: "GET",
            headers: new Headers({
                'Accept': "application/json",
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`,
                "postId": post._id
            })
            });
            const data = await res.json();
            if (res.status > 200 || !data) {
                console.log(res.status);
                console.log("Cannot get replies");
            } else {
                console.log("in fetch replies ",data.results);
                setreplies(data.results);
            }
        }
        fetchReplies();
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
        console.log("reload feed");
    }
    
    return (
        <div className="viewpost-container">
            <div className="view-post-header">
                <h2>View Post</h2>
            </div>
            {/* <Post replyTo={post.replyTo} retweetData={post.retweetData} reloadFeed={reloadFeed}  postId={post._id} name={post.postedBy.name} username={post.postedBy.username} timestamp={timeDifference(new Date(), new Date(post.createdAt))} content={post.content}/> */}
            <Post post={post} reloadFeed={reloadFeed} timestamp={timeDifference(new Date(), new Date(post.createdAt))} />
            
            <h3>Replies</h3>
            
            {
                replies.map((reply) => {
                    // console.log("react compo ",post);
                    return <Post key={reply._id} post={reply} reloadFeed={reloadFeed} timestamp={timeDifference(new Date(), new Date(reply.createdAt))} />
                })
            }
        </div>
    )
}

export default ViewPostContainer
