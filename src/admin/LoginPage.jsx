import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ApiError } from '../api/client';
import GitHubSignInButton from './oauth/GitHubSignInButton';

export default function LoginPage() {
  const { status, loginWithGithub } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

  if (status === 'authenticated') {
    const redirectTo = location.state?.from?.pathname || '/admin';
    return <Navigate to={redirectTo} replace />;
  }

  const goToDashboard = () => navigate(location.state?.from?.pathname || '/admin', { replace: true });

  const handleGithubCode = async (code) => {
    setError('');
    try {
      await loginWithGithub(code);
      goToDashboard();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Try again.');
    }
  };

  return (
    <div className="admin-auth-page">
      <div className="admin-auth-card">
        <h1>Mustang Ball Dashboard</h1>
        <p className="admin-auth-subtitle">Sign in with your GitHub account to edit the website.</p>

        {error && <p className="admin-form-error" role="alert">{error}</p>}

        <div className="admin-oauth-buttons">
          <GitHubSignInButton
            onCode={handleGithubCode}
            onError={(err) => setError(err?.message || 'GitHub sign-in failed. Try again.')}
          />
        </div>

        <p className="admin-auth-footnote">
          Only email addresses an admin has already added can sign in. Contact an admin if you need access.
        </p>
      </div>
    </div>
  );
}
