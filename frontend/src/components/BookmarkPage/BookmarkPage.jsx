import React, {useState, useEffect} from 'react';
import Loader from '../Loader/Loader';
import ProfileSaves from '../ProfileSaves/ProfileSaves';
import "./BookmarkPage.css";

function BookmarkPage() {

    const [user, setuser] = useState(null);
    const userId = localStorage.getItem('LoginId');

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
            console.log(data.user);
            setuser(data.user);
        }
    }

    useEffect(() => {
        fetchUser();
        console.log(user);
    }, [])

    return (
        <div className="bookmark">
            <div className="bookmark-header">
                <h2>Bookmarks</h2>
            </div> 

            {/* loader will show up untill user is null */}
            { 
                !user && 
                (
                    <div className="bookmark-body">
                        <Loader/>
                    </div>
                )
            }

            {/* profileSaves will render if user != null and user.saves != null */}
            {
                user && user.saves &&
                <ProfileSaves user={user}/>
            }
            
        </div>
    )
}

export default BookmarkPage
