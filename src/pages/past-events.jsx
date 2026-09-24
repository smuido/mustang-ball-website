import { useState } from 'react';
import './past-events.css';
import { useContentBlock } from '../content/ContentContext';
import Slideshow from '../components/Slideshow';
import liftImg from '../assets/showcase_1.jpg';
import formationImg from '../assets/IMG_2596.JPG';
import portraitImg from '../assets/IMG_2621.JPG';
import latinImg from '../assets/DSC03035.JPG';
import smoothImg from '../assets/DSC03092.JPG';
import { resolveImage } from '../utils/resolveImage';

const PastEvents = () => {
    const mustangBallData = useContentBlock('mustangball');
    const historyData = useContentBlock('pastEvents');

    const archivePhotos = [
        { src: resolveImage(historyData.archivePhoto1ImageId, formationImg), alt: 'Three couples dancing in formation at Mustang Ball', position: 'center 25%' },
        { src: resolveImage(historyData.archivePhoto2ImageId, liftImg), alt: 'A dramatic lift during a Mustang Ball showcase', position: 'center 50%' },
        { src: resolveImage(historyData.archivePhoto3ImageId, portraitImg), alt: 'A couple dancing close together at Mustang Ball', position: 'center 13%' },
        { src: resolveImage(historyData.archivePhoto4ImageId, latinImg), alt: 'A couple competing in a Latin event, bib number 201, at Mustang Ball', position: 'center 27%' },
        { src: resolveImage(historyData.archivePhoto5ImageId, smoothImg), alt: 'A couple dancing a Smooth event at Mustang Ball', position: 'center 15%' },
    ];

    const years = Object.entries(mustangBallData)
        .filter(([key, value]) => /^year\d{4}$/.test(key) && value && Object.keys(value).length > 0)
        .map(([key]) => Number(key.replace('year', '')))
        .filter((year) => Boolean(historyData[year]))
        .sort((a, b) => b - a);

    const [selectedYear, setSelectedYear] = useState(years[0]);
    const selectedYearData = mustangBallData[`year${selectedYear}`] || {};
    const selectedYearColumns = Object.keys(selectedYearData).filter(
        (column) => column !== 'resultsType' && column !== 'resultsFile'
    );
    const selectedYearResultType = selectedYearData.resultsType || historyData[selectedYear].type;

    const formatColumnLabel = (key) =>
        key
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <div className="page">
            <Slideshow images={archivePhotos} ariaLabel="Photos from past Mustang Ball competitions" />
            <div className="history-container">
            <section className="content-area">
                <span className="eyebrow">Mustang Ball Archive</span>
                <h1>{historyData[selectedYear].title}</h1>
                <p className="page-meta">{historyData[selectedYear].content}</p>

                <div className="card">
                    <div className="table-wrap">
                        <table className="props-table">
                            <tbody>
                                {selectedYearColumns.map((column) => (
                                    <tr key={column}>
                                        <th scope="row">{formatColumnLabel(column)}</th>
                                        <td>{Array.isArray(selectedYearData[column]) ? selectedYearData[column].join(', ') : String(selectedYearData[column])}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <h2>Competition Results</h2>
                {selectedYearResultType === 'PDF' && (
                    <>
                        <p>Below is the PDF of competition results.</p>
                        <p><a href={selectedYearData.resultsFile} target="_blank" rel="noopener noreferrer">Mustang Ball Results</a></p>
                    </>
                )}
                {selectedYearResultType === 'link' && (
                    <>
                        <p>Below is the link to competition results.</p>
                        <p><a href={selectedYearData.resultsFile} target="_blank" rel="noopener noreferrer">Mustang Ball Results</a></p>
                    </>
                )}
            </section>

            <aside className="year-tabs card" aria-label="Select Mustang Ball year">
                {years.map((year) => (
                    <button
                        key={year}
                        className={`year-button ${selectedYear === year ? 'active' : ''}`}
                        onClick={() => setSelectedYear(year)}
                    >
                        {year}
                    </button>
                ))}
            </aside>
            </div>
        </div>
        );
};

export default PastEvents;
