import React, { useState } from 'react';
import { Link, Element } from 'react-scroll';
import { FaLongArrowAltRight } from 'react-icons/fa';

import LoginForm from '../components/LoginForm';
import LoginNavbar from '../components/LoginNavbar';
import phone from '../assets/phone.png';
import ride from '../assets/group_ride.png';
import RegisterForm from '../components/RegisterForm';
import Footer from '../components/Footer';

const LoginAndReg = () => {
    const [password, setPassword] = useState('password');

    return (
        <>
            <LoginNavbar />
            <main id="LoginAndReg">
                <Element name="Home">
                    <section id="home">
                        <div id="backgroundLogo" />
                        <div>
                            <h1>Welcome to MotoBuds!</h1>
                            <p>MotoBuds is the social networking app that allows you to easily join or create group motorcycle rides anywhere in the world.</p>
                            <p>Never ride alone again!</p>
                            <Link to="register" smooth={true} duration={500} offset={-50}>Sign Up</Link>
                        </div>
                        <div>
                            <img src={phone} alt="Cartoon of MotoBuds mobile app" />
                            <FaLongArrowAltRight id="arrowIcon" />
                            <img src={ride} alt="A group motorcyle ride" />
                        </div>
                    </section>
                </Element>
                <Element name="signIn">
                    <section id="signIn">
                        <h2>Sign In</h2>
                        <LoginForm password={password} setPassword={setPassword} />
                    </section>
                </Element>
                <Element name="register">
                    <section id="register">
                        <h2>Register</h2>
                        <RegisterForm password={password} setPassword={setPassword} />
                    </section>
                </Element>
            </main>
            <Footer />
        </>
    );
};

export default LoginAndReg;