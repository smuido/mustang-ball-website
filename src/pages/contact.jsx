import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaFacebookF, FaGlobe, FaInstagram } from 'react-icons/fa';
import './contact.css';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SUBMIT_COOLDOWN_SECONDS = 30;

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
    const [cooldownRemaining, setCooldownRemaining] = useState(0);

    useEffect(() => {
        if (cooldownRemaining <= 0) {
            return undefined;
        }

        const timer = window.setInterval(() => {
            setCooldownRemaining((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => window.clearInterval(timer);
    }, [cooldownRemaining]);

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.website.trim()) {
            setSubmitStatus({
                type: 'success',
                message: 'Message sent successfully. We will get back to you soon.'
            });
            return;
        }

        if (cooldownRemaining > 0) {
            setSubmitStatus({
                type: 'error',
                message: `Please wait ${cooldownRemaining}s before sending another message.`
            });
            return;
        }

        if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
            setSubmitStatus({
                type: 'error',
                message: 'Email form is not configured yet. Add EmailJS keys in your .env file.'
            });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        const normalizedSubject = formData.subject || `Message from ${formData.name}`;
        const fullMessage = [
            `Name: ${formData.name}`,
            `Email: ${formData.email}`,
            `Subject: ${normalizedSubject}`,
            '',
            formData.message
        ].join('\n');

        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    name: formData.name,
                    email: formData.email,
                    from: formData.email,
                    from_name: formData.name,
                    from_email: formData.email,
                    reply_to: formData.email,
                    subject: normalizedSubject,
                    message: formData.message,
                    full_message: fullMessage,
                    details: fullMessage
                },
                EMAILJS_PUBLIC_KEY
            );

            setSubmitStatus({
                type: 'success',
                message: 'Message sent successfully. We will get back to you soon.'
            });
            setFormData({ name: '', email: '', subject: '', message: '', website: '' });
            setCooldownRemaining(SUBMIT_COOLDOWN_SECONDS);
        } catch {
            setSubmitStatus({
                type: 'error',
                message: 'Could not send message right now. Please try again in a moment.'
            });
        } finally {
            setIsSubmitting(false);
        }
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

                        <label htmlFor="website" className="form-honeypot-label">Website</label>
                        <input
                            id="website"
                            name="website"
                            type="text"
                            value={formData.website}
                            onChange={handleChange}
                            autoComplete="off"
                            tabIndex="-1"
                            className="form-honeypot-input"
                            aria-hidden="true"
                        />

                        <button
                            type="submit"
                            className="contact-submit-button"
                            disabled={isSubmitting || cooldownRemaining > 0}
                        >
                            {isSubmitting
                                ? 'Sending...'
                                : cooldownRemaining > 0
                                    ? `Wait ${cooldownRemaining}s`
                                    : 'Send Email'}
                        </button>
                        {submitStatus.message && (
                            <p className={`contact-form-status ${submitStatus.type}`} role="status">
                                {submitStatus.message}
                            </p>
                        )}
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