import './competitors.css';
import bibImg from '../assets/IMG_2620.JPG';
import DanceStyleTable from '../components/DanceStyleTable';
import { useContentBlock } from '../content/ContentContext';
import { resolveImage } from '../utils/resolveImage';
import RichText from '../components/RichText';

export default function Competitors() {
	const siteInfo = useContentBlock('siteInfo');
	const content = useContentBlock('competitors');

	return (
		<div className="page">
			<div className="page-hero">
				<div className="card page-hero-card">
					<h1>Competitor Guide</h1>
					<RichText as="p" html={content.intro} />
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
					<img className="page-hero-image" src={resolveImage(content.hero?.imageId, bibImg)} alt="" role="presentation" />
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
			<RichText as="p" html={content.eligibility.intro} />
			<ul>
				{content.eligibility.disqualifyingActions.map((action) => (
					<RichText as="li" key={action} html={action} />
				))}
			</ul>
			<p>
				<RichText as="span" html={content.eligibility.outroBefore} />
				<a href={`mailto:${siteInfo.contactEmail}`}>{siteInfo.contactEmail}</a>
				<RichText as="span" html={content.eligibility.outroAfter} />
			</p>

			<h2>Registration &amp; Fees</h2>
			<p>{content.registrationAndFees.intro}</p>
			<ul>
				{content.registrationAndFees.bullets.map((bullet) => (
					<RichText as="li" key={bullet} html={bullet} />
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
				<RichText as="p" className="fine-print" key={paragraph} html={paragraph} />
			))}
		</div>
	);
}
