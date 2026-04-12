import React from 'react';
import './spectators.css';
import Arial from '../assets/showcase_1.jpg';

export default function Spectators() {
    return (
        <div className="spectators-page">
            <div className="spectators-content">
                <img
                    className="arial-image"
                    src={Arial}
                    alt="Showcase couple dancing at Mustang Ball"
                />
                <div className="spectators-text">
                    <div className='tickets_info'>
                        <h2 className='ticket-title'>Tickets & Admission</h2>
                        <p>Tickets for Mustang Ball can be purchased online or at the door. There are three tiers of spectator tickets.</p>
                        <ul className='ticket_list'>
                            <li><strong>General Spectator:</strong> Access to the venue and general seating.</li>
                            <li><strong>Premium Spectator:</strong> Includes reserved front row seating during the evening session.</li>
                            <li><strong>Student Spectator:</strong> Free with valid PolyCard day of.</li>
                        </ul>
                        <p className='price_line'>Ticket prices are as follows:</p>
                        <table className="ticket-table">
                            <thead>
                                <tr>
                                    <th>Ticket Type</th>
                                    <th>In Advance Price</th>
                                    <th>Day of Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>General Spectator</td>
                                    <td>$12</td>
                                    <td>$17</td>
                                </tr>
                                <tr>
                                    <td>Premium Spectator</td>
                                    <td>$20</td>
                                    <td>$25</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>Cal Poly students who present a valid PolyCard receive free admission to the event, 
                            but cannot occupy front row seats during the evening session.</p>
                        <p className='eventbrite-line'>Tickets can be purchased through the <a href="https://www.eventbrite.com/o/28980597001" target="_blank" rel="noopener noreferrer">EventBrite</a></p>
                    </div>
                    <hr className="section-divider" />
                    <div className='Spectator Guide'>
                    </div>
                </div>
            </div>
        </div>
    );
}