import React from 'react';
const DEFAULT_PROFILE_IMG = 'https://c-cl.cdn.smule.com/rs-s-sf-4/arr/a4/aa/6ea44478-84c5-44e5-99df-a8153d2bbac6.jpg';

function UserAside({profileImgUrl, username}) {
    return (
        <aside className="col-sm-4">
            <div className="panel panel-default">
                <div className="panel-body">
                    <img 
                    src={profileImgUrl || DEFAULT_PROFILE_IMG} 
                    alt={`${username}-image`} 
                    width="200"
                    height="200"
                    className="img-thumbnail"
                    />
                    <div>{`@${username}`}</div>
                </div>
            </div>
        </aside>
    )
}

export default UserAside
