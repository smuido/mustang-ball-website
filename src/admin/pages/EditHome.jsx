import { useEffect, useRef, useState } from 'react';
import '../../pages/home.css';
import Slideshow from '../../components/Slideshow';
import lobbyImg from '../../assets/IMG_2647.JPG';
import practiceImg from '../../assets/DSC01598.JPG';
import reachImg from '../../assets/DSC02237.JPG';
import dipImg from '../../assets/DSC02239.JPG';
import EditorPageShell from '../editor/EditorPageShell';
import Editable from '../editor/Editable';
import RichEditable from '../editor/RichEditable';
import ImageEditable from '../editor/ImageEditable';
import useImageUpload from '../editor/useImageUpload';
import { usePageEditor } from '../editor/PageEditorContext';
import { AddButton, DragHandle, RemoveButton } from '../editor/ListControls';
import useDragReorder from '../editor/useDragReorder';
import { resolveImage } from '../../utils/resolveImage';

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

const HERO_PHOTO_SLOTS = [
  { field: 'lobbyImageId', fallback: lobbyImg, alt: 'The Mustang Ball ballroom full of dancers and spectators', position: 'center 30%', label: 'Photo 1' },
  { field: 'practiceImageId', fallback: practiceImg, alt: 'Dancers practicing together before Mustang Ball', position: 'center 30%', label: 'Photo 2' },
  { field: 'reachImageId', fallback: reachImg, alt: 'A couple dancing with arms outstretched at Mustang Ball', position: 'center 120%', label: 'Photo 3' },
];

// The live hero uses a rotating Slideshow, which is a poor fit for
// "click the photo to replace it" — the photo you want might not be the
// one currently showing. Instead: mirror the Slideshow for visual parity
// (using whatever's been uploaded so far), plus a static row of labeled
// thumbnails underneath, each independently replaceable.
function HeroSlideshowEditor() {
  const { getValue } = usePageEditor();
  const resolvedPhotos = HERO_PHOTO_SLOTS.map((slot) => ({
    src: resolveImage(getValue('home', ['hero', slot.field]), slot.fallback),
    alt: slot.alt,
    position: slot.position,
  }));

  return (
    <div>
      <Slideshow images={resolvedPhotos} className="hero-slideshow" ariaLabel="Photos from Mustang Ball" />
      <div className="mb-hero-photo-thumbs">
        {HERO_PHOTO_SLOTS.map((slot) => (
          <div key={slot.field} className="mb-hero-photo-thumb">
            <ImageEditable blockKey="home" path={['hero', slot.field]} fallbackSrc={slot.fallback} alt={slot.label} />
            <span className="mb-hero-photo-thumb-label">{slot.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// The promo card's photo is a CSS background with other Editable text
// fields layered on top of it — a full-cover replace overlay (like
// ImageEditable's) would block clicking those, so this uses the small
// corner-button pattern instead.
function PromoCardImageEditor() {
  const { setValue } = usePageEditor();
  const { uploading, error, upload } = useImageUpload();
  const inputRef = useRef(null);

  const handleChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const id = await upload(file);
    if (id) setValue('home', ['promoCard', 'imageId'], id);
  };

  return (
    <>
      <button
        type="button"
        className="mb-image-replace-corner"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? 'Uploading…' : 'Replace photo'}
      </button>
      {error && <span className="mb-image-editable-error">{error}</span>}
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleChange} />
    </>
  );
}

function HomeCanvas() {
  const { getValue, removeItem, addItem, moveItem } = usePageEditor();
  const quickLinks = getValue('home', ['quickLinks']) || [];
  const quickLinksDrag = useDragReorder((from, to) => moveItem('home', ['quickLinks'], from, to));

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

          <div className="promo-card" style={{ backgroundImage: `url(${resolveImage(getValue('home', ['promoCard', 'imageId']), dipImg)})` }}>
            <div className="promo-card-overlay">
              <h3>
                <Editable as="span" blockKey="home" path={['promoCard', 'title']} />
              </h3>
              <p>
                <RichEditable as="span" blockKey="home" path={['promoCard', 'text']} />
              </p>
              <span className="promo-link">
                <Editable as="span" blockKey="home" path={['promoCard', 'linkLabel']} /> &rarr;
              </span>
            </div>
            <PromoCardImageEditor />
          </div>
        </div>

        <div className="hero-main">
          <HeroSlideshowEditor />

          <IntroParagraphsEditor />

          <p>
            <strong>
              <Editable as="span" blockKey="home" path={['milestoneParagraph', 'strong']} />
            </strong>
            <RichEditable as="span" blockKey="home" path={['milestoneParagraph', 'rest']} />
          </p>
        </div>
      </div>

      <hr className="section-divider" />

      <h2>
        Explore <Editable as="span" blockKey="siteInfo" path={['eventName']} />
      </h2>
      <div className="quick-links">
        {quickLinks.map((link, index) => {
          const { className: dropClassName, ...rowProps } = quickLinksDrag.getRowProps(index);
          return (
            <div key={index} className={['quick-link mb-list-item', dropClassName].filter(Boolean).join(' ')} {...rowProps}>
              <DragHandle handleProps={quickLinksDrag.getHandleProps(index)} label="Reorder card" />
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
          );
        })}
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
