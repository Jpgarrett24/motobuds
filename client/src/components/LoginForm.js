import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const LoginForm = ({ password, setPassword }) => {
    return (
        <form action="">
            <label htmlFor="email">Email</label>
            <input name="email" id="email" type="email" placeholder="example@email.com" />
            <label htmlFor="password">Password</label>
            <input name="password" id="password" type={password} placeholder="password" />
            <span>
                {password === 'password' ?
                    <FaEye className="passwordVisible" onClick={() => setPassword('text')} /> :
                    <FaEyeSlash className="passwordVisible" onClick={() => setPassword('password')} />}
            </span>
            <div>
                <button>Log In</button>
            </div>
        </form>
    )
};

export default LoginForm