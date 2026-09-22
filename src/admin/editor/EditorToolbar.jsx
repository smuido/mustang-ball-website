import { usePageEditor } from './PageEditorContext';

export default function EditorToolbar() {
  const { isDirty, save, discard, saveState, saveError } = usePageEditor();

  return (
    <div className="mb-toolbar">
      <div className="mb-toolbar-status">
        {saveError && <span className="mb-toolbar-error">{saveError}</span>}
        {!saveError && saveState === 'saved' && <span className="mb-toolbar-saved">Saved &#10003;</span>}
        {!saveError && saveState === 'idle' && isDirty && <span>Unsaved changes</span>}
      </div>
      <div className="mb-toolbar-actions">
        <button
          type="button"
          className="admin-btn admin-btn-outline"
          onClick={discard}
          disabled={!isDirty || saveState === 'saving'}
        >
          Discard changes
        </button>
        <button
          type="button"
          className="admin-btn"
          onClick={save}
          disabled={!isDirty || saveState === 'saving'}
        >
          {saveState === 'saving' ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  );
}
