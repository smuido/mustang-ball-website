import { usePageEditor } from './PageEditorContext';
import Editable from './Editable';
import { AddButton, DragHandle, RemoveButton } from './ListControls';
import useDragReorder from './useDragReorder';

// Shared by EditCompetitors and EditSpectators — both pages must
// include 'danceStyles' in their BLOCK_KEYS. Edits made from either page
// update the same underlying block, same as the live site.
export default function EditableDanceStyleTable() {
  const { getValue, removeItem, addItem, moveItem } = usePageEditor();
  const columns = getValue('danceStyles', ['danceStyleColumns']) || [];
  const rows = getValue('danceStyles', ['danceStyleRows']) || [];
  const { getHandleProps, getRowProps } = useDragReorder((from, to) =>
    moveItem('danceStyles', ['danceStyleRows'], from, to)
  );

  return (
    <>
      <table>
        <thead>
          <tr>
            <th aria-label="Reorder" />
            {columns.map((column, colIndex) => (
              <th key={colIndex}>
                <Editable as="span" blockKey="danceStyles" path={['danceStyleColumns', colIndex]} />
              </th>
            ))}
            <th aria-label="Row actions" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const { className: dropClassName, ...rowProps } = getRowProps(rowIndex);
            return (
              <tr key={rowIndex} className={dropClassName || undefined} {...rowProps}>
                <td>
                  <DragHandle handleProps={getHandleProps(rowIndex)} label="Reorder row" />
                </td>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>
                    <Editable
                      as="span"
                      blockKey="danceStyles"
                      path={['danceStyleRows', rowIndex, cellIndex]}
                      placeholder="—"
                    />
                  </td>
                ))}
                <td>
                  <RemoveButton onClick={() => removeItem('danceStyles', ['danceStyleRows'], rowIndex)} label="Remove row" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mb-list-controls">
        <AddButton label="Add row" onClick={() => addItem('danceStyles', ['danceStyleRows'], columns.map(() => ''))} />
      </div>
    </>
  );
}
