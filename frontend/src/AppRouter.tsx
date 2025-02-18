import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import PrivateRoute from './components/PrivateRoute';

const Home = lazy(() => import('./pages/Home'));
const GamePlay = lazy(() => import('./pages/GamePlay'));
const Videos = lazy(() => import('./pages/Videos'));
const Profile = lazy(() => import('./pages/Profile'));
const History = lazy(() => import('./pages/History'));
const NotFound = lazy(() => import('./pages/NotFound'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

// 表单组件
const BindingForm = lazy(() => import('./components/forms/BindingForm'));
const RechargeForm = lazy(() => import('./components/forms/RechargeForm'));
const ExchangeForm = lazy(() => import('./components/forms/ExchangeForm'));

// 管理端页面
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const ContentReview = lazy(() => import('./pages/admin/ContentReview'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));

const AppRouter = () => {
  // 此处 handleSubmit 仅处理提交逻辑
  const handleSubmit = () => {
    console.log('绑定信息提交');
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/play/:mode/:gameId" element={<GamePlay />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />

      {/* 表单页面 */}
      <Route path="/bindingform" element={<BindingForm onSubmit={handleSubmit} />} />
      <Route path="/rechargeform" element={<RechargeForm />} />
      <Route path="/exchangeform" element={<ExchangeForm />} />

      {/* 认证相关 */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* 管理端 */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<PrivateRoute admin><AdminDashboard /></PrivateRoute>} />
      <Route path="/admin/users" element={<PrivateRoute admin><UserManagement /></PrivateRoute>} />
      <Route path="/admin/review" element={<PrivateRoute admin><ContentReview /></PrivateRoute>} />

      {/* 404 页面 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
