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
                </div>
            </div>

            <hr className="section-divider" />

            <div className="spectators-guide">
                <h2 className='guide-title'>Spectator Guide</h2>
                <p>First time at a ballroom dance competition? There's some stuff you should know before you go! First, Mustang Ball currently offers <strong>28</strong> different dance styles! They are categorized as follows:</p>
                <table className="style-table">
                    <thead>
                        <tr>
                            <th>American Smooth</th>
                            <th>American Rhythm</th>
                            <th>International Standard</th>
                            <th>International Latin</th>
                            <th>Nightclub</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Waltz</td>
                            <td>Cha-Cha</td>
                            <td>Waltz</td>
                            <td>Cha-Cha</td>
                            <td>West Coast Swing</td>
                        </tr>
                        <tr>
                            <td>Tango</td>
                            <td>Rumba</td>
                            <td>Tango</td>
                            <td>Samba</td>
                            <td>Nightclub Two Step</td>
                        </tr>
                        <tr>
                            <td>Foxtrot</td>
                            <td>East Coast Swing</td>
                            <td>Foxtrot</td>
                            <td>Rumba</td>
                            <td>Salsa</td>
                        </tr>
                        <tr>
                            <td>Viennese Waltz</td>
                            <td>Bolero</td>
                            <td>Quickstep</td>
                            <td>Paso Doble</td>
                            <td>Bachata</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Mambo</td>
                            <td>Viennese Waltz</td>
                            <td>Jive</td>
                            <td>Merengue</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Argentine Tango</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Lindy-Hop</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Blues</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Hustle</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr className="section-divider" />
            <div className="spectators-faq">
                <h2 className='faq-title'>Frequently Asked Questions</h2>
                <h3 className='question-title'>Who can compete in Mustang Ball?</h3>
                <p>Mustang Ball is open to all amateur dancers, regardless of collegiate affiliation. In most events, dancers 
                    compete as couples. However, some events such as formation team competitions are performed by teams of dancers.</p>
                <h3 className='question-title'>How are the events judged?</h3>
                <p>During the event, up to five judges will rank the dance couples based on their skills, presentation, and showmanship. 
                    Scores from all the judges are combined to obtain the final standings. Adjudication is a subjective process (to say the least) 
                    and that is why several judges are used to ensure fairness. Depending on the number of entries, competitors may be required to 
                    compete in a series of elimination rounds (nth round, quarter and semi-final) until six couples are recalled for the final round 
                    by the judges. During the final round, the top placements are determined.</p>
                <h3 className='question-title'>How do I support my favorite Dancers?</h3>
                <p>During the competition, you will be seeing some lovely dancing. Beautiful dancing and music is one of life's great joys!
                    Applause is much appreciated anytime during the event. So don't be afraid to clap, yell and call out the number of your favorite couple.
                    We invite you to play “judge” during the competition and see if you agree with the judges results. So sit back and experience this wonderful
                    visual and aural delight.</p>
            </div>
        </div>
    );
}