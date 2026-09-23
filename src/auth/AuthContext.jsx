import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiFetch, setAuthToken } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, setState] = useState({ status: 'loading', user: null });

  const refresh = useCallback(async () => {
    try {
      const { user } = await apiFetch('/api/auth/me');
      setState({ status: 'authenticated', user });
    } catch {
      setAuthToken(null);
      setState({ status: 'anonymous', user: null });
    }
  }, []);

  useEffect(() => {
    // Intentional session check on mount — resolves whether a saved
    // token is still valid before rendering protected routes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  // `code` is the authorization code GitHub's popup callback hands back
  // (see src/admin/oauth/githubAuth.js) — GitHub's flow has no
  // self-contained token, so the backend exchanges this code itself.
  const loginWithGithub = useCallback(async (code) => {
    const { token, user } = await apiFetch('/api/auth/oauth/github', { method: 'POST', body: { credential: code } });
    setAuthToken(token);
    setState({ status: 'authenticated', user });
    return user;
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    setState({ status: 'anonymous', user: null });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, loginWithGithub, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook lives alongside its provider on purpose
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
