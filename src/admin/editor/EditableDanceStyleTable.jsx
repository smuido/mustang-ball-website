import { usePageEditor } from './PageEditorContext';
import Editable from './Editable';
import { AddButton, RemoveButton } from './ListControls';

// Shared by EditCompetitors and EditSpectators — both pages must
// include 'danceStyles' in their BLOCK_KEYS. Edits made from either page
// update the same underlying block, same as the live site.
export default function EditableDanceStyleTable() {
  const { getValue, removeItem, addItem } = usePageEditor();
  const columns = getValue('danceStyles', ['danceStyleColumns']) || [];
  const rows = getValue('danceStyles', ['danceStyleRows']) || [];

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column, colIndex) => (
              <th key={colIndex}>
                <Editable as="span" blockKey="danceStyles" path={['danceStyleColumns', colIndex]} />
              </th>
            ))}
            <th aria-label="Row actions" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
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
          ))}
        </tbody>
      </table>
      <div className="mb-list-controls">
        <AddButton label="Add row" onClick={() => addItem('danceStyles', ['danceStyleRows'], columns.map(() => ''))} />
      </div>
    </>
  );
}
