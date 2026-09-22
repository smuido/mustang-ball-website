import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function ProtectedRoute({ children, requireRole }) {
  const { status, user } = useAuth();
  const location = useLocation();

  if (status === 'loading') {
    return (
      <div className="admin-loading" role="status">
        <p>Loading&hellip;</p>
      </div>
    );
  }

  if (status === 'anonymous') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requireRole && user.role !== requireRole) {
    return (
      <div className="admin-loading" role="alert">
        <p>You don&rsquo;t have permission to view this page.</p>
      </div>
    );
  }

  return children;
}
