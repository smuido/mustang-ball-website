import '../../pages/spectators.css';
import crowdImg from '../../assets/IMG_2594.JPG';
import EditorPageShell from '../editor/EditorPageShell';
import Editable from '../editor/Editable';
import EditableDanceStyleTable from '../editor/EditableDanceStyleTable';
import { usePageEditor } from '../editor/PageEditorContext';
import { AddButton, RemoveButton } from '../editor/ListControls';

const BLOCK_KEYS = ['spectators', 'danceStyles'];

function SpectatorsCanvas() {
  const { getValue, removeItem, addItem } = usePageEditor();
  const tiers = getValue('spectators', ['ticketTiers', 'tiers']) || [];
  const priceColumns = getValue('spectators', ['ticketPriceColumns']) || [];
  const priceRows = getValue('spectators', ['ticketPriceRows']) || [];
  const levels = getValue('spectators', ['guide', 'levels']) || [];
  const faq = getValue('spectators', ['faq']) || [];

  return (
    <div className="page">
      <div className="page-hero">
        <div className="card page-hero-card">
          <span className="eyebrow">Spectators</span>
          <h1>Tickets &amp; Admission</h1>
          <p>
            <Editable as="span" multiline blockKey="spectators" path={['ticketTiers', 'intro']} />
          </p>
          <ul>
            {tiers.map((tier, index) => (
              <li key={index}>
                <strong>
                  <Editable as="span" blockKey="spectators" path={['ticketTiers', 'tiers', index, 'name']} />:
                </strong>{' '}
                <Editable as="span" multiline blockKey="spectators" path={['ticketTiers', 'tiers', index, 'description']} />
                <RemoveButton onClick={() => removeItem('spectators', ['ticketTiers', 'tiers'], index)} label="Remove tier" />
              </li>
            ))}
            <li style={{ listStyle: 'none', marginLeft: '-1.4rem' }}>
              <AddButton
                label="Add tier"
                onClick={() => addItem('spectators', ['ticketTiers', 'tiers'], { name: 'New Tier', description: 'Description here.' })}
              />
            </li>
          </ul>
          <div className="btn-row">
            <div className="btn">
              <Editable as="span" blockKey="spectators" path={['ticketTiers', 'buttonLabel']} />
            </div>
          </div>
        </div>
        <img className="page-hero-image" src={crowdImg} alt="" role="presentation" style={{ objectPosition: 'center 20%' }} />
      </div>

      <h2>Ticket Prices</h2>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {priceColumns.map((column, colIndex) => (
                  <th key={colIndex}>
                    <Editable as="span" blockKey="spectators" path={['ticketPriceColumns', colIndex]} />
                  </th>
                ))}
                <th aria-label="Row actions" />
              </tr>
            </thead>
            <tbody>
              {priceRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      <Editable as="span" blockKey="spectators" path={['ticketPriceRows', rowIndex, cellIndex]} />
                    </td>
                  ))}
                  <td>
                    <RemoveButton onClick={() => removeItem('spectators', ['ticketPriceRows'], rowIndex)} label="Remove row" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mb-list-controls">
            <AddButton
              label="Add row"
              onClick={() => addItem('spectators', ['ticketPriceRows'], priceColumns.map(() => ''))}
            />
          </div>
        </div>
      </div>
      <p>
        <Editable as="span" multiline blockKey="spectators" path={['afterPrices', 'polycardNote']} />
      </p>
      <p>
        <Editable as="span" multiline blockKey="spectators" path={['afterPrices', 'eventbriteBefore']} />
        <Editable as="span" blockKey="spectators" path={['afterPrices', 'eventbriteLinkText']} />
        <Editable as="span" multiline blockKey="spectators" path={['afterPrices', 'eventbriteAfter']} />
      </p>

      <hr className="section-divider" />

      <h2>Spectator Guide</h2>
      <p>
        <Editable as="span" multiline blockKey="spectators" path={['guide', 'introBefore']} />
        <strong>
          <Editable as="span" blockKey="spectators" path={['guide', 'styleCount']} />
        </strong>
        <Editable as="span" multiline blockKey="spectators" path={['guide', 'introAfter']} />
      </p>
      <div className="card">
        <div className="table-wrap">
          <EditableDanceStyleTable />
        </div>
      </div>

      <p>
        <Editable as="span" multiline blockKey="spectators" path={['guide', 'levelsIntroBefore']} />
        <strong>
          <Editable as="span" blockKey="spectators" path={['guide', 'levelCount']} />
        </strong>
        <Editable as="span" multiline blockKey="spectators" path={['guide', 'levelsIntroAfter']} />
      </p>
      <ul>
        {levels.map((_, index) => (
          <li key={index}>
            <Editable as="span" blockKey="spectators" path={['guide', 'levels', index]} />
            <RemoveButton onClick={() => removeItem('spectators', ['guide', 'levels'], index)} label="Remove level" />
            {index === 0 && (
              <ul>
                <li>
                  <Editable as="span" multiline blockKey="spectators" path={['guide', 'newcomerNote']} />
                </li>
              </ul>
            )}
          </li>
        ))}
        <li style={{ listStyle: 'none', marginLeft: '-1.4rem' }}>
          <AddButton label="Add level" onClick={() => addItem('spectators', ['guide', 'levels'], 'New Level')} />
        </li>
      </ul>
      <p>
        <Editable as="span" multiline blockKey="spectators" path={['guide', 'levelsOutro']} />
      </p>

      <hr className="section-divider" />

      <h2>Frequently Asked Questions</h2>
      {faq.map((_, index) => (
        <div key={index} className="mb-list-item">
          <h3>
            <Editable as="span" blockKey="spectators" path={['faq', index, 'question']} />
          </h3>
          <p>
            <Editable as="span" multiline blockKey="spectators" path={['faq', index, 'answer']} />
          </p>
          <div className="mb-list-controls">
            <RemoveButton onClick={() => removeItem('spectators', ['faq'], index)} label="Remove question" />
          </div>
        </div>
      ))}
      <AddButton
        label="Add question"
        onClick={() => addItem('spectators', ['faq'], { question: 'New question?', answer: 'Answer here.' })}
      />
    </div>
  );
}

export default function EditSpectators() {
  return (
    <EditorPageShell blockKeys={BLOCK_KEYS} title="Spectators Page" liveHref={`${import.meta.env.BASE_URL}spectators`}>
      <SpectatorsCanvas />
    </EditorPageShell>
  );
}
