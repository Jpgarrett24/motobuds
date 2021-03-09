import React, { useState, useContext } from 'react';
import { FaBan, FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa';

import auth from '../api/auth';
import AuthContext from '../auth/AuthContext';
import usersApi from '../api/users';

const RegisterForm = ({ password, setPassword }) => {
    const { setUser } = useContext(AuthContext);

    const [formData, setFormData] = useState(
        {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirm: "",
        }
    );

    const [errors, setErrors] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let result = await usersApi.register(formData);
        if (result.status >= 400) return setErrors(result.data.errors);
        localStorage.setItem('auth_token', result.data);
        let newUser = await auth.verify(result.data);
        return setUser(newUser);
    };

    const validatePassword = (field) => {
        if (field === 'length') {
            return (
                formData.password.length >= 8 ? <FaCheck className="valid" /> : <FaBan className="invalid" />
            )
        }
        else if (field === 'uppercase') {
            for (let i = 0; i < formData.password.length; i++) {
                if ((formData.password[i]).match(/^[A-Z]*$/)) return <FaCheck className="valid" />
            }
            return <FaBan className="invalid" />
        }
        else if (field === 'lowercase') {
            for (let i = 0; i < formData.password.length; i++) {
                if ((formData.password[i]).match(/^[a-z]*$/)) return <FaCheck className="valid" />
            }
            return <FaBan className="invalid" />
        }
        else if (field === 'number') {
            for (let i = 0; i < formData.password.length; i++) {
                if ((formData.password[i]).match(/^[0-9]*$/)) return <FaCheck className="valid" />
            }
            return <FaBan className="invalid" />
        }
        else if (field === 'match') {
            return formData.password === formData.confirm ? <FaCheck className="valid" /> : <FaBan className="invalid" />
        }
        return;
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="nameField">
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Evel"
                    type="text"
                    value={formData.firstName}
                />
            </div>
            <div className="nameField">
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Knievel"
                    type="text"
                    value={formData.lastName}
                />
            </div>
            <label htmlFor="registerEmail">Email</label>
            <input
                id="registerEmail"
                name="email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@email.com"
                type="email"
                value={formData.email}
            />
            <label htmlFor="registerPassword">Password</label>
            <input
                id="registerPassword"
                name="password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="password"
                type={password}
                value={formData.password}
            />
            <span>
                {password === 'password' ?
                    <FaEye className="passwordVisible" onClick={() => setPassword('text')} /> :
                    <FaEyeSlash className="passwordVisible" onClick={() => setPassword('password')} />}
            </span>
            <label htmlFor="confirm">Confirm password</label>
            <input
                id="confirm"
                name="confirm"
                onChange={(e) => setFormData({ ...formData, confirm: e.target.value })}
                placeholder="password"
                type={password}
                value={formData.confirm}
            />
            {password === 'password' ?
                <FaEye className="passwordVisible" onClick={() => setPassword('text')} /> :
                <FaEyeSlash className="passwordVisible" onClick={() => setPassword('password')} />}
            <div>
                <h4>Password Requirements:</h4>
                <p id="validator">
                    <span>{validatePassword('length')}Minimum 8 characters</span>
                    <span>{validatePassword('uppercase')}Contains an uppercase letter</span>
                    <span>{validatePassword('lowercase')}Contains a lowercase letter</span>
                    <span>{validatePassword('number')}Contains a number</span>
                    <span>{validatePassword('match')}Passwords Match</span>
                </p>
            </div>
            <div>
                {errors &&
                    <>
                        <p id="errors">{errors?.message}</p>
                        <p id="errors">{errors?.firstName?.message}</p>
                        <p id="errors">{errors?.lastName?.message}</p>
                    </>
                }
                <button>Sign Up</button>
            </div>
        </form>
    );
};

export default RegisterForm;