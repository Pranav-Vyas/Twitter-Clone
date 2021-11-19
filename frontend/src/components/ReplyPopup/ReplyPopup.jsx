import React, {useState} from 'react';
import { Modal } from 'react-bootstrap';
import {Avatar, Button} from "@material-ui/core";

function ReplyPopup({ reloadFeed, show, handleClose, postId }) {

    const [tweetText, setTweetText] = useState("");
    let value ="";

    const handleOnChange = (e) => {
        value = e.target.value;
        setTweetText(value);
    }

    const handleOnClick = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:5000/api/posts", {
            mode: 'cors',  // this can ot be 'no-cors'
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "replyTo": postId
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
            if(reloadFeed) {
                reloadFeed();
            }
            
            handleClose();
            // window.location.reload();
        }
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>Reply</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="tweetbox">
                        <form method="POST">
                            <div className="tweetbox-input">
                                <Avatar src=""></Avatar>
                                <textarea onChange={handleOnChange} value={tweetText} type="text" placeholder="Reply" />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <Button type="submit" onClick={handleOnClick} disabled={!tweetText.trim()} className="tweetbox-button">Send</Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ReplyPopup
