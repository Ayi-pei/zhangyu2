import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import AdminLayout from './pages/admin/AdminLayout';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import ContentReview from './pages/admin/ContentReview';
import NotFound from './pages/NotFound';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 普通用户页面 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />

        {/* 后台管理页面 */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="review" element={<ContentReview />} />
        </Route>

        {/* 404 页面 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
