import { usePageEditor } from './PageEditorContext';
import Editable from './Editable';
import RichEditable from './RichEditable';
import { AddButton, DragHandle, RemoveButton } from './ListControls';
import useDragReorder from './useDragReorder';

// Renders an array of plain strings (paragraphs, bullets, disclaimers,
// nav-link labels, etc.) as editable list items with add/remove/reorder
// controls. Pass `rich` for full-sentence prose lists that should support
// bold/italic/links (see server/src/lib/richTextFields.js for which
// lists this is enabled on and why it must stay in sync).
export default function StringListEditor({
  blockKey,
  path,
  itemLabel = 'item',
  as = 'li',
  className,
  multiline = false,
  rich = false,
  newItemText = 'New item — click to edit.',
}) {
  const { getValue, removeItem, addItem, moveItem } = usePageEditor();
  const items = getValue(blockKey, path) || [];
  const Tag = as;
  const { getHandleProps, getRowProps } = useDragReorder((from, to) => moveItem(blockKey, path, from, to));

  return (
    <>
      {items.map((_, index) => {
        const { className: dropClassName, ...rowProps } = getRowProps(index);
        return (
          <Tag key={index} className={[className, dropClassName].filter(Boolean).join(' ')} {...rowProps}>
            <DragHandle handleProps={getHandleProps(index)} label={`Reorder ${itemLabel}`} />
            {rich ? (
              <RichEditable as="span" blockKey={blockKey} path={[...path, index]} />
            ) : (
              <Editable as="span" multiline={multiline} blockKey={blockKey} path={[...path, index]} />
            )}
            <RemoveButton onClick={() => removeItem(blockKey, path, index)} label={`Remove ${itemLabel}`} />
          </Tag>
        );
      })}
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
