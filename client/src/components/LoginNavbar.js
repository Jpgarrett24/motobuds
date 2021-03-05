import React from 'react';
import { Link } from 'react-scroll';
import { FaHome, FaUserPlus, FaSignInAlt, FaInfoCircle } from 'react-icons/fa';

import logo from '../assets/motobuds_title.png';

const LoginNavbar = () => {
    return (
        <header id="loginNav">
            <nav>
                <Link>
                    <FaHome className="loginNavIcons" />
                    <span>Home</span>
                </Link>
                <Link>
                    <FaSignInAlt className="loginNavIcons" />
                    <span>Sign In</span>
                </Link>
                <Link>
                    <img src={logo} alt="MotoBuds logo." />
                </Link>
                <Link>
                    <FaUserPlus className="loginNavIcons" />
                    <span>Register</span>
                </Link>
                <Link>
                    <FaInfoCircle className="loginNavIcons" />
                    <span>Info</span>
                </Link>
            </nav>
        </header>
    )
};

export default LoginNavbar;