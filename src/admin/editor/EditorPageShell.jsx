import { Link } from 'react-router-dom';
import { PageEditorProvider, usePageEditor } from './PageEditorContext';
import EditorToolbar from './EditorToolbar';
import './editor.css';

function ShellInner({ title, liveHref, children }) {
  const { status, error, discard } = usePageEditor();

  return (
    <div className="mb-editor-shell">
      <div className="mb-editor-banner">
        <Link to="/admin">&larr; Back to Pages</Link>
        <span className="mb-editor-banner-title">Editing: {title}</span>
        {liveHref && (
          <a href={liveHref} target="_blank" rel="noopener noreferrer">
            View live page &#8599;
          </a>
        )}
      </div>

      {status === 'loading' && <p className="mb-editor-loading">Loading&hellip;</p>}

      {status === 'error' && (
        <div className="admin-form-error" role="alert" style={{ margin: '1.5rem' }}>
          <p>{error?.message || 'Failed to load this page.'}</p>
          <button type="button" className="admin-btn admin-btn-outline" onClick={discard}>
            Retry
          </button>
        </div>
      )}

      {status === 'ready' && <div className="mb-editor-canvas">{children}</div>}

      {status === 'ready' && <EditorToolbar />}
    </div>
  );
}

export default function EditorPageShell({ blockKeys, title, liveHref, children }) {
  return (
    <PageEditorProvider blockKeys={blockKeys}>
      <ShellInner title={title} liveHref={liveHref}>
        {children}
      </ShellInner>
    </PageEditorProvider>
  );
}
