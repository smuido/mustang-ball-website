import { useState } from 'react';
import './past-events.css';
import * as mustangBallData from './mustangball';

const PastEvents = () => {
    const historyData = {
        2025: {
            title: '17th Annual Mustang Ball',
            content: 'February 1-2nd, 2025'
        },
        2024: {
            title: '16th Annual Mustang Ball',
            content: 'February 3rd, 2024'
        },
        2023: {
            title: '15th Annual Mustang Ball',
            content: 'February 11th, 2023'
        },
        2022: {
            title: '14th Annual Mustang Ball',
            content: 'February 12th, 2022'
        },
        2020: {
            title: '13th Annual Mustang Ball',
            content: 'February 1st, 2020'
        },
        2019: {
            title: '12th Annual Mustang Ball',
            content: 'February 9th, 2019'
        },
        2018: {
            title: '11th Annual Mustang Ball',
            content: 'February 3rd, 2018'
        },
        2017: {
            title: '10th Annual Mustang Ball',
            content: 'February 11th, 2017'
        },
        2016: {
            title: '9th Annual Mustang Ball',
            content: 'February 20th, 2016'
        },
        2015: {
            title: '8th Annual Mustang Ball',
            content: 'February 28th, 2015'
        },
        2014: {
            title: '7th Annual Mustang Ball',
            content: 'February 8th, 2014'
        },
        2013: {
            title: '6th Annual Mustang Ball',
            content: 'February 9th, 2013'
        },
        2012: {
            title: '5th Annual Mustang Ball',
            content: 'February 4th, 2012'
        },
        2011: {
            title: '4th Annual Mustang Ball',
            content: 'February 5th, 2011'
        },
        2007: {
            title: 'Inaugural Mustang Ball',
            content: 'February 10th, 2007'
        },
        2008: {
            title: '2nd Annual Mustang Ball',
            content: 'February 9th, 2008'
        },
        2009: {
            title: '3rd Annual Mustang Ball',
            content: 'April 4th, 2009'
        }
    };

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
        <div className="history-container">
            <section className="content-area">
                <p className="history-kicker">Mustang Ball Archive</p>
                <h1>{historyData[selectedYear].title}</h1>
                <p className="history-copy">{historyData[selectedYear].content}</p>

                <div className="history-table-wrap">
                    <table className="history-table">
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
                <div className="history-info">
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
                </div>
            </section>

            <aside className="year-tabs" aria-label="Select Mustang Ball year">
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
        );
};

export default PastEvents;