import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiFetch, ApiError } from '../api/client';
import { CONTENT_BLOCKS } from './contentBlocksMeta';

export default function ContentEditorPage() {
  const { key } = useParams();
  const meta = CONTENT_BLOCKS.find((block) => block.key === key);

  const [loadState, setLoadState] = useState({ status: 'loading', updatedAt: null, savedText: '' });
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [saveState, setSaveState] = useState('idle'); // idle | saving | saved

  const load = useCallback(() => {
    setLoadState({ status: 'loading', updatedAt: null, savedText: '' });
    apiFetch(`/api/content/${key}`)
      .then(({ data, updatedAt }) => {
        const pretty = JSON.stringify(data, null, 2);
        setText(pretty);
        setLoadState({ status: 'ready', updatedAt, savedText: pretty });
        setError('');
      })
      .catch((err) => {
        setLoadState({ status: 'error', updatedAt: null, savedText: '' });
        setError(err instanceof ApiError ? err.message : 'Failed to load this content block.');
      });
  }, [key]);

  useEffect(() => {
    // Intentional fetch-on-mount/on-key-change: `load` also serves as the
    // "Retry" button, so it manages its own loading/error state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const isDirty = loadState.status === 'ready' && text !== loadState.savedText;

  const handleSave = async (event) => {
    event.preventDefault();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      setError('That’s not valid JSON. Check for a missing comma or bracket.');
      return;
    }
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      setError('The top level must be a JSON object, e.g. { "hero": { ... } }.');
      return;
    }

    setError('');
    setSaveState('saving');
    try {
      const result = await apiFetch(`/api/content/${key}`, { method: 'PUT', body: { data: parsed } });
      const pretty = JSON.stringify(result.data, null, 2);
      setText(pretty);
      setLoadState({ status: 'ready', updatedAt: result.updatedAt, savedText: pretty });
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 2000);
    } catch (err) {
      setSaveState('idle');
      setError(err instanceof ApiError ? err.message : 'Failed to save. Try again.');
    }
  };

  const handleRevert = () => {
    setText(loadState.savedText);
    setError('');
  };

  return (
    <div>
      <p><Link to="/admin">&larr; Back to Pages</Link></p>
      <h1>{meta?.label || key}</h1>
      {meta && <p className="admin-page-subtitle">{meta.description}</p>}

      {loadState.status === 'loading' && <p>Loading&hellip;</p>}

      {loadState.status === 'error' && (
        <div className="admin-form-error" role="alert">
          <p>{error}</p>
          <button type="button" className="btn btn-outline" onClick={load}>Retry</button>
        </div>
      )}

      {loadState.status === 'ready' && (
        <form onSubmit={handleSave} className="admin-editor-form">
          {loadState.updatedAt && (
            <p className="admin-meta-line">Last saved {new Date(loadState.updatedAt).toLocaleString()}</p>
          )}
          <p className="admin-editor-hint">
            This is the raw content for this page as JSON. Edit the text between quotes and keep the
            surrounding <code>{'{'}</code> <code>{'}'}</code> <code>[</code> <code>]</code> structure intact.
          </p>
          <textarea
            className="admin-json-editor"
            value={text}
            onChange={(event) => setText(event.target.value)}
            spellCheck={false}
            rows={24}
          />
          {error && <p className="admin-form-error" role="alert">{error}</p>}
          <div className="admin-editor-actions">
            <button type="submit" className="btn" disabled={!isDirty || saveState === 'saving'}>
              {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved ✓' : 'Save changes'}
            </button>
            <button type="button" className="btn btn-outline" onClick={handleRevert} disabled={!isDirty}>
              Revert
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
