import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import { MdAddLocation } from 'react-icons/md';
import { AiFillDashboard } from 'react-icons/ai';

import logo from '../assets/motobuds_title.png';
import useAuth from '../auth/useAuth';
import AddTripForm from './AddTripForm';

const Navbar = () => {
    const [showForm, setShowForm] = useState(false);
    const auth = useAuth();

    return (
        <>
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
                    <div onClick={() => setShowForm(true)}>
                        <MdAddLocation className="homeNavIcons" />
                        <span>Add Ride</span>
                    </div>
                    <Link to="/home" onClick={auth.logOut}>
                        <FaSignOutAlt className="homeNavIcons" />
                        <span>Log Out</span>
                    </Link>
                </nav>
            </header>
            {showForm && <AddTripForm setShowForm={setShowForm} />}
        </>
    );
};

export default Navbar;