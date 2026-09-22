import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <Link to="/admin" className="admin-brand">Mustang Ball Dashboard</Link>
        <nav className="admin-topnav">
          <NavLink to="/admin" end>Pages</NavLink>
          {user.role === 'admin' && <NavLink to="/admin/users">Users</NavLink>}
          <Link to="/" target="_blank" rel="noopener noreferrer">View site &#8599;</Link>
        </nav>
        <div className="admin-user">
          <span>{user.name} <span className="admin-role-badge">{user.role}</span></span>
          <button type="button" className="btn btn-outline" onClick={logout}>Sign out</button>
        </div>
      </header>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
