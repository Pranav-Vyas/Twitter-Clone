import React, { useEffect, useState } from 'react';
// import {useLocation} from 'react-router-dom';
import "./Home.css";
import Feed from '../Feed/Feed';
import Sidebar from '../Sidebar/Sidebar';
import { useHistory } from 'react-router-dom';
import Widgets from '../Widgets/Widgets';

function Home() {
    // const location = useLocation();

    const history = useHistory();
    const [auth, setauth] = useState(false);

    useEffect(() => {
        console.log("home use effect");
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
                } else {
                    setauth(true);
                }

            } catch {
                history.push({
                    pathname: "/login"
                })
            }
        }
        checkAuthentication();
    }, [])

    if (auth) {
        return (
            <div className="home-wrapper">
                {/* <h1>Hello {location.state.detail.username}</h1> */}
                    <Sidebar />
                    <Feed/>            
                    <Widgets />
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default Home
