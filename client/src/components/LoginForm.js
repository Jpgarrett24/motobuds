import React, { useState, useContext } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import AuthContext from '../auth/AuthContext';
import auth from '../api/auth';

const LoginForm = ({ password, setPassword }) => {
    const { setUser } = useContext(AuthContext);

    const [formData, setFromData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await auth.login(formData);
        console.log(result);
        if (result.status >= 400) return setErrors(result.data.errors);
        localStorage.setItem('auth_token', result.data.token);
        const verification = await auth.verify(result.data.token);
        setUser(verification.data);
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