import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <p>&copy; {currentYear} Mustang Ball. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="#privacy">Privacy</a>
                        <a href="#terms">Terms</a>
                        <a href="#contact">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}