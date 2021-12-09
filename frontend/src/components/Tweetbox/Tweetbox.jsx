import React, {useState} from 'react';
import "./Tweetbox.css";
import {Avatar, Button} from "@material-ui/core";
import {useHistory} from 'react-router-dom';

function Tweetbox({reloadFeed}) {

    const [tweetText, setTweetText] = useState("");
    const btnRef = React.createRef();
    let value = "";
    const history = useHistory();
    const LoginId = localStorage.getItem('LoginId');

    const handleOnChange = (e) => {
        value = e.target.value;
        setTweetText(value);
        // console.log(btnRef.current.prop());
    }

    const handleOnClick = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:5000/api/posts", {
            mode: 'cors',  // this can ot be 'no-cors'
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    content: tweetText
                }
            )
        });
        const data = await res.json();
        if (res.status>201 || !data) {
            alert("Not posted");
        } else {
            console.log(data.post);
            setTweetText("");
            reloadFeed();
            // window.location.reload();
        }
    }

    return (
        <div className="tweetbox">
            <form method="POST">
                <div className="tweetbox-input">
                    {/* <Avatar src={`http://localhost:5000/api/upload/${LoginId}/avatar`}></Avatar> */}
                    <Avatar src=""></Avatar>
                    <textarea onChange={handleOnChange} value={tweetText} type="text" placeholder="What's happening?" />
                </div>
                <Button type="submit" onClick={handleOnClick} ref={btnRef} disabled={!tweetText.trim()} className="tweetbox-button">Tweet</Button>
            </form>
        </div>
    )
}

export default Tweetbox
