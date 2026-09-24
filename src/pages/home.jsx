import { Link } from 'react-router-dom';
import './home.css';
import Slideshow from '../components/Slideshow';
import lobbyImg from '../assets/IMG_2647.JPG';
import practiceImg from '../assets/DSC01598.JPG';
import reachImg from '../assets/DSC02237.JPG';
import dipImg from '../assets/DSC02239.JPG';
import { useContentBlock } from '../content/ContentContext';
import { resolveImage } from '../utils/resolveImage';
import RichText from '../components/RichText';

export default function Home() {
  const siteInfo = useContentBlock('siteInfo');
  const { hero, promoCard, introParagraphs, milestoneParagraph, quickLinks, quickLinksCtaLabel } = useContentBlock('home');

  const heroPhotos = [
    { src: resolveImage(hero.lobbyImageId, lobbyImg), alt: 'The Mustang Ball ballroom full of dancers and spectators', position: 'center 30%' },
    { src: resolveImage(hero.practiceImageId, practiceImg), alt: 'Dancers practicing together before Mustang Ball', position: 'center 30%' },
    { src: resolveImage(hero.reachImageId, reachImg), alt: 'A couple dancing with arms outstretched at Mustang Ball', position: 'center 120%' },
  ];

  return (
    <div className="page">
      <div className="hero">
        <div className="hero-sidebar">
          <div className="card hero-card">
            <span className="eyebrow">{hero.eyebrow}</span>
            <h1>{siteInfo.eventName}</h1>
            <p className="hero-dates">{siteInfo.eventDatesRange} &middot; {siteInfo.venueShort}</p>
            <div className="btn-row">
              <Link to="/competitors" className="btn">{hero.buttonLabel}</Link>
            </div>
          </div>

          <Link to={promoCard.to} className="promo-card" style={{ backgroundImage: `url(${resolveImage(promoCard.imageId, dipImg)})` }}>
            <div className="promo-card-overlay">
              <h3>{promoCard.title}</h3>
              <RichText as="p" html={promoCard.text} />
              <span className="promo-link">{promoCard.linkLabel} &rarr;</span>
            </div>
          </Link>
        </div>

        <div className="hero-main">
          <Slideshow images={heroPhotos} className="hero-slideshow" ariaLabel="Photos from Mustang Ball" />
          {introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            <strong>{milestoneParagraph.strong}</strong>
            <RichText as="span" html={milestoneParagraph.rest} />
          </p>
        </div>
      </div>

      <hr className="section-divider" />

      <h2>Explore {siteInfo.eventName}</h2>
      <div className="quick-links">
        {quickLinks.map((link) => (
          <Link key={link.to} to={link.to} className="quick-link">
            <span className="eyebrow">{link.eyebrow}</span>
            <p>{link.description}</p>
            <span className="quick-link-cta">{quickLinksCtaLabel} &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}