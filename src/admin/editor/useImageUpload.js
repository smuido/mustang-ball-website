import { useState } from 'react';
import { apiFetch, ApiError } from '../../api/client';

// Uploads a picked file to POST /api/images and returns its new id.
// Shared by ImageEditable (plain <img> slots) and the Slideshow-fed /
// background-image admin canvases, which can't reuse ImageEditable's
// layout directly but still need the same upload call and error handling.
export default function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const upload = async (file) => {
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const result = await apiFetch('/api/images', { method: 'POST', body: formData });
      return result.id;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Upload failed. Try again.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploading, error, upload };
}
