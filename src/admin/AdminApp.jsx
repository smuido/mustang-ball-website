import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../auth/AuthContext';
import './admin.css';
import LoginPage from './LoginPage';
import AdminLayout from './AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import DashboardPage from './DashboardPage';
import ContentEditorPage from './ContentEditorPage';
import UsersPage from './UsersPage';
import EditHome from './pages/EditHome';
import EditCompetitors from './pages/EditCompetitors';
import EditSpectators from './pages/EditSpectators';
import EditContact from './pages/EditContact';
import EditPastEvents from './pages/EditPastEvents';
import EditOurHistory from './pages/EditOurHistory';
import EditNavigationFooter from './pages/EditNavigationFooter';

export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />

        {/* Page-mirror editors render their own full-bleed shell (see
            EditorPageShell) instead of AdminLayout's chrome, so the live
            page replica isn't boxed in by the dashboard's own UI. */}
        <Route path="pages/home" element={<ProtectedRoute><EditHome /></ProtectedRoute>} />
        <Route path="pages/competitors" element={<ProtectedRoute><EditCompetitors /></ProtectedRoute>} />
        <Route path="pages/spectators" element={<ProtectedRoute><EditSpectators /></ProtectedRoute>} />
        <Route path="pages/contact" element={<ProtectedRoute><EditContact /></ProtectedRoute>} />
        <Route path="pages/past-events" element={<ProtectedRoute><EditPastEvents /></ProtectedRoute>} />
        <Route path="pages/our-history" element={<ProtectedRoute><EditOurHistory /></ProtectedRoute>} />
        <Route path="pages/navigation" element={<ProtectedRoute><EditNavigationFooter /></ProtectedRoute>} />

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
