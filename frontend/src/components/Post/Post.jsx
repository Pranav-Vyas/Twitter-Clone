import React, {useState, useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom'; 
import { Avatar } from "@material-ui/core";
import "./Post.css";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ReplyPopup from '../ReplyPopup/ReplyPopup';

function Post(
    {
        timestamp,
        reloadFeed,
        replyTo,
        post,
        reloadProfile
    }
) {

    let history = useHistory ();

    const [likeCount, setlikeCount] = useState(0);
    const [retweetCount, setretweetCount] = useState(0);
    const [retweetText, setretweetText] = useState("");
    const [replyState, setreplyState] = useState("");
    const [saveFlag, setsaveFlag] = useState(false);
    const [likeStyle, setlikeStyle] = useState({color: "rgba(133 129 129 / 54%) !important"});
    const [saveStyle, setsaveStyle] = useState({color: "rgba(133 129 129 / 54%) !important"});
    const [commentStyle, setcommentStyle] = useState({color: "rgba(133 129 129 / 54%) !important"});
    const [retweetStyle, setretweetStyle] = useState({color: "rgba(133 129 129 / 54%) !important"});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const replyStateFun = () => {
        if (replyTo) {
            setreplyState(`replied to ${replyTo.postedBy.username}`);
        }
    }

    useEffect(() => {
        const fetchCountData = async () => {
            const token = localStorage.getItem('token');
            const res = await fetch("http://localhost:5000/api/posts/getLikeCount", {
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
            if (res.status>200 || !data) {
                console.log("like count not provided");
            } else {
                setlikeCount(data.newPost.likes.length);
                setretweetCount(data.newPost.retweets.length);
                // setContent();
                setsaveFlag(data.isSavedBy);
                if (data.newPost.retweetData) {
                    setretweetText("Retweeted");
                }
                replyStateFun();
                if (data.isLikedBy) {
                    setlikeStyle({color: "red !important"});
                } else {
                    setlikeStyle({color: "rgba(133 129 129 / 54%) !important"});
                }
                if (data.retweeted) {
                    setretweetStyle({color: "rgb(10 188 32) !important"});
                } else {
                    setretweetStyle({color: "rgba(133 129 129 / 54%) !important"});
                }
            }
        }
        fetchCountData();

    }, [likeCount, retweetCount, post._id, saveFlag])

    const handleLikeClick = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:5000/api/posts/like", {
            mode: 'cors',  // this cannot be 'no-cors'
            method: "PUT",
            headers: new Headers({
                'Accept': "application/json",
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }),
            body: JSON.stringify(
                {
                    "postId": post._id
                }
            )
        });
        const data = await res.json();
        if (data.like === true) {
            setlikeCount(data.newPost.likes.length);
        }
    }

    const handleRetweetClick = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:5000/api/posts/retweet", {
            mode: 'cors',  // this cannot be 'no-cors'
            method: "POST",
            headers: new Headers({
                'Accept': "application/json",
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
                
            }),
            body: JSON.stringify(
                {
                    "postId": post._id,
                    "content": post.content
                }
            )
        });
        const data = await res.json();
        if (data.retweet === true) {
            setretweetCount(data.newPost.retweets.length);
            if (reloadFeed) {
                reloadFeed();
            }
            
        }
        // window.location.reload();
    }

    const handleOnClickPost =  (e) => {
        var element = e.target;
        if (element.tagName === 'DIV'){
            // window.location.href = "/post/"+post._id;
            history.push('/post/'+post._id);
        }
    }

    const handleProfileClick = () => {
        if (reloadProfile) {
            reloadProfile(post.postedBy._id);
        }
    }

    const handleSaveClick = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:5000/api/posts/save", {
            mode: 'cors',  // this cannot be 'no-cors'
            method: "PUT",
            headers: new Headers({
                'Accept': "application/json",
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }),
            body: JSON.stringify(
                {
                    "postId": post._id
                }
            )
        });
        const data = await res.json();
        if (data.save === true) {
            setsaveFlag(!saveFlag);
        }
    }

    return (
        <div onClick={handleOnClickPost} className="post">
            <span className="retweet-text">{retweetText}</span>
            <div className="main_content_container">
                <div className="post_avatar">
                    {post.postedBy.avatar && <Avatar src={`http://localhost:5000/api/upload/${post.postedBy._id}/avatar`}></Avatar>}
                    {!post.postedBy.avatar && <Avatar src=""></Avatar>}
                </div>
                <div className="post_content">
                    <div className="post_header">
                    <Link onClick={handleProfileClick} to={"/profile/"+post.postedBy._id}>{post.postedBy.name}</Link>
                        <span className="username">@{post.postedBy.username}</span>
                        <span className="date">{timestamp}</span>
                        {(post._id === post.postedBy._id) && 
                            <button className="delete-btn">
                                <DeleteOutlineOutlinedIcon/>
                            </button>
                        }
                    </div>
                    <span className="replyState-text">{replyState}</span>
                    <div className="post_body">
                        <p>{post.content}</p>

                        {/* <div className="post-pic">
                            {post.postedBy.avatar && <img src={`http://localhost:5000/api/upload/${post.postedBy._id}/avatar`} alt="" />}
                        </div> */}
                    </div>
                    <div className="post_footer">
                        <button onClick={handleShow} className="">
                            <ModeCommentOutlinedIcon sx={commentStyle}/>
                            <span className="likeCount"></span>
                        </button>
                        <ReplyPopup reloadFeed={reloadFeed} show={show} handleClose={handleClose} postId={post._id}/>
                        <button onClick={handleRetweetClick} className="">
                            <RepeatIcon sx={retweetStyle}/>
                            <span className="likeCount">{retweetCount || ""}</span>
                        </button>
                        <button onClick={handleLikeClick} className="like_button">
                            <FavoriteBorderIcon sx={likeStyle}/>
                            <span className="likeCount">{likeCount || ""}</span>
                        </button>
                        <button onClick={handleSaveClick} className="like_button">
                            
                            {!saveFlag && <BookmarkBorderIcon sx={saveStyle}/>}
                            {saveFlag && <BookmarkIcon/>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
