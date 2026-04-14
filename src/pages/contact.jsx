import { useState } from 'react';
import { FaFacebookF, FaGlobe, FaInstagram } from 'react-icons/fa';
import './contact.css';

const CONTACT_EMAIL = '23smayaguido@gmail.com';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const socialLinks = [
        {
            name: 'Instagram',
            href: 'https://www.instagram.com/calpoly_ballroom/',
            icon: <FaInstagram />
        },
        {
            name: 'Facebook',
            href: 'https://www.facebook.com/calpolyballroom/',
            icon: <FaFacebookF />
        },
        {
            name: 'Cal Poly Now',
            href: 'https://now.calpoly.edu/organization/website',
            icon: <FaGlobe />
        }
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const emailSubject = formData.subject || `Message from ${formData.name}`;
        const emailBody = [
            `Name: ${formData.name}`,
            `Email: ${formData.email}`,
            '',
            formData.message
        ].join('\n');

        const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoUrl;
    };

    return (
        <section className="contact-page">
            <div className="contact-hero">
                <h1>Contact Cal Poly Ballroom about Mustang Ball</h1>
                <p>Reach us on social media or send us a message directly.</p>
            </div>

            <div className="contact-grid">
                <article className="contact-card contact-card-email">
                    <h2>Email Us</h2>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="email">Your Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="subject">Subject</label>
                        <input
                            id="subject"
                            name="subject"
                            type="text"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Questions about tickets, classes, or events"
                        />

                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="6"
                            required
                        />

                        <button type="submit" className="contact-submit-button">
                            Send Email
                        </button>
                    </form>
                </article>

                <article className="contact-card contact-card-social">
                    <h2>Find Us Online</h2>
                    <p className="social-subtitle">Follow us for announcements, event details, and updates. 
                        Feel free to reach out with any questions, comments, or concerns!</p>
                    <div className="social-list" role="list">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link-button"
                            >
                                <span className="social-link-icon" aria-hidden="true">{link.icon}</span>
                                <span>{link.name}</span>
                            </a>
                        ))}
                    </div>
                </article>
            </div>
        </section>
    );
}