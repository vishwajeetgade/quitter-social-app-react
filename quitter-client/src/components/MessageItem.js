import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
const DEFAULT_PROFILE_IMG = 'https://c-cl.cdn.smule.com/rs-s-sf-4/arr/a4/aa/6ea44478-84c5-44e5-99df-a8153d2bbac6.jpg';

function MessageItem({ text, date, username, profileImgUrl, onDelete, showDelete}) {
    return (
        <div>
            <li className="list-group-item">
                <img src={profileImgUrl || DEFAULT_PROFILE_IMG} alt={username} height='100' width='100' className="timeline-image" />
                <div className="message-area">
                    <Link to='/'>@{username} &nbsp;</Link>
                    <span className="text-muted">
                        <Moment className="text-muted" format="Do MMM YYYY">
                            {date}
                        </Moment>
                    </span>
                    <p>{text}</p>
                    {
                        showDelete && <p onClick={onDelete}>delete</p>
                    }
                    
                </div>
            </li>
        </div>
    )
}

export default MessageItem
