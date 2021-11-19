import React, {useState} from 'react';
import "./FollowPage.css";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import FollowerContainer from '../FollowerContainer/FollowerContainer';

function FollowPage({user}) {

    const [selectedTab, setselectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setselectedTab(newValue);
    };

    return (
        <div className="follow">
            <div className="follow-header">
                <h2>{user.name}</h2>
            </div>
            <div className="follow-tabs">
                <Tabs indicatorColor="primary" value={selectedTab} onChange={handleChange} variant="fullWidth">
                    <Tab className="profile-tab" label="Followers" />
                    <Tab className="profile-tab" label="Following" />
                </Tabs>
            </div>

            {
                selectedTab === 0 &&
                user.followers.map((follower) => {
                    console.log(follower);
                    return <FollowerContainer user={follower}/>
                })
                
            }
            
            {
                selectedTab === 1 &&
                user.following.map((following) => {
                    return <FollowerContainer user={following}/>
                })
            }

        </div>
    )
}

export default FollowPage
