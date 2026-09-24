import { useRef } from 'react';
import { usePageEditor } from './PageEditorContext';
import useImageUpload from './useImageUpload';
import { resolveImage } from '../../utils/resolveImage';

// Click-to-replace version of a plain <img>. `path` points to where the
// uploaded image's id is stored in content JSON; `fallbackSrc` is the
// existing bundled Vite asset, shown until an admin uploads a
// replacement — old content rows have no value at `path` yet, so
// `getValue` returning undefined falls straight back to it (no data
// migration needed).
export default function ImageEditable({ blockKey, path, fallbackSrc, alt = '', className, imgStyle }) {
  const { getValue, setValue } = usePageEditor();
  const imageId = getValue(blockKey, path);
  const { uploading, error, upload } = useImageUpload();
  const inputRef = useRef(null);

  const handleChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const id = await upload(file);
    if (id) setValue(blockKey, path, id);
  };

  return (
    <span className="mb-image-editable">
      <img className={className} src={resolveImage(imageId, fallbackSrc)} alt={alt} style={imgStyle} />
      <button
        type="button"
        className="mb-image-editable-overlay"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? 'Uploading…' : 'Click to replace photo'}
      </button>
      {error && <span className="mb-image-editable-error">{error}</span>}
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleChange} />
    </span>
  );
}
