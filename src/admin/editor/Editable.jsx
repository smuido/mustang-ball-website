import { useEffect, useRef, useState } from 'react';
import { usePageEditor } from './PageEditorContext';

// Renders as the real tag (`as`) with the real page's className, so it's
// visually identical to the live site until clicked — then swaps to a
// same-styled input/textarea for editing. `path` is an array of keys/
// indices into the named content block (see pathUtils.js).
export default function Editable({
  blockKey,
  path,
  as = 'span',
  className = '',
  multiline = false,
  placeholder = 'Click to edit',
}) {
  const Tag = as;
  const { getValue, setValue } = usePageEditor();
  const value = getValue(blockKey, path) ?? '';
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      if (typeof inputRef.current.select === 'function') {
        inputRef.current.select();
      }
    }
  }, [editing]);

  const startEditing = () => {
    setDraft(value);
    setEditing(true);
  };

  const commit = () => {
    if (draft !== value) {
      setValue(blockKey, path, draft);
    }
    setEditing(false);
  };

  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  if (editing) {
    const InputTag = multiline ? 'textarea' : 'input';
    return (
      <InputTag
        ref={inputRef}
        className={`mb-editable-input ${className}`}
        style={{ font: 'inherit', color: 'inherit' }}
        value={draft}
        rows={multiline ? 3 : undefined}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            cancel();
          } else if (event.key === 'Enter' && !multiline) {
            event.preventDefault();
            commit();
          }
        }}
      />
    );
  }

  return (
    <Tag
      className={`mb-editable ${className} ${!value ? 'mb-editable-empty' : ''}`}
      onClick={startEditing}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter') startEditing();
      }}
    >
      {value || placeholder}
    </Tag>
  );
}
