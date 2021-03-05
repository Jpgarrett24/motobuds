import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { FaLongArrowAltRight, FaEye, FaEyeSlash } from 'react-icons/fa'

import LoginNavbar from '../components/LoginNavbar';
import phone from '../assets/phone.png';
import ride from '../assets/group_ride.png';

const LoginAndReg = () => {
    const [password, setPassword] = useState('password')

    return (
        <>
            <LoginNavbar />
            <main id="LoginAndReg">
                <section id="home">
                    <div id="backgroundLogo" />
                    <div>
                        <h1>Welcome to MotoBuds!</h1>
                        <p>MotoBuds is the social networking app that allows you to easily join or create group motorcycle rides in your area.</p>
                        <p>Never ride alone again!</p>
                        <Link>Sign Up</Link>
                    </div>
                    <div>
                        <img src={phone} alt="Cartoon of MotoBuds mobile app" />
                        <FaLongArrowAltRight id="arrowIcon" />
                        <img src={ride} alt="A group motorcyle ride" />
                    </div>
                </section>
                <section id="signIn">
                    <h2>Sign In</h2>
                    <form action="">
                        <label htmlFor="email">Email</label>
                        <input name="email" id="email" type="email" placeholder="example@email.com" />
                        <label htmlFor="">Password</label>
                        <input name="password" id="password" type={password} placeholder="password" />
                        <span>{password === 'password' ? <FaEye className="passwordVisible" /> : <FaEyeSlash className="passwordVisible" />}</span>
                    </form>
                </section>
            </main>
        </>
    );
};

export default LoginAndReg;