import React from 'react';
import MessageList from "../containers/MessageList";
import UserAside from './UserAside';

function MessageTimeLine(props) {
    return (
        <div className="my-4">
            <UserAside profileImgUrl={props.profileImgUrl} username={props.username} />
            <MessageList userId={props.userId}/>
        </div>
    )
}

export default MessageTimeLine
