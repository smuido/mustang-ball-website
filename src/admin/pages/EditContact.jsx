import '../../pages/contact.css';
import { FaFacebookF, FaGlobe, FaInstagram } from 'react-icons/fa';
import EditorPageShell from '../editor/EditorPageShell';
import Editable from '../editor/Editable';
import { usePageEditor } from '../editor/PageEditorContext';

const BLOCK_KEYS = ['contact'];

const SOCIAL_ICONS = {
  Instagram: <FaInstagram />,
  Facebook: <FaFacebookF />,
  'Cal Poly Now': <FaGlobe />,
};

function ContactCanvas() {
  const { getValue } = usePageEditor();
  const socialLinks = getValue('contact', ['socialLinks']) || [];

  return (
    <div className="page">
      <Editable as="span" className="eyebrow" blockKey="contact" path={['intro', 'eyebrow']} />
      <h1>Contact Us</h1>
      <p>
        <Editable as="span" multiline blockKey="contact" path={['intro', 'text']} />
      </p>

      <div className="contact-grid">
        <div className="card">
          <h2>
            <Editable as="span" blockKey="contact" path={['form', 'heading']} />
          </h2>
          <div className="contact-form">
            <label>
              <Editable as="span" blockKey="contact" path={['form', 'nameLabel']} />
            </label>
            <input type="text" disabled placeholder="(preview only)" />

            <label>
              <Editable as="span" blockKey="contact" path={['form', 'emailLabel']} />
            </label>
            <input type="text" disabled placeholder="(preview only)" />

            <label>
              <Editable as="span" blockKey="contact" path={['form', 'subjectLabel']} />
            </label>
            <input type="text" disabled placeholder="(preview only)" />
            <p className="mb-editor-hint-inline" style={{ marginTop: '-0.6rem' }}>
              Placeholder text shown in that field:{' '}
              <Editable as="span" blockKey="contact" path={['form', 'subjectPlaceholder']} />
            </p>

            <label>
              <Editable as="span" blockKey="contact" path={['form', 'messageLabel']} />
            </label>
            <textarea disabled rows="4" placeholder="(preview only)" />

            <div className="btn-row">
              <div className="btn">
                <Editable as="span" blockKey="contact" path={['form', 'submitLabel']} />
              </div>
            </div>
          </div>

          <p className="mb-editor-hint-inline">Status messages shown after submitting:</p>
          <ul>
            <li>
              Success: <Editable as="span" multiline blockKey="contact" path={['statusMessages', 'success']} />
            </li>
            <li>
              Not configured: <Editable as="span" multiline blockKey="contact" path={['statusMessages', 'notConfigured']} />
            </li>
            <li>
              Send failed: <Editable as="span" multiline blockKey="contact" path={['statusMessages', 'sendFailed']} />
            </li>
          </ul>
        </div>

        <div className="card">
          <h2>
            <Editable as="span" blockKey="contact" path={['online', 'heading']} />
          </h2>
          <p className="social-subtitle">
            <Editable as="span" multiline blockKey="contact" path={['online', 'subtitle']} />
          </p>
          <div className="social-list" role="list">
            {socialLinks.map((link, index) => (
              <div key={index} className="social-link">
                <span aria-hidden="true">{SOCIAL_ICONS[link.name]}</span>
                <span>{link.name}</span>
              </div>
            ))}
          </div>
          <p className="mb-editor-hint-inline">
            Social link URLs (and which icons appear here) can&rsquo;t be changed on this page &mdash; use the
            raw content editor for that.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function EditContact() {
  return (
    <EditorPageShell blockKeys={BLOCK_KEYS} title="Contact Page" liveHref={`${import.meta.env.BASE_URL}contact`}>
      <ContactCanvas />
    </EditorPageShell>
  );
}
