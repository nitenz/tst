import React from 'react';
import './user-data.styles.scss';

const UserInfo = ({userData: {username, isWatching, name, type } }) => (
    <div className={isWatching ? 'user-data show' : 'user-data hide'}>
        <div>
            <label>{username} is watching {name} its a {type} movie </label><br></br>
            <label id="timer" ></label>
        </div>
    </div>
)

export default UserInfo;