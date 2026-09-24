import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiFetch, ApiError } from '../../api/client';
import { appendTo, getIn, moveItem as moveItemIn, removeAt, removeKey, setIn } from './pathUtils';

const PageEditorContext = createContext(null);

// `blockKeys` must be a stable (module-level constant) array — see the
// Edit*.jsx pages, each of which defines its own BLOCK_KEYS outside the
// component so this provider doesn't refetch on every render.
export function PageEditorProvider({ blockKeys, children }) {
  const [state, setState] = useState({ status: 'loading', drafts: {}, dirty: {}, error: null });
  const [saveState, setSaveState] = useState('idle'); // idle | saving | saved
  const [saveError, setSaveError] = useState('');

  const load = useCallback(() => {
    setState({ status: 'loading', drafts: {}, dirty: {}, error: null });
    Promise.all(blockKeys.map((key) => apiFetch(`/api/content/${key}`)))
      .then((results) => {
        const drafts = {};
        results.forEach((result, i) => {
          drafts[blockKeys[i]] = result.data;
        });
        setState({ status: 'ready', drafts, dirty: {}, error: null });
      })
      .catch((error) => setState({ status: 'error', drafts: {}, dirty: {}, error }));
  }, [blockKeys]);

  useEffect(() => {
    // Intentional fetch-on-mount: `load` also serves as the "Retry" button.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const mutate = useCallback((blockKey, updater) => {
    setState((prev) => ({
      ...prev,
      drafts: { ...prev.drafts, [blockKey]: updater(prev.drafts[blockKey]) },
      dirty: { ...prev.dirty, [blockKey]: true },
    }));
  }, []);

  const getValue = useCallback(
    (blockKey, path) => getIn(state.drafts[blockKey], path),
    [state.drafts]
  );

  const setValue = useCallback(
    (blockKey, path, value) => mutate(blockKey, (data) => setIn(data, path, value)),
    [mutate]
  );

  const removeItem = useCallback(
    (blockKey, path, index) => mutate(blockKey, (data) => removeAt(data, path, index)),
    [mutate]
  );

  const addItem = useCallback(
    (blockKey, path, item) => mutate(blockKey, (data) => appendTo(data, path, item)),
    [mutate]
  );

  const moveItem = useCallback(
    (blockKey, path, fromIndex, toIndex) => mutate(blockKey, (data) => moveItemIn(data, path, fromIndex, toIndex)),
    [mutate]
  );

  // For object-keyed data (a staff role, a year record) rather than
  // array indices — see pathUtils.removeKey.
  const removeField = useCallback(
    (blockKey, path, key) => mutate(blockKey, (data) => removeKey(data, path, key)),
    [mutate]
  );

  const isDirty = Object.values(state.dirty).some(Boolean);

  const save = useCallback(async () => {
    const dirtyKeys = Object.keys(state.dirty).filter((key) => state.dirty[key]);
    if (dirtyKeys.length === 0) return;

    setSaveState('saving');
    setSaveError('');
    try {
      await Promise.all(
        dirtyKeys.map((key) =>
          apiFetch(`/api/content/${key}`, { method: 'PUT', body: { data: state.drafts[key] } })
        )
      );
      setState((prev) => ({ ...prev, dirty: {} }));
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 2000);
    } catch (error) {
      setSaveState('idle');
      setSaveError(error instanceof ApiError ? error.message : 'Failed to save. Try again.');
    }
  }, [state.dirty, state.drafts]);

  const value = {
    status: state.status,
    error: state.error,
    getValue,
    setValue,
    removeItem,
    addItem,
    moveItem,
    removeField,
    isDirty,
    save,
    discard: load,
    saveState,
    saveError,
  };

  return <PageEditorContext.Provider value={value}>{children}</PageEditorContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- hook lives alongside its provider on purpose
export function usePageEditor() {
  const ctx = useContext(PageEditorContext);
  if (!ctx) {
    throw new Error('usePageEditor must be used within a PageEditorProvider');
  }
  return ctx;
}
