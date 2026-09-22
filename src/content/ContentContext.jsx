import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../api/client';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });

  const load = useCallback(() => {
    setState({ status: 'loading', data: null, error: null });
    apiFetch('/api/content')
      .then((data) => setState({ status: 'ready', data, error: null }))
      .catch((error) => setState({ status: 'error', data: null, error }));
  }, []);

  useEffect(() => {
    // Intentional fetch-on-mount: `load` also serves as the "try again"
    // button, so it manages its own loading/error state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  return (
    <ContentContext.Provider value={{ ...state, reload: load }}>
      {children}
    </ContentContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook lives alongside its provider on purpose
export function useContentState() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error('useContentState must be used within a ContentProvider');
  }
  return ctx;
}

// Returns the content block for `key` (e.g. useContentBlock('home')).
// Only call this from components that render after ContentProvider has
// reached "ready" status — see AppShell in App.jsx.
// eslint-disable-next-line react-refresh/only-export-components -- hook lives alongside its provider on purpose
export function useContentBlock(key) {
  const { data } = useContentState();
  return data ? data[key] : undefined;
}
