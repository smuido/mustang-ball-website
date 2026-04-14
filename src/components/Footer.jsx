import './Footer.css';
import { FaFacebookF, FaGlobe, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const footerLinks = [
        { name: 'Instagram', href: 'https://www.instagram.com/calpoly_ballroom/', icon: <FaInstagram /> },
        { name: 'Facebook', href: 'https://www.facebook.com/calpolyballroom/', icon: <FaFacebookF /> },
        { name: 'CPNow', href: 'https://now.calpoly.edu/organization/website', icon: <FaGlobe /> }
    ];

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <p>&copy; {currentYear} Mustang Ball. All rights reserved.</p>
                    <div className="footer-links">
                        {footerLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="footer-link-button"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="footer-link-logo" aria-hidden="true">
                                    {link.icon}
                                </span>
                                <span>{link.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}