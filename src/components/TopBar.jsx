import { Link } from 'react-router-dom';
import './TopBar.css';
import { useContentBlock } from '../content/ContentContext';

export default function TopBar() {
    const siteInfo = useContentBlock('siteInfo');
    return (
        <div className="topbar">
            <div className="topbar-inner">
                <span>Cal Poly Ballroom &middot; {siteInfo.cityState}</span>
                <Link to="/contact">Contact Us</Link>
            </div>
        </div>
    );
}
