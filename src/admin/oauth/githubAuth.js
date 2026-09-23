// GitHub's OAuth flow is a redirect + authorization-code exchange — the
// code exchange needs a client secret, which has to stay server-side. So
// this only gets us as far as a `code`; the backend does the actual
// exchange with GitHub (see server/src/lib/github.js).
const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

function randomState() {
  return crypto.randomUUID();
}

function callbackUrl() {
  return `${window.location.origin}${import.meta.env.BASE_URL}admin/oauth/github/callback`;
}

// Opens GitHub's sign-in in a popup and resolves with the authorization
// code once the popup (see GitHubCallbackPage.jsx) posts it back.
export function signInWithGitHub() {
  if (!CLIENT_ID) {
    return Promise.reject(new Error('GitHub sign-in isn’t configured yet (missing VITE_GITHUB_CLIENT_ID).'));
  }

  const state = randomState();
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: callbackUrl(),
    scope: 'read:user user:email',
    state,
    allow_signup: 'false',
  });

  const popup = window.open(
    `https://github.com/login/oauth/authorize?${params.toString()}`,
    'github-oauth',
    'width=520,height=640'
  );

  if (!popup) {
    return Promise.reject(new Error('Your browser blocked the sign-in popup. Allow popups for this site and try again.'));
  }

  return new Promise((resolve, reject) => {
    let settled = false;

    const cleanup = () => {
      window.removeEventListener('message', handleMessage);
      window.clearInterval(popupWatcher);
    };

    function handleMessage(event) {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== 'github-oauth-callback') return;

      settled = true;
      cleanup();

      if (event.data.error) {
        reject(new Error(event.data.error));
      } else if (event.data.state !== state) {
        reject(new Error('Sign-in response didn’t match the request. Try again.'));
      } else {
        resolve(event.data.code);
      }
    }

    window.addEventListener('message', handleMessage);

    // If the person just closes the popup without completing sign-in,
    // don't leave the caller hanging forever.
    const popupWatcher = window.setInterval(() => {
      if (popup.closed && !settled) {
        cleanup();
        reject(new Error('Sign-in was cancelled.'));
      }
    }, 500);
  });
}
