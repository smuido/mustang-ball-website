import './Footer.css';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaEnvelope, FaFacebookF, FaGlobe, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import { useContentBlock } from '../content/ContentContext';

const SOCIAL_ICONS = {
    Instagram: <FaInstagram />,
    Facebook: <FaFacebookF />,
    CPNow: <FaGlobe />,
};

export default function Footer() {
    const siteInfo = useContentBlock('siteInfo');
    const { footerNavLinks } = useContentBlock('navigation');
    const { aboutHeading, aboutBefore, aboutLinkText, aboutAfter, exploreHeading, eventInfoHeading, hostedByLine, footerSocialLinks } = useContentBlock('footer');
    const currentYear = new Date().getFullYear();
    const footerLinks = footerSocialLinks.map((link) => ({ ...link, icon: SOCIAL_ICONS[link.name] }));

    return (
        <footer className="footer" id="site-footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <section>
                        <h3 className="footer-title">{aboutHeading}</h3>
                        <p className="footer-description">
                            {aboutBefore}
                            <a href={siteInfo.cdaUrl} target="_blank" rel="noopener noreferrer" className="cda-link">{aboutLinkText}</a>
                            {aboutAfter}
                        </p>
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
                    </section>

                    <section>
                        <h3 className="footer-title">{exploreHeading}</h3>
                        <ul className="footer-list">
                            {footerNavLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.to} className="footer-nav-link">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h3 className="footer-title">{eventInfoHeading}</h3>
                        <ul className="footer-list footer-list-info">
                            <li>
                                <FaCalendarAlt aria-hidden="true" />
                                <span>{siteInfo.eventDatesPlain}</span>
                            </li>
                            <li>
                                <FaMapMarkerAlt aria-hidden="true" />
                                <span>{siteInfo.venueFull}</span>
                            </li>
                            <li>
                                <FaEnvelope aria-hidden="true" />
                                <a href={`mailto:${siteInfo.contactEmail}`} className="footer-nav-link">{siteInfo.contactEmail}</a>
                            </li>
                        </ul>
                    </section>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} {siteInfo.eventName}. All rights reserved.</p>
                    <p>{hostedByLine}</p>
                </div>
            </div>
        </footer>
    );
}
