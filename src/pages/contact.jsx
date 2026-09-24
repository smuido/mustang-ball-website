import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaFacebookF, FaGlobe, FaInstagram } from 'react-icons/fa';
import './contact.css';
import { useContentBlock } from '../content/ContentContext';
import RichText from '../components/RichText';

const SOCIAL_ICONS = {
    Instagram: <FaInstagram />,
    Facebook: <FaFacebookF />,
    'Cal Poly Now': <FaGlobe />,
};

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SUBMIT_COOLDOWN_SECONDS = 30;

export default function Contact() {
    const { intro, form, statusMessages, online, socialLinks: socialLinksContent } = useContentBlock('contact');
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

    const socialLinks = socialLinksContent.map((link) => ({
        ...link,
        icon: SOCIAL_ICONS[link.name],
    }));

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.website.trim()) {
            setSubmitStatus({
                type: 'success',
                message: statusMessages.success
            });
            return;
        }

        if (cooldownRemaining > 0) {
            setSubmitStatus({
                type: 'error',
                message: statusMessages.cooldown.replace('{seconds}', cooldownRemaining)
            });
            return;
        }

        if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
            setSubmitStatus({
                type: 'error',
                message: statusMessages.notConfigured
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
                message: statusMessages.success
            });
            setFormData({ name: '', email: '', subject: '', message: '', website: '' });
            setCooldownRemaining(SUBMIT_COOLDOWN_SECONDS);
        } catch {
            setSubmitStatus({
                type: 'error',
                message: statusMessages.sendFailed
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page">
            <span className="eyebrow">{intro.eyebrow}</span>
            <h1>Contact Us</h1>
            <RichText as="p" html={intro.text} />

            <div className="contact-grid">
                <div className="card">
                    <h2>{form.heading}</h2>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label htmlFor="name">{form.nameLabel}</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="email">{form.emailLabel}</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="subject">{form.subjectLabel}</label>
                        <input
                            id="subject"
                            name="subject"
                            type="text"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder={form.subjectPlaceholder}
                        />

                        <label htmlFor="message">{form.messageLabel}</label>
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
                            className="btn"
                            disabled={isSubmitting || cooldownRemaining > 0}
                        >
                            {isSubmitting
                                ? form.submitSendingLabel
                                : cooldownRemaining > 0
                                    ? form.submitCooldownLabel.replace('{seconds}', cooldownRemaining)
                                    : form.submitLabel}
                        </button>
                        {submitStatus.message && (
                            <p className={`contact-form-status ${submitStatus.type}`} role="status">
                                {submitStatus.message}
                            </p>
                        )}
                    </form>
                </div>

                <div className="card">
                    <h2>{online.heading}</h2>
                    <RichText as="p" className="social-subtitle" html={online.subtitle} />
                    <div className="social-list" role="list">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                            >
                                <span aria-hidden="true">{link.icon}</span>
                                <span>{link.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
