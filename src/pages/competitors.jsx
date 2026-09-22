import './competitors.css';
import bibImg from '../assets/IMG_2620.JPG';
import DanceStyleTable from '../components/DanceStyleTable';
import { useContentBlock } from '../content/ContentContext';

export default function Competitors() {
	const siteInfo = useContentBlock('siteInfo');
	const content = useContentBlock('competitors');

	return (
		<div className="page">
			<div className="page-hero">
				<div className="card page-hero-card">
					<h1>Competitor Guide</h1>
					<p>{content.intro}</p>
					<div className="btn-row">
						{content.buttons.map((button) => (
							<a
								key={button.label}
								className={button.style === 'outline' ? 'btn btn-outline' : 'btn'}
								href={button.href}
								target={button.external ? '_blank' : undefined}
								rel={button.external ? 'noopener noreferrer' : undefined}
							>
								{button.label}
							</a>
						))}
					</div>
				</div>
				<div className="bib-frame">
					<img className="page-hero-image" src={bibImg} alt="" role="presentation" />
				</div>
			</div>

			<hr className="section-divider" />

			<h2>Events</h2>
			<p>{content.events.beforeTable}</p>
			<div className="card">
				<div className="table-wrap">
					<DanceStyleTable />
				</div>
			</div>
			<p>{content.events.afterTable}</p>

			<h2>Eligibility</h2>
			<p>{content.eligibility.intro}</p>
			<ul>
				{content.eligibility.disqualifyingActions.map((action) => (
					<li key={action}>{action}</li>
				))}
			</ul>
			<p>
				{content.eligibility.outroBefore}
				<a href={`mailto:${siteInfo.contactEmail}`}>{siteInfo.contactEmail}</a>
				{content.eligibility.outroAfter}
			</p>

			<h2>Registration &amp; Fees</h2>
			<p>{content.registrationAndFees.intro}</p>
			<ul>
				{content.registrationAndFees.bullets.map((bullet) => (
					<li key={bullet}>{bullet}</li>
				))}
			</ul>

			<h2>Cancellations &amp; Refunds</h2>
			<p>{content.cancellationsAndRefunds.text}</p>

			<h2>Formation Team Competition</h2>
			<p>{content.formationTeam.text}</p>

			<h2>Shoe &amp; Costume Policy</h2>
			<p>{content.shoeAndCostumePolicy.paragraphOne}</p>
			<p>{content.shoeAndCostumePolicy.paragraphTwo}</p>

			<hr className="section-divider" />

			<h3 className="fine-print-heading">Disclaimers</h3>
			{content.disclaimers.map((paragraph) => (
				<p className="fine-print" key={paragraph}>{paragraph}</p>
			))}
		</div>
	);
}
