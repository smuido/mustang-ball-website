import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { signInWithGitHub } from './githubAuth';

const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

export default function GitHubSignInButton({ onCode, onError }) {
  const [isLoading, setIsLoading] = useState(false);

  if (!CLIENT_ID) {
    return <p className="admin-form-error">GitHub sign-in isn&rsquo;t configured yet (missing VITE_GITHUB_CLIENT_ID).</p>;
  }

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const code = await signInWithGitHub();
      onCode(code);
    } catch (error) {
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      className="admin-oauth-button admin-oauth-button-github"
      onClick={handleClick}
      disabled={isLoading}
    >
      <FaGithub aria-hidden="true" />
      {isLoading ? 'Opening GitHub sign-in…' : 'Continue with GitHub'}
    </button>
  );
}
