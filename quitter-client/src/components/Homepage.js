import React from 'react'
import { Link } from 'react-router-dom';
import MessageTimeLine from './MessageTimeline';

function Hompage({currentUser}) {
    if(!currentUser.isAuthenticated){
        return (
            <div className="home-hero">
                <h1>What's Happening in Quitter</h1>
                <h4>Wanna Quit ?</h4>
                <Link to="/signup" className="btn btn-lg btn-primary">sign Up</Link>
            </div>
        )
    }
    return (
        <MessageTimeLine userId={currentUser.user.id} profileImgUrl={currentUser.user.profileImgUrl} username={currentUser.user.username}/>
    )
}

export default Hompage;
