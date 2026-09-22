import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/navbar_logo.png';
import './NavBar.css';
import { useContentBlock } from '../content/ContentContext';

export default function NavBar() {
    const { mainNavLinks, navCta } = useContentBlock('navigation');
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
                        <img src={logoImg} alt="Mustang Ball logo" className="logo-image" />
                    </Link>
                </div>

                <div className="navbar-right">
                    <ul className={`navbar-menu ${isOpen ? 'active' : ''}`} ref={menuRef}>
                        {mainNavLinks.map((link) => (
                            <li key={link.name}>
                                {link.external ? (
                                    <a href={link.href} target="_blank" rel="noopener" onClick={() => setIsOpen(false)}>
                                        {link.name}
                                    </a>
                                ) : (
                                    <Link to={link.to} onClick={() => setIsOpen(false)}>
                                        {link.name}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                    <a href={navCta.href} target="_blank" rel="noopener noreferrer" className="btn navbar-cta">{navCta.label}</a>
                    <button className="hamburger" onClick={toggleMenu} ref={buttonRef} aria-label="Toggle menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
