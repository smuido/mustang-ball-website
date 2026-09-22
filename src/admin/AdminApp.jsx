import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../auth/AuthContext';
import './admin.css';
import LoginPage from './LoginPage';
import AdminLayout from './AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import DashboardPage from './DashboardPage';
import ContentEditorPage from './ContentEditorPage';
import UsersPage from './UsersPage';

export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          path=""
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="content/:key" element={<ContentEditorPage />} />
          <Route
            path="users"
            element={
              <ProtectedRoute requireRole="admin">
                <UsersPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
