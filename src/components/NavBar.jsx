import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/navbar_logo.png';
import './NavBar.css';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                isOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">
                        <img src={logoImg} alt="Logo" className="logo-image" />
                    </Link>
                </div>
                <button className="hamburger" onClick={toggleMenu} ref={buttonRef}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul className={`navbar-menu ${isOpen ? 'active' : ''}`} ref={menuRef}>
                    <li><Link to="/competitors" onClick={() => setIsOpen(false)}>Competitors</Link></li>
                    <li><Link to="/spectators" onClick={() => setIsOpen(false)}>Spectators</Link></li>
                    <li><Link to="/past-events" onClick={() => setIsOpen(false)}>Past Events</Link></li>
                    <li><Link to="/our-history" onClick={() => setIsOpen(false)}>Our History</Link></li>
                    <li><a href="https://cpdancesport.wixsite.com/cpballroom" target="_blank" rel="noopener" onClick={() => setIsOpen(false)}>Cal Poly Ballroom</a></li>
                    <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
                </ul>
            </div>
        </nav>
    );
}