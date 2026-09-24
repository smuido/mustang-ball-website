import { Fragment } from 'react';
import './spectators.css';
import crowdImg from '../assets/IMG_2594.JPG';
import DanceStyleTable from '../components/DanceStyleTable';
import { useContentBlock } from '../content/ContentContext';
import { resolveImage } from '../utils/resolveImage';
import RichText from '../components/RichText';

export default function Spectators() {
    const content = useContentBlock('spectators');

    return (
        <div className="page">
            <div className="page-hero">
                <div className="card page-hero-card">
                    <span className="eyebrow">Spectators</span>
                    <h1>Tickets &amp; Admission</h1>
                    <RichText as="p" html={content.ticketTiers.intro} />
                    <ul>
                        {content.ticketTiers.tiers.map((tier) => (
                            <li key={tier.name}><strong>{tier.name}:</strong> <RichText as="span" html={tier.description} /></li>
                        ))}
                    </ul>
                    <div className="btn-row">
                        <a className="btn" href={content.ticketTiers.buttonHref} target="_blank" rel="noopener noreferrer">
                            {content.ticketTiers.buttonLabel}
                        </a>
                    </div>
                </div>
                <img className="page-hero-image" src={resolveImage(content.hero?.imageId, crowdImg)} alt="" role="presentation" style={{ objectPosition: 'center 20%' }} />
            </div>

            <h2>Ticket Prices</h2>
            <div className="card">
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                {content.ticketPriceColumns.map((column) => (
                                    <th key={column}>{column}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {content.ticketPriceRows.map((row) => (
                                <tr key={row[0]}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <p>{content.afterPrices.polycardNote}</p>
            <p>
                {content.afterPrices.eventbriteBefore}
                <a href={content.ticketTiers.buttonHref} target="_blank" rel="noopener noreferrer">
                    {content.afterPrices.eventbriteLinkText}
                </a>
                {content.afterPrices.eventbriteAfter}
            </p>

            <hr className="section-divider" />

            <h2>Spectator Guide</h2>
            <p>
                {content.guide.introBefore}
                <strong>{content.guide.styleCount}</strong>
                {content.guide.introAfter}
            </p>
            <div className="card">
                <div className="table-wrap">
                    <DanceStyleTable />
                </div>
            </div>

            <p>
                {content.guide.levelsIntroBefore}
                <strong>{content.guide.levelCount}</strong>
                {content.guide.levelsIntroAfter}
            </p>
            <ul>
                {content.guide.levels.map((level, levelIndex) => (
                    levelIndex === 0 ? (
                        <li key={level}>
                            {level}
                            <ul>
                                <li>{content.guide.newcomerNote}</li>
                            </ul>
                        </li>
                    ) : (
                        <li key={level}>{level}</li>
                    )
                ))}
            </ul>
            <p>{content.guide.levelsOutro}</p>

            <hr className="section-divider" />

            <h2>Frequently Asked Questions</h2>
            {content.faq.map((item) => (
                <Fragment key={item.question}>
                    <h3>{item.question}</h3>
                    <RichText as="p" html={item.answer} />
                </Fragment>
            ))}
        </div>
    );
}
