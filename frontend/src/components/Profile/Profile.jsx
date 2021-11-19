import React, {useEffect, useState} from 'react';
import { useHistory, useParams  } from 'react-router-dom';
import ProfilePage from '../ProfilePage/ProfilePage';
import Sidebar from '../Sidebar/Sidebar';
import Widgets from '../Widgets/Widgets';
import Loader from '../Loader/Loader';
import "./Profile.css"

function Profile() {

    const history = useHistory();
    const [userId, setuserId] = useState(useParams().id)
    // const [users, setusers] = useState([]);
    const [user, setuser] = useState(null);
    // const userId = useParams().id;
    console.log("main profile");
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

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/profileRoute/user/${userId}`, {
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
            console.log("Cannot get user");
        } else {
            // setusers([data.user]);
            setuser(data.user);
        }
    }

    useEffect(() => {
        console.log("Profile use effect running ", userId);
        checkAuthentication();
        fetchUser();
    }, [userId])

    const reloadProfile = (curId) => {
        setuserId(curId)
    }

    return (
        <div className="profile-wrapper">
            <Sidebar reloadProfile={reloadProfile}/>
            {/* {
                users.map((user) => {
                    return <ProfilePage key={user._id} user={user} reloadProfile={reloadProfile}/>
                })
            } */}
            { 
                !user && <div className="profile"><Loader/></div>
            }
            { user && <ProfilePage user={user} reloadProfile={reloadProfile}/>}
            <Widgets/>
        </div>
    )
}

export default Profile
