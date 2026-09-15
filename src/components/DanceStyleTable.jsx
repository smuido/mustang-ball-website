import { danceStyleColumns, danceStyleRows } from '../content/danceStyles';

// Renders the shared 5-style dance table. The actual dance names live in
// src/content/danceStyles.js — edit that file, not this one.
export default function DanceStyleTable() {
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
