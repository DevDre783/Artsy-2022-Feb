import React from 'react';
import './Footer.css';
import { useState } from "react"
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaGithub, FaLinkedin } from 'react-icons/fa';


function Footer () {
    return (
        <div className='footer__container'>
            <footer>
                <div className="footer__content">
                    <a target="_blank" rel="noreferrer" href='https://github.com/DevDre783'><FaGithub className='github__icon'/></a>
                    <a target="_blank" rel="noreferrer" href='https://www.linkedin.com/in/andres-soca-23852aab/'><FaLinkedin className='linkedIn__icon'/></a>
                </div>
            </footer>
        </div>

    )
}

export default Footer;
