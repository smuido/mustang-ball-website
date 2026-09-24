import '../../pages/competitors.css';
import bibImg from '../../assets/IMG_2620.JPG';
import EditorPageShell from '../editor/EditorPageShell';
import Editable from '../editor/Editable';
import RichEditable from '../editor/RichEditable';
import EditableDanceStyleTable from '../editor/EditableDanceStyleTable';
import StringListEditor from '../editor/StringListEditor';
import ImageEditable from '../editor/ImageEditable';
import { usePageEditor } from '../editor/PageEditorContext';

const BLOCK_KEYS = ['siteInfo', 'competitors', 'danceStyles'];

function CompetitorsCanvas() {
  const { getValue } = usePageEditor();
  const buttons = getValue('competitors', ['buttons']) || [];

  return (
    <div className="page">
      <div className="page-hero">
        <div className="card page-hero-card">
          <h1>Competitor Guide</h1>
          <p>
            <RichEditable as="span" blockKey="competitors" path={['intro']} />
          </p>
          <div className="btn-row">
            {buttons.map((button, index) => (
              <div key={index} className={button.style === 'outline' ? 'btn btn-outline' : 'btn'}>
                <Editable as="span" blockKey="competitors" path={['buttons', index, 'label']} />
              </div>
            ))}
          </div>
          <p className="mb-editor-hint-inline">Button links can&rsquo;t be changed here — use the raw content editor for that.</p>
        </div>
        <div className="bib-frame">
          <ImageEditable className="page-hero-image" blockKey="competitors" path={['hero', 'imageId']} fallbackSrc={bibImg} />
        </div>
      </div>

      <hr className="section-divider" />

      <h2>Events</h2>
      <p>
        <Editable as="span" multiline blockKey="competitors" path={['events', 'beforeTable']} />
      </p>
      <div className="card">
        <div className="table-wrap">
          <EditableDanceStyleTable />
        </div>
      </div>
      <p>
        <Editable as="span" multiline blockKey="competitors" path={['events', 'afterTable']} />
      </p>

      <h2>Eligibility</h2>
      <p>
        <RichEditable as="span" blockKey="competitors" path={['eligibility', 'intro']} />
      </p>
      <ul>
        <StringListEditor blockKey="competitors" path={['eligibility', 'disqualifyingActions']} itemLabel="reason" rich />
      </ul>
      <p>
        <RichEditable as="span" blockKey="competitors" path={['eligibility', 'outroBefore']} />
        <Editable as="span" blockKey="siteInfo" path={['contactEmail']} />
        <RichEditable as="span" blockKey="competitors" path={['eligibility', 'outroAfter']} />
      </p>

      <h2>Registration &amp; Fees</h2>
      <p>
        <Editable as="span" multiline blockKey="competitors" path={['registrationAndFees', 'intro']} />
      </p>
      <ul>
        <StringListEditor blockKey="competitors" path={['registrationAndFees', 'bullets']} itemLabel="bullet" rich />
      </ul>

      <h2>Cancellations &amp; Refunds</h2>
      <p>
        <Editable as="span" multiline blockKey="competitors" path={['cancellationsAndRefunds', 'text']} />
      </p>

      <h2>Formation Team Competition</h2>
      <p>
        <Editable as="span" multiline blockKey="competitors" path={['formationTeam', 'text']} />
      </p>

      <h2>Shoe &amp; Costume Policy</h2>
      <p>
        <Editable as="span" multiline blockKey="competitors" path={['shoeAndCostumePolicy', 'paragraphOne']} />
      </p>
      <p>
        <Editable as="span" multiline blockKey="competitors" path={['shoeAndCostumePolicy', 'paragraphTwo']} />
      </p>

      <hr className="section-divider" />

      <h3 className="fine-print-heading">Disclaimers</h3>
      <StringListEditor blockKey="competitors" path={['disclaimers']} itemLabel="disclaimer" as="p" className="fine-print" rich />
    </div>
  );
}

export default function EditCompetitors() {
  return (
    <EditorPageShell blockKeys={BLOCK_KEYS} title="Competitor Guide" liveHref={`${import.meta.env.BASE_URL}competitors`}>
      <CompetitorsCanvas />
    </EditorPageShell>
  );
}
