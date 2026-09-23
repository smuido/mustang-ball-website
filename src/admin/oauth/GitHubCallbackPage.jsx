import { useEffect } from 'react';

// GitHub redirects the popup opened by githubAuth.js here with `code` and
// `state` in the query string. This page's only job is to hand those back
// to the window that opened it and close itself — see githubAuth.js for
// the listener on the other end.
export default function GitHubCallbackPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    const error = params.get('error_description') || params.get('error');

    if (window.opener) {
      window.opener.postMessage({ type: 'github-oauth-callback', code, state, error }, window.location.origin);
    }
    window.close();
  }, []);

  return (
    <div className="admin-loading">
      <p>Finishing sign-in&hellip; you can close this window if it doesn&rsquo;t close automatically.</p>
    </div>
  );
}
