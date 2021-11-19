import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import "./ProfilePage.css";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import ProfilePosts from '../ProfilePosts/ProfilePosts';
import ProfileLikes from '../ProfileLikes/ProfileLikes';
import ProfileSaves from '../ProfileSaves/ProfileSaves';

function ProfilePage({user, reloadProfile}) {

    const [selectedTab, setselectedTab] = React.useState(0);
    const [followingCount, setFollowingCount] = useState(user.following.length);
    const [followersCount, setFollowersCount] = useState(user.followers.length);
    console.log("in profile page user is ",user ,followersCount ,followingCount);

    const handleChange = (event, newValue) => {
        setselectedTab(newValue);
    };

    const handleFollowCount = (c) => {
        setFollowersCount(c);
    }

    useEffect(() => {
        console.log("profile page use effect running");
        setFollowersCount(user.followers.length);
        setFollowingCount(user.following.length);
    },[user._id])

    var fullName = user.name;
    var username = user.username;
    // var username = JSON.parse(localStorage.getItem('user')).username;

    return (
        <div className="profile">
            <div className="profile-heading">
                <h2>{fullName}</h2>
            </div>
            <ProfileHeader user={user} handleFollowCount={handleFollowCount}/>
            <div className="profile-detail">
                <h2 className="display-name">{fullName}</h2>
                <span className="username">@{username}</span>
                <div className="follow-container">
                    <Link  to={"/follow/"+user._id}>{followingCount} Following</Link>
                    <Link  to={"/follow/"+user._id} >{followersCount} Followers</Link>
                </div>
            </div>
            <div className="profile-tabs">
                <Tabs indicatorColor="primary" value={selectedTab} onChange={handleChange} variant="fullWidth">
                    <Tab className="profile-tab" label="Tweets & Replies" />
                    <Tab className="profile-tab" label="Likes" />
                    {/* <Tab className="profile-tab" label="Bookmarks" /> */}
                </Tabs>
            </div>
            {selectedTab === 0 && <ProfilePosts user={user} reloadProfile={reloadProfile}/>}
            {selectedTab === 1 && <ProfileLikes user={user} reloadProfile={reloadProfile}/>}
        </div>
    )
}

export default ProfilePage
