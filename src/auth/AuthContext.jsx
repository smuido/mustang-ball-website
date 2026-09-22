import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, setState] = useState({ status: 'loading', user: null });

  const refresh = useCallback(async () => {
    try {
      const { user } = await apiFetch('/api/auth/me');
      setState({ status: 'authenticated', user });
    } catch {
      setState({ status: 'anonymous', user: null });
    }
  }, []);

  useEffect(() => {
    // Intentional session check on mount — resolves whether a valid auth
    // cookie already exists before rendering protected routes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, [refresh]);

  const login = useCallback(async (email, password) => {
    const { user } = await apiFetch('/api/auth/login', { method: 'POST', body: { email, password } });
    setState({ status: 'authenticated', user });
    return user;
  }, []);

  const logout = useCallback(async () => {
    await apiFetch('/api/auth/logout', { method: 'POST' });
    setState({ status: 'anonymous', user: null });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, refresh }}>
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
