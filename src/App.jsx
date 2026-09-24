import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicSite from './PublicSite';

const AdminApp = lazy(() => import('./admin/AdminApp'));

function App() {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={null}>
            <AdminApp />
          </Suspense>
        }
      />
      <Route path="/*" element={<PublicSite />} />
    </Routes>
  );
}

export default App;
