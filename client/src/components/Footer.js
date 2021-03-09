import React from 'react'
import { Element } from 'react-scroll'
import { FaCopyright } from 'react-icons/fa'

import gly from '../assets/glygalaxy.png'

const Footer = () => {
    return (
        <Element name="info">
            <footer>
                <p><FaCopyright /> G-Ly Developers Freelance Group 2021</p>
                <a href="https://www.glydevs.com" target="_blank" rel="noreferrer">
                    <img src={gly} alt="G-Ly Developers Freelance Group logo" />
                </a>
            </footer>
        </Element>
    );
};

export default Footer;