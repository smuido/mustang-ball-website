import { usePageEditor } from './PageEditorContext';
import Editable from './Editable';
import { AddButton, RemoveButton } from './ListControls';

// Renders an array of plain strings (paragraphs, bullets, disclaimers,
// nav-link labels, etc.) as editable list items with add/remove controls.
export default function StringListEditor({
  blockKey,
  path,
  itemLabel = 'item',
  as = 'li',
  className,
  multiline = false,
  newItemText = 'New item — click to edit.',
}) {
  const { getValue, removeItem, addItem } = usePageEditor();
  const items = getValue(blockKey, path) || [];
  const Tag = as;

  return (
    <>
      {items.map((_, index) => (
        <Tag key={index} className={className}>
          <Editable as="span" multiline={multiline} blockKey={blockKey} path={[...path, index]} />
          <RemoveButton onClick={() => removeItem(blockKey, path, index)} label={`Remove ${itemLabel}`} />
        </Tag>
      ))}
      {as === 'li' ? (
        <li style={{ listStyle: 'none', marginLeft: '-1.4rem' }}>
          <AddButton label={`Add ${itemLabel}`} onClick={() => addItem(blockKey, path, newItemText)} />
        </li>
      ) : (
        <div className="mb-list-controls">
          <AddButton label={`Add ${itemLabel}`} onClick={() => addItem(blockKey, path, newItemText)} />
        </div>
      )}
    </>
  );
}
