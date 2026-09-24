import { useState } from 'react';
import '../../pages/past-events.css';
import Slideshow from '../../components/Slideshow';
import liftImg from '../../assets/showcase_1.jpg';
import formationImg from '../../assets/IMG_2596.JPG';
import portraitImg from '../../assets/IMG_2621.JPG';
import latinImg from '../../assets/DSC03035.JPG';
import smoothImg from '../../assets/DSC03092.JPG';
import EditorPageShell from '../editor/EditorPageShell';
import Editable from '../editor/Editable';
import ImageEditable from '../editor/ImageEditable';
import { usePageEditor } from '../editor/PageEditorContext';
import { AddButton, DragHandle, RemoveButton } from '../editor/ListControls';
import useDragReorder from '../editor/useDragReorder';
import { resolveImage } from '../../utils/resolveImage';

const BLOCK_KEYS = ['pastEvents', 'mustangball'];

const ARCHIVE_PHOTO_SLOTS = [
  { field: 'archivePhoto1ImageId', fallback: formationImg, alt: 'Three couples dancing in formation at Mustang Ball', position: 'center 25%', label: 'Photo 1' },
  { field: 'archivePhoto2ImageId', fallback: liftImg, alt: 'A dramatic lift during a Mustang Ball showcase', position: 'center 50%', label: 'Photo 2' },
  { field: 'archivePhoto3ImageId', fallback: portraitImg, alt: 'A couple dancing close together at Mustang Ball', position: 'center 13%', label: 'Photo 3' },
  { field: 'archivePhoto4ImageId', fallback: latinImg, alt: 'A couple competing in a Latin event, bib number 201, at Mustang Ball', position: 'center 27%', label: 'Photo 4' },
  { field: 'archivePhoto5ImageId', fallback: smoothImg, alt: 'A couple dancing a Smooth event at Mustang Ball', position: 'center 15%', label: 'Photo 5' },
];

// Same reasoning as EditHome's HeroSlideshowEditor: the live Slideshow
// rotates, which is a poor fit for "click the photo to replace it", so
// this mirrors it for visual parity plus a static row of replaceable
// thumbnails underneath.
function ArchiveSlideshowEditor() {
  const { getValue } = usePageEditor();
  const resolvedPhotos = ARCHIVE_PHOTO_SLOTS.map((slot) => ({
    src: resolveImage(getValue('pastEvents', [slot.field]), slot.fallback),
    alt: slot.alt,
    position: slot.position,
  }));

  return (
    <div>
      <Slideshow images={resolvedPhotos} ariaLabel="Photos from past Mustang Ball competitions" />
      <div className="mb-hero-photo-thumbs">
        {ARCHIVE_PHOTO_SLOTS.map((slot) => (
          <div key={slot.field} className="mb-hero-photo-thumb">
            <ImageEditable blockKey="pastEvents" path={[slot.field]} fallbackSrc={slot.fallback} alt={slot.label} />
            <span className="mb-hero-photo-thumb-label">{slot.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatColumnLabel(key) {
  return key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, (char) => char.toUpperCase());
}

function PastEventsCanvas() {
  const { getValue, setValue, removeItem, addItem, removeField, moveItem } = usePageEditor();
  const mustangBallData = getValue('mustangball', []) || {};
  const historyData = getValue('pastEvents', []) || {};

  const years = Object.entries(mustangBallData)
    .filter(([key, value]) => /^year\d{4}$/.test(key) && value && Object.keys(value).length > 0)
    .map(([key]) => Number(key.replace('year', '')))
    .filter((year) => Boolean(historyData[String(year)]))
    .sort((a, b) => b - a);

  const [selectedYear, setSelectedYear] = useState(years[0]);
  const effectiveYear = years.includes(selectedYear) ? selectedYear : years[0];
  const yearKey = `year${effectiveYear}`;
  const selectedYearData = mustangBallData[yearKey] || {};
  const roleColumns = Object.keys(selectedYearData).filter((c) => c !== 'resultsType' && c !== 'resultsFile');
  // One hook instance serves every role's name list for the selected year —
  // each role is its own drag "group" so a name can only reorder within
  // its own role, not drop into a different one.
  const namesDrag = useDragReorder((from, to, column) => moveItem('mustangball', [yearKey, column], from, to));

  const handleAddYear = () => {
    const input = window.prompt('New year (4 digits), e.g. 2027:');
    const year = Number(input);
    if (!input || Number.isNaN(year) || year < 1900 || year > 2200) return;
    if (historyData[String(year)]) {
      window.alert('That year already exists.');
      return;
    }
    setValue('pastEvents', [String(year)], { title: 'New Annual Mustang Ball', content: 'Click to edit dates' });
    const template = Object.fromEntries(
      Object.entries(selectedYearData)
        .filter(([key]) => key !== 'resultsType' && key !== 'resultsFile')
        .map(([key]) => [key, ['']])
    );
    setValue('mustangball', [`year${year}`], { ...template, resultsType: 'link', resultsFile: 'https://' });
    setSelectedYear(year);
  };

  const handleAddRole = () => {
    const key = window.prompt('New role name, camelCase (e.g. "headDeckCaptain"):');
    if (!key) return;
    if (selectedYearData[key]) {
      window.alert('That role already exists for this year.');
      return;
    }
    setValue('mustangball', [yearKey, key], ['']);
  };

  return (
    <div className="page">
      <ArchiveSlideshowEditor />
      <div className="history-container">
        <section className="content-area">
          <span className="eyebrow">Mustang Ball Archive</span>
          <h1>
            <Editable as="span" blockKey="pastEvents" path={[String(effectiveYear), 'title']} />
          </h1>
          <p className="page-meta">
            <Editable as="span" blockKey="pastEvents" path={[String(effectiveYear), 'content']} />
          </p>

          <div className="card">
            <div className="table-wrap">
              <table className="props-table">
                <tbody>
                  {roleColumns.map((column) => {
                    const names = Array.isArray(selectedYearData[column]) ? selectedYearData[column] : [];
                    return (
                      <tr key={column}>
                        <th scope="row">
                          {formatColumnLabel(column)}
                          <RemoveButton label="Remove role" onClick={() => removeField('mustangball', [yearKey], column)} />
                        </th>
                        <td>
                          {names.map((_, index) => {
                            const { className: dropClassName, ...rowProps } = namesDrag.getRowProps(index, column);
                            return (
                              <span
                                key={index}
                                className={dropClassName || undefined}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginRight: '0.6rem' }}
                                {...rowProps}
                              >
                                <DragHandle handleProps={namesDrag.getHandleProps(index, column)} label="Reorder name" />
                                <Editable as="span" blockKey="mustangball" path={[yearKey, column, index]} />
                                <RemoveButton onClick={() => removeItem('mustangball', [yearKey, column], index)} />
                              </span>
                            );
                          })}
                          <AddButton label="Add name" onClick={() => addItem('mustangball', [yearKey, column], 'New Name')} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mb-list-controls">
              <AddButton label="Add role" onClick={handleAddRole} />
            </div>
          </div>

          <h2>Competition Results</h2>
          <p>Results link or PDF path for this year:</p>
          <p>
            <Editable as="span" blockKey="mustangball" path={[yearKey, 'resultsFile']} />
          </p>
          <p className="mb-editor-hint-inline">
            Whether this is a PDF or a link (resultsType) can&rsquo;t be changed here &mdash; use the raw content editor.
          </p>
        </section>

        <aside className="year-tabs card" aria-label="Select Mustang Ball year">
          {years.map((year) => (
            <button
              key={year}
              type="button"
              className={`year-button ${effectiveYear === year ? 'active' : ''}`}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
          <button type="button" className="mb-list-add" style={{ marginTop: '0.5rem', width: '100%' }} onClick={handleAddYear}>
            + Add year
          </button>
        </aside>
      </div>
    </div>
  );
}

export default function EditPastEvents() {
  return (
    <EditorPageShell blockKeys={BLOCK_KEYS} title="Past Events Archive" liveHref={`${import.meta.env.BASE_URL}past-events`}>
      <PastEventsCanvas />
    </EditorPageShell>
  );
}
