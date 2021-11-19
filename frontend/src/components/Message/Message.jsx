import React from 'react';
import "./Message.css";
import {Avatar} from "@material-ui/core";

function Message({message, own}) {

    function timeDifference(current, previous) {

        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
    
        var elapsed = current - previous;
    
        if (elapsed < msPerMinute) {
            return 'Just now';   
        }
    
        else if (elapsed < msPerHour) {
             return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
    
        else if (elapsed < msPerDay ) {
             return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }
    
        else if (elapsed < msPerMonth) {
            return Math.round(elapsed/msPerDay) + ' days ago';   
        }
    
        else if (elapsed < msPerYear) {
            return Math.round(elapsed/msPerMonth) + ' months ago';   
        }
    
        else {
            return Math.round(elapsed/msPerYear ) + ' years ago';   
        }
    }

    // console.log("in message ",message);

    return (
        <div className={own ? "message own" : "message"}>
            <div className="message-top">
                {/* <Avatar src=""></Avatar> */}
                <p>{message.text}</p>
            </div>
            <span>{timeDifference(new Date(), new Date(message.createdAt))}</span>
        </div>
    )
}

export default Message
