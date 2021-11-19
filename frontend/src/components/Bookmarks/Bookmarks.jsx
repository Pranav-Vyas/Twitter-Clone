import React, {useEffect} from 'react';
import BookmarkPage from '../BookmarkPage/BookmarkPage';
import { useHistory  } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Widgets from '../Widgets/Widgets';
import "./Bookmarks.css";

function Bookmarks() {

    const history = useHistory();

    useEffect(() => {
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
        checkAuthentication();
    }, [])

    return (
        <div className="bookmark-wrapper">
            <Sidebar/>
            <BookmarkPage/>
            <Widgets/>
            
        </div>
    )
}

export default Bookmarks
