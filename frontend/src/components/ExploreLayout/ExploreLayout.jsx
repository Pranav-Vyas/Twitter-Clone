import React, {useState, useEffect} from 'react';
import FollowerContainer from '../FollowerContainer/FollowerContainer';
import Loader from '../Loader/Loader';
import "./ExploreLayout.css";


function ExploreLayout() {

    const [users, setusers] = useState([]);
    const [searchText, setsearchText] = useState("");
    const [usersFlag, setusersFlag] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            const res = await fetch("http://localhost:5000/exploreRoute", {
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
                console.log("Cannot get users");
            } else {
                console.log("in fetch users ",data.results);
                setusers(data.results);
                setusersFlag(true);
            }
        }
        fetchUsers();
    }, [])

    const handleOnChange = (e) => {
        setsearchText(e.target.value);
    }

    return (
        <div className="explore">
            <div className="explore-header">
                <h2>Explore</h2>
            </div>
            <div className="explore-searchbar">
                <input onChange={handleOnChange} value={searchText} type="text" placeholder="Search Twitter"/>
            </div>

            {
                !usersFlag &&
                <Loader/>
            }
            {
                users.filter((user) => {
                    if (searchText === "") {
                        return user;
                    } else if (user.name.toLowerCase().includes(searchText.trim().toLowerCase())){
                        return user;
                    }
                }).map((user) => {
                    return <FollowerContainer key={user._id} user={user} />
                })
            }
        </div>
    )
}

export default ExploreLayout
