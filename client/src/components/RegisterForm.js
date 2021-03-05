import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterForm = ({ password, setPassword }) => {
    return (
        <form action="">
            <div>
                <div className="nameField">
                    <label htmlFor="firstName">First Name</label>
                    <input name="firstName" id="firstName" type="text" placeholder="Evel" />
                </div>
                <div className="nameField">
                    <label htmlFor="lastName">Last Name</label>
                    <input name="lastName" id="lastName" type="text" placeholder="Knievel" />
                </div>
            </div>
            <label htmlFor="registerEmail">Email</label>
            <input name="email" id="registerEmail" type="email" placeholder="example@email.com" />
            <label htmlFor="registerPassword">Password</label>
            <input name="password" id="registerPassword" type={password} placeholder="password" />
            <span>
                {password === 'password' ?
                    <FaEye className="passwordVisible" onClick={() => setPassword('text')} /> :
                    <FaEyeSlash className="passwordVisible" onClick={() => setPassword('password')} />}
            </span>
            <label htmlFor="confirm">Confirm password</label>
            <input name="confirm" id="confirm" type={password} placeholder="confirm password" />
            {password === 'password' ?
                <FaEye className="passwordVisible" onClick={() => setPassword('text')} /> :
                <FaEyeSlash className="passwordVisible" onClick={() => setPassword('password')} />}
            <div>
                <h4>Password Requirements:</h4>
            </div>
            <div>
                <button>Sign Up</button>
            </div>
        </form>
    );
};

export default RegisterForm;