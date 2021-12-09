import React from 'react';
import { Timeline, Tweet } from 'react-twitter-widgets';
import "./Widgets.css";

function Widgets() {
    
    // const [posts, setposts] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const token = localStorage.getItem('token');
    //         const res = await fetch("http://localhost:5000/api/posts/widgets", {
    //             mode: 'cors',  // this can not be 'no-cors'
    //             method: "GET",
    //             headers: new Headers({
    //                 'Accept': "application/json",
    //                 "content-type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             })
    //         });
    //         const data = await res.json();
    //         if (res.status > 200 || !data) {
    //             console.log(res.status);
    //             alert("Cannot get posts in widgets");
    //         } else {
    //             setposts(data.results);
    //             console.log(data.results);
    //             // setpostFlag(true);
    //         }
    //     }
        
    //     fetchData();
    // }, [])

    return (
        <div className="widget">
            <Tweet tweetId="841418541026877441" />
            <Timeline
                dataSource={{
                    sourceType: 'profile',
                    screenName: 'TwitterDev'
                }}
                options={{
                    height: '350'
                }}
            />

        </div>
    )
}

export default Widgets
