import React from 'react';
import { Link } from 'react-scroll';
import { FaHome, FaUserPlus, FaSignInAlt, FaInfoCircle } from 'react-icons/fa';

import logo from '../assets/motobuds_title.png';

const LoginNavbar = () => {
    return (
        <header id="loginNav">
            <nav>
                <Link
                    activeClass="active"
                    duration={500}
                    smooth={true}
                    offset={-500}
                    to="Home"
                >
                    <FaHome className="loginNavIcons" />
                    <span>Home</span>
                </Link>
                <Link
                    duration={500}
                    smooth={true}
                    offset={-50}
                    to="signIn"
                >
                    <FaSignInAlt className="loginNavIcons" />
                    <span>Sign In</span>
                </Link>
                <Link
                    duration={500}
                    smooth={true}
                    offset={-50}
                    to="Home"
                >
                    <img src={logo} alt="MotoBuds logo." />
                </Link>
                <Link
                    duration={500}
                    smooth={true}
                    offset={-50}
                    to="register"
                >
                    <FaUserPlus className="loginNavIcons" />
                    <span>Sign Up</span>
                </Link>
                <Link
                    duration={500}
                    smooth={true}
                    offset={-50}
                    to="info"
                >
                    <FaInfoCircle className="loginNavIcons" />
                    <span>Info</span>
                </Link>
            </nav>
        </header>
    )
};

export default LoginNavbar;