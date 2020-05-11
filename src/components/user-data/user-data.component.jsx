import React from 'react';
import './user-data.styles.scss';

const UserInfo = ({userData: { isPlaying, name, type } }) => (
    <div className={isPlaying ? 'user-data show' : 'user-data hide'}>
        <div>
            <label>Watching {name} its a {type} movie </label><br></br>
            <label id="timer" ></label>
        </div>
    </div>
)

export default UserInfo;