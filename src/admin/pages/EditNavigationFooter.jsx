import '../../components/TopBar.css';
import '../../components/NavBar.css';
import '../../components/Footer.css';
import logoImg from '../../assets/navbar_logo.png';
import { FaCalendarAlt, FaEnvelope, FaFacebookF, FaGlobe, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import EditorPageShell from '../editor/EditorPageShell';
import Editable from '../editor/Editable';
import { usePageEditor } from '../editor/PageEditorContext';
import { AddButton, DragHandle, RemoveButton } from '../editor/ListControls';
import useDragReorder from '../editor/useDragReorder';
import ImageEditable from '../editor/ImageEditable';

const BLOCK_KEYS = ['siteInfo', 'navigation', 'footer'];

const FOOTER_SOCIAL_ICONS = {
  Instagram: <FaInstagram />,
  Facebook: <FaFacebookF />,
  CPNow: <FaGlobe />,
};

function NavFooterCanvas() {
  const { getValue, removeItem, addItem, moveItem } = usePageEditor();
  const mainNavLinks = getValue('navigation', ['mainNavLinks']) || [];
  const footerNavLinks = getValue('navigation', ['footerNavLinks']) || [];
  const footerSocialLinks = getValue('footer', ['footerSocialLinks']) || [];
  const mainNavDrag = useDragReorder((from, to) => moveItem('navigation', ['mainNavLinks'], from, to));
  const footerNavDrag = useDragReorder((from, to) => moveItem('navigation', ['footerNavLinks'], from, to));

  return (
    <div>
      <p className="mb-editor-hint-inline" style={{ margin: '1rem 1.5rem 0' }}>
        This shared header/footer appears on every page. Nav destinations ({'"'}to{'"'} / internal links)
        aren&rsquo;t editable here to avoid breaking navigation &mdash; use the raw content editor for that.
      </p>

      <div className="topbar">
        <div className="topbar-inner">
          <span>
            Cal Poly Ballroom &middot; <Editable as="span" blockKey="siteInfo" path={['cityState']} />
          </span>
          <span>Contact Us</span>
        </div>
      </div>

      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <ImageEditable className="logo-image" blockKey="siteInfo" path={['logoImageId']} fallbackSrc={logoImg} alt="Mustang Ball logo" />
          </div>
          <div className="navbar-right">
            <ul className="navbar-menu">
              {mainNavLinks.map((link, index) => {
                const { className: dropClassName, ...rowProps } = mainNavDrag.getRowProps(index);
                return (
                  <li key={index} className={['mb-list-item', dropClassName].filter(Boolean).join(' ')} {...rowProps}>
                    <DragHandle handleProps={mainNavDrag.getHandleProps(index)} label="Reorder nav link" />
                    <Editable as="span" blockKey="navigation" path={['mainNavLinks', index, 'name']} />
                    <RemoveButton onClick={() => removeItem('navigation', ['mainNavLinks'], index)} />
                  </li>
                );
              })}
            </ul>
            <span className="btn navbar-cta">
              <Editable as="span" blockKey="navigation" path={['navCta', 'label']} />
            </span>
          </div>
        </div>
      </nav>
      <div style={{ padding: '0.5rem 1.5rem 1.5rem' }}>
        <AddButton
          label="Add nav link (points to Home until set in the raw editor)"
          onClick={() => addItem('navigation', ['mainNavLinks'], { name: 'New Link', to: '/' })}
        />
      </div>

      <div style={{ padding: '0 1.5rem 1.5rem', maxWidth: 700 }}>
        <h3>Nav bar &ldquo;Get Tickets&rdquo; button link</h3>
        <p>
          <Editable as="span" blockKey="navigation" path={['navCta', 'href']} />
        </p>
      </div>

      <footer className="footer" style={{ position: 'static' }}>
        <div className="footer-container">
          <div className="footer-grid">
            <section>
              <h3 className="footer-title">
                <Editable as="span" blockKey="footer" path={['aboutHeading']} />
              </h3>
              <p className="footer-description">
                <Editable as="span" multiline blockKey="footer" path={['aboutBefore']} />
                <Editable as="span" blockKey="footer" path={['aboutLinkText']} />
                <Editable as="span" multiline blockKey="footer" path={['aboutAfter']} />
              </p>
              <div className="footer-links">
                {footerSocialLinks.map((link, index) => (
                  <div key={index} className="footer-link-button">
                    <span className="footer-link-logo" aria-hidden="true">
                      {FOOTER_SOCIAL_ICONS[link.name]}
                    </span>
                    <span>{link.name}</span>
                  </div>
                ))}
              </div>
              <p className="mb-editor-hint-inline">Social link URLs: use the raw content editor to change these.</p>
            </section>

            <section>
              <h3 className="footer-title">
                <Editable as="span" blockKey="footer" path={['exploreHeading']} />
              </h3>
              <ul className="footer-list">
                {footerNavLinks.map((link, index) => {
                  const { className: dropClassName, ...rowProps } = footerNavDrag.getRowProps(index);
                  return (
                    <li key={index} className={dropClassName || undefined} {...rowProps}>
                      <DragHandle handleProps={footerNavDrag.getHandleProps(index)} label="Reorder footer link" />
                      <Editable as="span" className="footer-nav-link" blockKey="navigation" path={['footerNavLinks', index, 'name']} />
                    </li>
                  );
                })}
              </ul>
            </section>

            <section>
              <h3 className="footer-title">
                <Editable as="span" blockKey="footer" path={['eventInfoHeading']} />
              </h3>
              <ul className="footer-list footer-list-info">
                <li>
                  <FaCalendarAlt aria-hidden="true" />
                  <Editable as="span" blockKey="siteInfo" path={['eventDatesPlain']} />
                </li>
                <li>
                  <FaMapMarkerAlt aria-hidden="true" />
                  <Editable as="span" blockKey="siteInfo" path={['venueFull']} />
                </li>
                <li>
                  <FaEnvelope aria-hidden="true" />
                  <Editable as="span" blockKey="siteInfo" path={['contactEmail']} />
                </li>
              </ul>
            </section>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} <Editable as="span" blockKey="siteInfo" path={['eventName']} />. All rights reserved.</p>
            <p>
              <Editable as="span" blockKey="footer" path={['hostedByLine']} />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function EditNavigationFooter() {
  return (
    <EditorPageShell blockKeys={BLOCK_KEYS} title="Navigation & Footer">
      <NavFooterCanvas />
    </EditorPageShell>
  );
}
