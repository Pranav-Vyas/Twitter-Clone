import React, {useEffect, useState} from 'react';
import { useParams, useHistory  } from 'react-router-dom';
import FollowPage from '../FollowPage/FollowPage';
import Loader from '../Loader/Loader';
import Sidebar from '../Sidebar/Sidebar';
import Widgets from '../Widgets/Widgets';
import "./Follow.css";

function Follow() {

    const history = useHistory();

    // const [users, setusers] = useState([]);
    const [user, setuser] = useState(null);

    const userId = useParams().id

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

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/api/follow/getFollowers`, {
            mode: 'cors',  // this can not be 'no-cors'
            method: "GET",
            headers: new Headers({
                'Accept': "application/json",
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`,
                "userId": userId
            })
        });
        const data = await res.json();
        if (res.status > 200 || !data) {
            console.log(res.status);
            console.log("Cannot get user");
        } else {
            console.log("in follow fetch user ",data.user);
            // setusers([data.user]);
            setuser(data.user);
        }
    }

    useEffect(() => {
        checkAuthentication();
        fetchUser();
    }, [])

    return (
        <div className="follow-wrapper">
            <Sidebar/>

            {!user && <div className="follow"><Loader/></div>}
            {user && <FollowPage key={user._id} user={user}/>}

            {/* {
                users.map((user) => {
                    return <FollowPage key={user._id} user={user} />
                })
            } */}

            
            <Widgets/>
            
        </div>
    )
}

export default Follow
