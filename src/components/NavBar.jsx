import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/navbar_logo.png';
import './NavBar.css';

export default function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src={logoImg} alt="Logo" className="logo-image" />
                </div>
                <ul className="navbar-menu">
                    <li><Link to="/competitors">Competitors</Link></li>
                    <li><Link to="/spectators">Spectators</Link></li>
                    <li><Link to="/past-events">Past Events</Link></li>
                    <li><Link to="/our-history">Our History</Link></li>
                    <li><a href="https://cpdancesport.wixsite.com/cpballroom" target="_blank" rel="noopener">CP Ballroom Team</a></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>
            </div>
        </nav>
    );
}