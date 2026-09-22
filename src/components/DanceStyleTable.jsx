import { useContentBlock } from '../content/ContentContext';

// Renders the shared 5-style dance table. The actual dance names are
// edited through the admin dashboard's "danceStyles" content block.
export default function DanceStyleTable() {
    const { danceStyleColumns, danceStyleRows } = useContentBlock('danceStyles');
    return (
        <table>
            <thead>
                <tr>
                    {danceStyleColumns.map((column) => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {danceStyleRows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
