import { Link } from 'react-router-dom';
import './our-history.css';
import walkImg from '../assets/DSC02227.JPG';
import { useContentBlock } from '../content/ContentContext';

export default function OurHistory() {
	const { eyebrow, intro, milestones, press, outroBefore, outroLinkText, outroAfter } = useContentBlock('ourHistory');

	return (
		<div className="page">
			<div className="page-hero">
				<div className="card page-hero-card">
					<span className="eyebrow">{eyebrow}</span>
					<h1>Our History</h1>
					<p>{intro}</p>
				</div>
				<img className="page-hero-image" src={walkImg} alt="" role="presentation" style={{ objectPosition: 'center 25%' }} />
			</div>

			<hr className="section-divider" />

			<h2>Milestones</h2>
			<div className="timeline">
				{milestones.map((milestone) => (
					<div className="timeline-item" key={milestone.year}>
						<span className="timeline-year">{milestone.year}</span>
						<div>
							<h3>{milestone.heading}</h3>
							<p>{milestone.text}</p>
						</div>
					</div>
				))}
			</div>

			<hr className="section-divider" />

			<h2>{press.heading}</h2>
			<p>{press.intro}</p>
			<ul>
				{press.links.map((link) => (
					<li key={link.name}>
						<a href={link.href} target="_blank" rel="noopener noreferrer">{link.name}</a>
						{' — '}{link.description}
					</li>
				))}
			</ul>

			<div className="video-embed">
				<iframe
					src={`https://www.youtube.com/embed/${press.video.youtubeId}`}
					title={press.video.title}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			</div>
			<p className="video-caption">&ldquo;{press.video.title}&rdquo; &mdash; {press.video.source}</p>

			<p>
				{outroBefore}
				<Link to="/past-events">{outroLinkText}</Link>
				{outroAfter}
			</p>
		</div>
	);
}
