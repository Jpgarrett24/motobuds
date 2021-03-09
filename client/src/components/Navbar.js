import React from 'react';
import { Redirect } from 'react-router-dom';
import { FaHome, FaUserPlus, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

import logo from '../assets/motobuds_title.png';

const Navbar = () => {

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        <Redirect to="/" />
    }

    return (
        <header id="homeNav">
            <nav>
                <a href="apple">
                    <FaHome className="homeNavIcons" />
                    <span>Home</span>
                </a>
                <a href="apple">
                    <FaSignInAlt className="homeNavIcons" />
                    <span>Sign In</span>
                </a>
                <a href="apple">
                    <img src={logo} alt="MotoBuds logo." />
                </a>
                <a href="apple">
                    <FaUserPlus className="homeNavIcons" />
                    <span>Sign Up</span>
                </a>
                <a href="" onClick={handleLogout}>
                    <FaSignOutAlt className="homeNavIcons" />
                    <span>Log Out</span>
                </a>
            </nav>
        </header>
    )
};

export default Navbar;