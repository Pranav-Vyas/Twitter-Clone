import React, {useState, useEffect} from 'react';
// import { useHistory } from 'react-router-dom';
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import "./ProfileHeader.css";

function ProfileHeader({user, handleFollowCount}) {

    const [followFlag, setfollowFlag] = useState(false);
    const LoginId = localStorage.getItem('LoginId');
    
    useEffect(() => {
        console.log("in use effect follow");
        const fetchFollowData = async () => {
            const token = localStorage.getItem('token');
            const res = await fetch("http://localhost:5000/api/follow", {
                mode: 'cors',  // this can not be 'no-cors'
                method: "GET",
                headers: new Headers({
                    'Accept': "application/json",
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "userId": user._id
                })
            });
            const data = await res.json();
            if (res.status>200 || !data) {
                console.log("like count not provided");
            } else {
                if (data.isFollowing) {
                    setfollowFlag(true);
                } else {
                    setfollowFlag(false);
                }
            }
        }
        fetchFollowData();
    }, [followFlag])

    const handleFollow = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:5000/api/follow", {
            mode: 'cors',  // this cannot be 'no-cors'
            method: "PUT",
            headers: new Headers({
                'Accept': "application/json",
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }),
            body: JSON.stringify(
                {
                    "userId": user._id
                }
            )
        });
        const data = await res.json();
        console.log(data);
        if (data.follow === true) {
            setfollowFlag(!followFlag);
            handleFollowCount(data.newFollowers);
        }
    }

    const uploadFile = async () => {
        const fd = new FormData();
        var input = document.querySelector('input[type="file"]');
        console.log("input is ", input);
        fd.append('avatar', input.files[0]); 
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:5000/api/upload/avatar", {
            mode: 'cors',  // this cannot be 'no-cors'
            method: "POST",
            headers: new Headers({
                // 'Accept': "application/json",
                // "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }),
            body: fd
        });
        console.log(res);
    }

    const handleUpload = (e) => {
        console.log('your image ',e.target.files[0]);
        uploadFile();

    }

    return (
        <div className="profile-header">
            <div className="coverPhoto-container">
                <div className="profile-avatar">
                    {
                        (LoginId === user._id) &&
                        <label className="custom-file-upload">
                            <input onChange={handleUpload} type="file"/>
                        </label>
                    }
                    
                    
                    {user.avatar && <Avatar title="hover text" src={`http://localhost:5000/api/upload/${user._id}/avatar`}></Avatar>}
                    {!user.avatar && <Avatar src=''></Avatar>}
                    {/* <Avatar src=''></Avatar> */}

                </div>
            </div>
            
            {
                (LoginId !== user._id) &&
                <div className="profileButton-container">
                        <Link to="/"><MailOutlineIcon/></Link>
                        <button onClick={handleFollow} className="follow-btn">{followFlag ? "Following" : "Follow"}</button>
                </div>
            }
            {
                (LoginId === user._id) &&
                <div style={{height: "80px"}} className="profileButton-container"></div>
            }
            
            
        </div>
    )
}

export default ProfileHeader
