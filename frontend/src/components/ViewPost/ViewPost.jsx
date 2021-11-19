import React,{ useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import "./ViewPost.css";
import Sidebar from '../Sidebar/Sidebar';
import Widgets from '../Widgets/Widgets';
import ViewPostContainer from '../ViewPostContainer/ViewPostContainer';

function ViewPost() {

    const history = useHistory();
    const id = useParams().id;
    
    const [posts, setposts] = useState([])

    const checkAuthentication = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch("http://localhost:5000", {
                mode: 'cors',
                method: "get",
                headers: new Headers({
                    'Accept': "application/json",
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                })
                // credentials: "include"
            });
            const data = await res.json();
            if (res.status !== 200) {
                throw new Error(res.error);
            }
        } catch {
            history.push({
                pathname: "/login"
            })
        }
    }

    const fetchPost = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:5000/postRoute", {
            mode: 'cors',  // this can not be 'no-cors'
            method: "GET",
            headers: new Headers({
                'Accept': "application/json",
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`,
                "postId": id
            })
        });
        const data = await res.json();
        console.log("in view post");
        if (res.status > 200 || !data) {
            console.log(res.status);
            console.log("Cannot get post");
        } else {
            console.log("in fetch post ",data.post.postedBy.name);
            return data.post;

        }
    }

    useEffect(() => {
        checkAuthentication();
        // setpost(fetchPost());
        fetchPost()
        .then((newPost)=>{
            setposts([newPost]);
        })
        .catch(err => console.log(err))
    }, [])
  
    

    return (
        <div className="view-post-wrapper">
            <Sidebar/>
            {
                posts.map((post) => {
                    console.log("react compo ",post);
                    return <ViewPostContainer key={post._id} post={post}/>
                })
            }
            <Widgets/>
        </div>
        
    )
}

export default ViewPost
