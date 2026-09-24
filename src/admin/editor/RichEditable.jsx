import { useEffect, useRef, useState } from 'react';
import { usePageEditor } from './PageEditorContext';

// Like Editable, but stores/edits a small subset of HTML instead of plain
// text — for prose fields, not single-line labels. Deliberately minimal:
// a native contentEditable div with toolbar buttons using
// document.execCommand, not a full WYSIWYG framework. The server
// sanitizes whatever gets saved here down to the same allowlist (see
// server/src/lib/sanitizeContent.js, and richTextBlockFields.js for the
// wider block-level allowlist) before it's ever rendered as HTML on the
// public site, so this is a UX layer, not the security boundary.
//
// `as="span"` (the default) is for single-paragraph inline prose. Pass
// `as="div"` and `list` for a multi-paragraph block that also supports a
// bullet-list button — Enter creates a new paragraph rather than a line
// break, matching how the block reads once saved.
export default function RichEditable({ blockKey, path, as = 'span', className = '', placeholder = 'Click to edit', list = false }) {
  const Tag = as;
  const block = as !== 'span';
  const { getValue, setValue } = usePageEditor();
  const value = getValue(blockKey, path) ?? '';
  const [editing, setEditing] = useState(false);
  const editableRef = useRef(null);
  const lastCommittedRef = useRef(value);

  useEffect(() => {
    if (!editing || !editableRef.current) return;
    document.execCommand('defaultParagraphSeparator', false, 'p');
    editableRef.current.focus();
    const range = document.createRange();
    range.selectNodeContents(editableRef.current);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }, [editing]);

  const startEditing = () => {
    lastCommittedRef.current = value;
    setEditing(true);
  };

  const commit = () => {
    const html = editableRef.current?.innerHTML ?? '';
    if (html !== value) {
      setValue(blockKey, path, html);
    }
    setEditing(false);
  };

  const cancel = () => {
    if (editableRef.current) editableRef.current.innerHTML = lastCommittedRef.current;
    setEditing(false);
  };

  const exec = (command, arg) => {
    editableRef.current?.focus();
    document.execCommand(command, false, arg);
  };

  const handleLink = () => {
    const url = window.prompt('Link URL:', 'https://');
    if (url) exec('createLink', url);
  };

  if (editing) {
    return (
      <span className={`mb-rich-editable-wrap ${block ? 'mb-rich-editable-wrap-block' : ''}`}>
        <span className="mb-rich-toolbar">
          <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => exec('bold')} aria-label="Bold">
            <b>B</b>
          </button>
          <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => exec('italic')} aria-label="Italic">
            <i>I</i>
          </button>
          <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={handleLink} aria-label="Link">
            Link
          </button>
          {list && (
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => exec('insertUnorderedList')}
              aria-label="Bullet list"
            >
              &#8226; List
            </button>
          )}
        </span>
        <Tag
          ref={editableRef}
          className={`mb-editable-input mb-rich-editable ${block ? 'mb-rich-editable-block' : ''} ${className}`}
          style={{ font: 'inherit', color: 'inherit' }}
          contentEditable
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: value }}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
              cancel();
            }
          }}
        />
      </span>
    );
  }

  if (!value) {
    return (
      <Tag
        className={`mb-editable ${block ? 'mb-rich-editable-block' : ''} ${className} mb-editable-empty`}
        onClick={startEditing}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter') startEditing();
        }}
      >
        {placeholder}
      </Tag>
    );
  }

  return (
    <Tag
      className={`mb-editable ${block ? 'mb-rich-editable-block' : ''} ${className}`}
      onClick={startEditing}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter') startEditing();
      }}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}
