import React from 'react';
import Login from  '../../components/login/login.component';
import Register from  '../../components/register/register.component';

import './login.styles.scss';

const SingInAndSingUpPage = () => (
    <div className="sign-in">
        <Login />
        <Register />
    </div>
);

export default SingInAndSingUpPage;