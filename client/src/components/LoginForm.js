import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import authApi from '../api/auth';
import useAuth from '../auth/useAuth';

const LoginForm = ({ password, setPassword }) => {
    const auth = useAuth();

    const [formData, setFromData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await authApi.login(formData);
        if (result.status >= 400) return setErrors(result.data.errors);

        auth.logIn(result.data.token);
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
            {errors && <p>{errors?.message}</p>}
            <div>
                <button>Log In</button>
            </div>
        </form>
    )
};

export default LoginForm