import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { MdAddLocation } from 'react-icons/md';
import { AiFillDashboard } from 'react-icons/ai';

import logo from '../assets/motobuds_title.png';
import useAuth from '../auth/useAuth';

const Navbar = () => {
    const auth = useAuth();

    return (
        <header id="homeNav">
            <nav>
                <Link to="/home">
                    <AiFillDashboard className="homeNavIcons" />
                    <span>Dashboard</span>
                </Link>
                <Link to="/home">
                    <GiFullMotorcycleHelmet className="homeNavIcons" />
                    <span>My Rides</span>
                </Link>
                <Link to="/home">
                    <img src={logo} alt="MotoBuds logo." />
                </Link>
                <Link to="/home">
                    <MdAddLocation className="homeNavIcons" />
                    <span>Add Ride</span>
                </Link>
                <Link to="/home" onClick={auth.logOut}>
                    <FaSignOutAlt className="homeNavIcons" />
                    <span>Log Out</span>
                </Link>
            </nav>
        </header>
    )
};

export default Navbar;