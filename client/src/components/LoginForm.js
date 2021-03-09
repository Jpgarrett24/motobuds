import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import auth from '../api/auth';

const LoginForm = ({ password, setPassword }) => {
    const [formData, setFromData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await auth.login(formData);
        if (!result.data) return setError('Invalid username and/or password.');
        localStorage.setItem('auth_token', result.data.token);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input name="email" id="email" type="email" onChange={(e) => setFromData({ ...formData, email: e.target.value })} placeholder="example@email.com" value={formData.email} />
            <label htmlFor="password">Password</label>
            <input name="password" id="password" type={password} onChange={(e) => setFromData({ ...formData, password: e.target.value })} placeholder="password" value={formData.password} />
            <span>
                {password === 'password' ?
                    <FaEye className="passwordVisible" onClick={() => setPassword('text')} /> :
                    <FaEyeSlash className="passwordVisible" onClick={() => setPassword('password')} />}
            </span>
            {error && <p>{error}</p>}
            <div>
                <button>Log In</button>
            </div>
        </form>
    )
};

export default LoginForm