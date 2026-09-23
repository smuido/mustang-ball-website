import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { apiFetch, ApiError } from '../api/client';

const emptyForm = { email: '', name: '', role: 'editor' };

export default function UsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [isCreating, setIsCreating] = useState(false);

  const load = useCallback(() => {
    apiFetch('/api/users')
      .then(setUsers)
      .catch((err) => setError(err instanceof ApiError ? err.message : 'Failed to load users.'));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleCreate = async (event) => {
    event.preventDefault();
    setError('');
    setIsCreating(true);
    try {
      await apiFetch('/api/users', { method: 'POST', body: form });
      setForm(emptyForm);
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to create user.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleToggleActive = async (targetUser) => {
    setError('');
    try {
      await apiFetch(`/api/users/${targetUser.id}`, { method: 'PATCH', body: { isActive: !targetUser.isActive } });
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to update user.');
    }
  };

  const handleRoleChange = async (targetUser, role) => {
    setError('');
    try {
      await apiFetch(`/api/users/${targetUser.id}`, { method: 'PATCH', body: { role } });
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to update user.');
    }
  };

  const handleDelete = async (targetUser) => {
    if (!window.confirm(`Remove ${targetUser.email}? This can't be undone.`)) return;
    setError('');
    try {
      await apiFetch(`/api/users/${targetUser.id}`, { method: 'DELETE' });
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to delete user.');
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <p className="admin-page-subtitle">
        Everyone allowed to sign into this dashboard. There are no passwords &mdash; people sign in with their own
        GitHub account, and access is controlled entirely by whether their email is listed here.
      </p>

      {error && <p className="admin-form-error" role="alert">{error}</p>}

      <div className="admin-card" style={{ marginBottom: '2rem' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Signed in with</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {users === null && (
              <tr><td colSpan={6}>Loading&hellip;</td></tr>
            )}
            {users?.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <select
                    value={u.role}
                    onChange={(event) => handleRoleChange(u, event.target.value)}
                    disabled={u.id === currentUser.id}
                  >
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>{u.isActive ? 'Active' : 'Disabled'}</td>
                <td>{u.provider ? 'GitHub' : 'Not signed in yet'}</td>
                <td className="admin-table-actions">
                  <button
                    type="button"
                    className="admin-btn admin-btn-outline"
                    onClick={() => handleToggleActive(u)}
                    disabled={u.id === currentUser.id}
                  >
                    {u.isActive ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn-outline"
                    onClick={() => handleDelete(u)}
                    disabled={u.id === currentUser.id}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Add a user</h2>
      <p className="admin-page-subtitle">
        This just allow-lists their email &mdash; they sign in themselves with GitHub the first time they visit{' '}
        <code>/admin</code>.
      </p>
      <form className="admin-editor-form admin-inline-form" onSubmit={handleCreate}>
        <label htmlFor="new-name">Name</label>
        <input
          id="new-name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          required
        />

        <label htmlFor="new-email">Email</label>
        <input
          id="new-email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          required
        />
        <p className="admin-editor-hint">Must match the email on their GitHub account exactly.</p>

        <label htmlFor="new-role">Role</label>
        <select
          id="new-role"
          value={form.role}
          onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
        >
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="admin-btn" disabled={isCreating}>
          {isCreating ? 'Adding…' : 'Add user'}
        </button>
      </form>
    </div>
  );
}
