import { Link } from 'react-router-dom';
import './TopBar.css';
import siteInfo from '../content/siteInfo';

export default function TopBar() {
    return (
        <div className="topbar">
            <div className="topbar-inner">
                <span>Cal Poly Ballroom &middot; {siteInfo.cityState}</span>
                <Link to="/contact">Contact Us</Link>
            </div>
        </div>
    );
}
