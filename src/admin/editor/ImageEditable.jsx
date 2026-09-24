import { useRef } from 'react';
import { usePageEditor } from './PageEditorContext';
import useImageUpload from './useImageUpload';
import { resolveImage } from '../../utils/resolveImage';

// Click-to-replace version of a plain <img>. `path` points to where the
// uploaded image's id is stored in content JSON; `fallbackSrc` is the
// existing bundled Vite asset, shown until an admin uploads a
// replacement — old content rows have no value at `path` yet, so
// `getValue` returning undefined falls straight back to it (no data
// migration needed). For a slot with no fallback (a newly added photo
// via an "Add photo" button — see e.g. EditHome's HeroSlideshowEditor),
// renders an empty upload placeholder instead of a broken <img> until
// something's uploaded.
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

  const src = resolveImage(imageId, fallbackSrc);

  return (
    <span className={`mb-image-editable ${!src ? 'mb-image-editable-empty' : ''}`}>
      {src && <img className={className} src={src} alt={alt} style={imgStyle} />}
      <button
        type="button"
        className={src ? 'mb-image-editable-overlay' : 'mb-image-editable-add'}
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? 'Uploading…' : src ? 'Click to replace photo' : '+ Add photo'}
      </button>
      {error && <span className="mb-image-editable-error">{error}</span>}
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleChange} />
    </span>
  );
}
