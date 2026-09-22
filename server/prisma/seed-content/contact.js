// Text shown on the Contact page. The social links reuse the URLs from
// siteInfo.js, so update a link there and it updates everywhere.
import siteInfo from './siteInfo.js';

export const intro = {
  eyebrow: 'Get In Touch',
  text: 'Reach Cal Poly Ballroom on social media or send a message directly about Mustang Ball.',
};

export const form = {
  heading: 'Email Us',
  nameLabel: 'Name',
  emailLabel: 'Your Email',
  subjectLabel: 'Subject',
  subjectPlaceholder: 'Questions about tickets, workshops, or the competition',
  messageLabel: 'Message',
  submitLabel: 'Send Email',
  submitSendingLabel: 'Sending...',
  // {seconds} is replaced with the number of seconds left to wait.
  submitCooldownLabel: 'Wait {seconds}s',
};

export const statusMessages = {
  success: 'Message sent successfully. We will get back to you soon.',
  // {seconds} is replaced with the number of seconds left to wait.
  cooldown: 'Please wait {seconds}s before sending another message.',
  notConfigured: 'Email form is not configured yet. Add EmailJS keys in your .env file.',
  sendFailed: 'Could not send message right now. Please try again in a moment.',
};

export const online = {
  heading: 'Find Us Online',
  subtitle: 'Follow us for announcements, event details, and updates. '
    + 'Feel free to reach out with any questions, comments, or concerns!',
};

// The icon for each link is chosen in contact.jsx (it needs a React
// component, which can't live in a plain data file like this one).
export const socialLinks = [
  { name: 'Instagram', href: siteInfo.instagramUrl },
  { name: 'Facebook', href: siteInfo.facebookUrl },
  { name: 'Cal Poly Now', href: siteInfo.cpNowUrl },
];
