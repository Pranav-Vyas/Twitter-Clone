import React from 'react';
import { Timeline, Tweet } from 'react-twitter-widgets';
import "./Widgets.css";

function Widgets() {
    // <Tweet tweetId="841418541026877441" />
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
