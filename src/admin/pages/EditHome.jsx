import { useEffect, useRef, useState } from 'react';
import '../../pages/home.css';
import Slideshow from '../../components/Slideshow';
import lobbyImg from '../../assets/IMG_2647.JPG';
import practiceImg from '../../assets/DSC01598.JPG';
import reachImg from '../../assets/DSC02237.JPG';
import dipImg from '../../assets/DSC02239.JPG';
import EditorPageShell from '../editor/EditorPageShell';
import Editable from '../editor/Editable';
import { usePageEditor } from '../editor/PageEditorContext';
import { AddButton, RemoveButton } from '../editor/ListControls';

// Edits `home.introParagraphs` as one combined textarea instead of a
// separate editable box per paragraph. Paragraphs are split back out on
// blank lines when the edit is committed, so the stored shape (an array
// of paragraph strings) and the live site's rendering don't change.
function IntroParagraphsEditor() {
  const { getValue, setValue } = usePageEditor();
  const paragraphs = getValue('home', ['introParagraphs']) || [];
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editing]);

  const startEditing = () => {
    setDraft(paragraphs.join('\n\n'));
    setEditing(true);
  };

  const commit = () => {
    const next = draft.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    setValue('home', ['introParagraphs'], next);
    setEditing(false);
  };

  if (editing) {
    return (
      <textarea
        ref={textareaRef}
        className="mb-editable-input"
        style={{ font: 'inherit', color: 'inherit' }}
        rows={8}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            setEditing(false);
          }
        }}
      />
    );
  }

  return (
    <div
      className={`mb-editable ${paragraphs.length === 0 ? 'mb-editable-empty' : ''}`}
      onClick={startEditing}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter') startEditing();
      }}
    >
      {paragraphs.length > 0
        ? paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
        : 'Click to edit'}
    </div>
  );
}

const BLOCK_KEYS = ['siteInfo', 'home'];

const heroPhotos = [
  { src: lobbyImg, alt: 'The Mustang Ball ballroom full of dancers and spectators', position: 'center 30%' },
  { src: practiceImg, alt: 'Dancers practicing together before Mustang Ball', position: 'center 30%' },
  { src: reachImg, alt: 'A couple dancing with arms outstretched at Mustang Ball', position: 'center 120%' },
];

function HomeCanvas() {
  const { getValue, removeItem, addItem } = usePageEditor();
  const quickLinks = getValue('home', ['quickLinks']) || [];

  return (
    <div className="page">
      <div className="hero">
        <div className="hero-sidebar">
          <div className="card hero-card">
            <Editable as="span" className="eyebrow" blockKey="home" path={['hero', 'eyebrow']} />
            <h1>
              <Editable as="span" blockKey="siteInfo" path={['eventName']} />
            </h1>
            <p className="hero-dates">
              <Editable as="span" blockKey="siteInfo" path={['eventDatesRange']} /> &middot;{' '}
              <Editable as="span" blockKey="siteInfo" path={['venueShort']} />
            </p>
            <div className="btn-row">
              <div className="btn">
                <Editable as="span" blockKey="home" path={['hero', 'buttonLabel']} />
              </div>
            </div>
          </div>

          <div className="promo-card" style={{ backgroundImage: `url(${dipImg})` }}>
            <div className="promo-card-overlay">
              <h3>
                <Editable as="span" blockKey="home" path={['promoCard', 'title']} />
              </h3>
              <p>
                <Editable as="span" multiline blockKey="home" path={['promoCard', 'text']} />
              </p>
              <span className="promo-link">
                <Editable as="span" blockKey="home" path={['promoCard', 'linkLabel']} /> &rarr;
              </span>
            </div>
          </div>
        </div>

        <div className="hero-main">
          <Slideshow images={heroPhotos} className="hero-slideshow" ariaLabel="Photos from Mustang Ball" />

          <IntroParagraphsEditor />

          <p>
            <strong>
              <Editable as="span" blockKey="home" path={['milestoneParagraph', 'strong']} />
            </strong>
            <Editable as="span" multiline blockKey="home" path={['milestoneParagraph', 'rest']} />
          </p>
        </div>
      </div>

      <hr className="section-divider" />

      <h2>
        Explore <Editable as="span" blockKey="siteInfo" path={['eventName']} />
      </h2>
      <div className="quick-links">
        {quickLinks.map((link, index) => (
          <div key={index} className="quick-link mb-list-item">
            <Editable as="span" className="eyebrow" blockKey="home" path={['quickLinks', index, 'eyebrow']} />
            <p>
              <Editable as="span" multiline blockKey="home" path={['quickLinks', index, 'description']} />
            </p>
            <span className="quick-link-cta">
              <Editable as="span" blockKey="home" path={['quickLinksCtaLabel']} /> &rarr;
            </span>
            <div className="mb-list-controls">
              <RemoveButton onClick={() => removeItem('home', ['quickLinks'], index)} />
            </div>
          </div>
        ))}
      </div>
      <p className="mb-editor-hint-inline">
        Card links (which page each card points to) can&rsquo;t be changed here — use the raw content editor
        for that.
      </p>
      <AddButton
        label="Add card"
        onClick={() => addItem('home', ['quickLinks'], { eyebrow: 'New Card', description: 'Description here.', to: '/' })}
      />
    </div>
  );
}

export default function EditHome() {
  return (
    <EditorPageShell blockKeys={BLOCK_KEYS} title="Home Page" liveHref={import.meta.env.BASE_URL}>
      <HomeCanvas />
    </EditorPageShell>
  );
}
