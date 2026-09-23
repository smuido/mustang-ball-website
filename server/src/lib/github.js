// GitHub's OAuth Apps flow has no self-contained ID token — the frontend
// only gets an authorization `code`, and turning that into a user
// identity requires a server-side client secret. This does that exchange
// and fetches the verified primary email.
import { env } from '../env.js';

const USER_AGENT = 'mustang-ball-server';

export async function exchangeGitHubCode(code) {
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: env.githubClientId,
      client_secret: env.githubClientSecret,
      code,
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error('GitHub token exchange failed');
  }

  const tokenData = await tokenResponse.json();
  if (!tokenData.access_token) {
    throw new Error(tokenData.error_description || 'GitHub did not return an access token');
  }

  const accessToken = tokenData.access_token;
  const authHeaders = {
    Authorization: `Bearer ${accessToken}`,
    'User-Agent': USER_AGENT,
    Accept: 'application/vnd.github+json',
  };

  const [profileResponse, emailsResponse] = await Promise.all([
    fetch('https://api.github.com/user', { headers: authHeaders }),
    fetch('https://api.github.com/user/emails', { headers: authHeaders }),
  ]);

  if (!profileResponse.ok || !emailsResponse.ok) {
    throw new Error('Failed to fetch GitHub profile');
  }

  const profile = await profileResponse.json();
  const emails = await emailsResponse.json();

  const primaryEmail = Array.isArray(emails)
    ? emails.find((entry) => entry.primary && entry.verified)
    : null;

  if (!primaryEmail) {
    throw new Error('GitHub account has no verified primary email');
  }

  return {
    email: primaryEmail.email,
    name: profile.name || profile.login,
  };
}
