import { Link } from 'react-router-dom';
import { SITE_PAGES } from './pagesMeta';
import { CONTENT_BLOCKS } from './contentBlocksMeta';

export default function DashboardPage() {
  return (
    <div>
      <h1>Pages</h1>
      <p className="admin-page-subtitle">
        Pick a page below to edit it &mdash; it looks like the live site; click any text to edit it in place.
        Changes go live as soon as you save.
      </p>
      <div className="admin-card-grid">
        {SITE_PAGES.map((page) => (
          <Link key={page.path} to={page.path} className="admin-card">
            <h2>{page.label}</h2>
            <p>{page.description}</p>
          </Link>
        ))}
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>Advanced: raw content blocks</h2>
      <p className="admin-page-subtitle">
        Every page above is built from these underlying JSON blocks. Most edits belong on the pages, but a few
        things (nav destinations, social link URLs, which icon shows where) only make sense to change here.
      </p>
      <div className="admin-card-grid">
        {CONTENT_BLOCKS.map((block) => (
          <Link key={block.key} to={`/admin/content/${block.key}`} className="admin-card">
            <h2>{block.label}</h2>
            <p>{block.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
