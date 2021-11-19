import React from 'react';
import {useHistory} from 'react-router-dom';
import "./Sidebar.css";
import { Link } from "react-router-dom";
import SidebarOption from '../SidebarOption/SidebarOption';
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from "@material-ui/icons/Search";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar({reloadProfile}) {

    // const userId = JSON.parse(localStorage.getItem('user'))._id;
    const userId = localStorage.getItem('LoginId');
    const history = useHistory();
    
    const handleOnClick = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:5000/logout", {
            mode: 'cors',  // this cannot be 'no-cors'
            method: "GET",
            headers: new Headers({
                'Accept': "application/json",
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            })
        });
        const data = await res.json();
        if (res.status === 200) {
            localStorage.removeItem('token');
            localStorage.removeItem('LoginId');
            history.push(
                {
                    pathname: "/login"
                }
            )
        } else {
            window.alert("Logout failed")
        }
    }

    const handleProfileClick = () => {
        if (reloadProfile) {
            reloadProfile(userId);
        }
    }

    return (

        <div className="sidebar">
            <TwitterIcon className="sidebar-twitter-icon"/>
            <Link to="/"><SidebarOption Icon={HomeOutlinedIcon} text="Home"/></Link>
            <Link to="/explore"><SidebarOption Icon={SearchIcon} text="Explore"/></Link>
            <Link to="/bookmarks"><SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks"/></Link>
            <Link to={"/messages/"+userId}><SidebarOption Icon={MailOutlineIcon} text="Messages"/></Link>
            <Link onClick={handleProfileClick} to={"/profile/"+userId}><SidebarOption Icon={PermIdentityIcon} text="Profile"/></Link>
            <Link onClick={handleOnClick} to="/logout"><SidebarOption Icon={LogoutIcon} text="Logout"/></Link>
        </div>
    )
}

export default Sidebar
