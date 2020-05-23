import React from 'react';
import './login-info.styles.scss';

const LoginInfo = ({ userName }) => (
    <div className={`login-info ${userName ? '': 'hide'}`} >
        <label> Logged in as:  { userName } </label>
    </div>
)

export default LoginInfo;