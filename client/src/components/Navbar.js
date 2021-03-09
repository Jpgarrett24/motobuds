import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { FaHome, FaUserPlus, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

import AuthContext from '../auth/AuthContext';
import logo from '../assets/motobuds_title.png';

const Navbar = () => {
    const { setUser } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        setUser(null);
        <Redirect to="/" />
    }

    return (
        <header id="homeNav">
            <nav>
                <a href=".">
                    <FaHome className="homeNavIcons" />
                    <span>Home</span>
                </a>
                <a href=".">
                    <FaSignInAlt className="homeNavIcons" />
                    <span>Sign In</span>
                </a>
                <a href=".">
                    <img src={logo} alt="MotoBuds logo." />
                </a>
                <a href=".">
                    <FaUserPlus className="homeNavIcons" />
                    <span>Sign Up</span>
                </a>
                <a href="." onClick={handleLogout}>
                    <FaSignOutAlt className="homeNavIcons" />
                    <span>Log Out</span>
                </a>
            </nav>
        </header>
    )
};

export default Navbar;