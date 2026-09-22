import { Link } from 'react-router-dom';
import { CONTENT_BLOCKS } from './contentBlocksMeta';

export default function DashboardPage() {
  return (
    <div>
      <h1>Pages</h1>
      <p className="admin-page-subtitle">
        Pick a section below to edit its text and links. Changes go live on the website as soon as you save.
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
