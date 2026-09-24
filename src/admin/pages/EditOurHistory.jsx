import '../../pages/our-history.css';
import walkImg from '../../assets/DSC02227.JPG';
import EditorPageShell from '../editor/EditorPageShell';
import Editable from '../editor/Editable';
import RichEditable from '../editor/RichEditable';
import { usePageEditor } from '../editor/PageEditorContext';
import { AddButton, DragHandle, RemoveButton } from '../editor/ListControls';
import useDragReorder from '../editor/useDragReorder';
import ImageEditable from '../editor/ImageEditable';

const BLOCK_KEYS = ['ourHistory'];

function OurHistoryCanvas() {
  const { getValue, removeItem, addItem, moveItem } = usePageEditor();
  const milestones = getValue('ourHistory', ['milestones']) || [];
  const links = getValue('ourHistory', ['press', 'links']) || [];
  const milestonesDrag = useDragReorder((from, to) => moveItem('ourHistory', ['milestones'], from, to));
  const linksDrag = useDragReorder((from, to) => moveItem('ourHistory', ['press', 'links'], from, to));

  return (
    <div className="page">
      <div className="page-hero">
        <div className="card page-hero-card">
          <Editable as="span" className="eyebrow" blockKey="ourHistory" path={['eyebrow']} />
          <h1>Our History</h1>
          <p>
            <RichEditable as="span" blockKey="ourHistory" path={['intro']} />
          </p>
        </div>
        <ImageEditable
          className="page-hero-image"
          blockKey="ourHistory"
          path={['hero', 'imageId']}
          fallbackSrc={walkImg}
          imgStyle={{ objectPosition: 'center 25%' }}
        />
      </div>

      <hr className="section-divider" />

      <h2>Milestones</h2>
      <div className="timeline">
        {milestones.map((_, index) => {
          const { className: dropClassName, ...rowProps } = milestonesDrag.getRowProps(index);
          return (
            <div className={['timeline-item mb-list-item', dropClassName].filter(Boolean).join(' ')} key={index} {...rowProps}>
              <span className="timeline-year">
                <DragHandle handleProps={milestonesDrag.getHandleProps(index)} label="Reorder milestone" />
                <Editable as="span" blockKey="ourHistory" path={['milestones', index, 'year']} />
              </span>
              <div>
                <h3>
                  <Editable as="span" blockKey="ourHistory" path={['milestones', index, 'heading']} />
                </h3>
                <p>
                  <RichEditable as="span" blockKey="ourHistory" path={['milestones', index, 'text']} />
                </p>
                <div className="mb-list-controls">
                  <RemoveButton onClick={() => removeItem('ourHistory', ['milestones'], index)} label="Remove milestone" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <AddButton
        label="Add milestone"
        onClick={() => addItem('ourHistory', ['milestones'], { year: new Date().getFullYear().toString(), heading: 'New milestone', text: 'Description here.' })}
      />

      <hr className="section-divider" />

      <h2>
        <Editable as="span" blockKey="ourHistory" path={['press', 'heading']} />
      </h2>
      <p>
        <RichEditable as="span" blockKey="ourHistory" path={['press', 'intro']} />
      </p>
      <ul>
        {links.map((link, index) => {
          const { className: dropClassName, ...rowProps } = linksDrag.getRowProps(index);
          return (
            <li key={index} className={dropClassName || undefined} {...rowProps}>
              <DragHandle handleProps={linksDrag.getHandleProps(index)} label="Reorder link" />
              <Editable as="span" blockKey="ourHistory" path={['press', 'links', index, 'name']} />
              {' — '}
              <Editable as="span" multiline blockKey="ourHistory" path={['press', 'links', index, 'description']} />
              <RemoveButton onClick={() => removeItem('ourHistory', ['press', 'links'], index)} label="Remove link" />
            </li>
          );
        })}
        <li style={{ listStyle: 'none', marginLeft: '-1.4rem' }}>
          <AddButton
            label="Add press link"
            onClick={() =>
              addItem('ourHistory', ['press', 'links'], { name: 'New Source', description: 'Description here.', href: 'https://' })
            }
          />
        </li>
      </ul>

      <div className="video-embed">
        <div style={{ padding: '1rem', background: 'var(--green-tint)', borderRadius: 'var(--radius)', textAlign: 'center' }}>
          Video embed preview (not shown here) &mdash; YouTube ID:{' '}
          <Editable as="span" blockKey="ourHistory" path={['press', 'video', 'youtubeId']} />
        </div>
      </div>
      <p className="video-caption">
        &ldquo;<Editable as="span" blockKey="ourHistory" path={['press', 'video', 'title']} />&rdquo; &mdash;{' '}
        <Editable as="span" blockKey="ourHistory" path={['press', 'video', 'source']} />
      </p>

      <p>
        <Editable as="span" multiline blockKey="ourHistory" path={['outroBefore']} />
        <Editable as="span" blockKey="ourHistory" path={['outroLinkText']} />
        <Editable as="span" multiline blockKey="ourHistory" path={['outroAfter']} />
      </p>
    </div>
  );
}

export default function EditOurHistory() {
  return (
    <EditorPageShell blockKeys={BLOCK_KEYS} title="Our History Page" liveHref={`${import.meta.env.BASE_URL}our-history`}>
      <OurHistoryCanvas />
    </EditorPageShell>
  );
}
