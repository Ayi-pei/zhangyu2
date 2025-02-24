import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // 使用新的 AuthProvider
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const GamePlay = lazy(() => import('./pages/GamePlay'));
const Videos = lazy(() => import('./pages/Videos'));
const Profile = lazy(() => import('./pages/Profile'));
const SupportDialog = lazy(() => import('./components/SupportDialog'));
const NotFound = lazy(() => import('./pages/NotFound'));
const BindingForm = lazy(() => import('./components/BindingForm'));
const RechargeForm = lazy(() => import('./components/RechargeForm'));
const History = lazy(() => import('./pages/History'));
const ExchangeForm = lazy(() => import('./components/ExchangeForm'));
const RegisterForm = lazy(() => import('./components/RegisterForm'));
const LoginForm = lazy(() => import('./components/LoginForm'));

function App() {
  const [bindingCardNumber, setBindingCardNumber] = useState('');
  const [bindingBank, setBindingBank] = useState('');
  const [bindingExchangeCode, setBindingExchangeCode] = useState('');
  const [bindingCardHolder, setBindingCardHolder] = useState('');

  const handleCloseSupportDialog = () => {
    console.log('客服对话框关闭');
  };

  const handleLoginSuccess = async (username: string, password: string) => {
    console.log('登录成功:', username);
  };

  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />

            {/* 受保护的路由 */}
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            <Route path="/history" element={<PrivateRoute element={<History />} />} />
            <Route path="/play/:mode/:gameId" element={<PrivateRoute element={<GamePlay />} />} />
            <Route path="/gameplay" element={<ProtectedRoute element={<GamePlay />} />} />

            <Route
              path="/bindingform"
              element={
                <BindingForm
                  bindingCardNumber={bindingCardNumber}
                  setBindingCardNumber={setBindingCardNumber}
                  bindingBank={bindingBank}
                  setBindingBank={setBindingBank}
                  bindingExchangeCode={bindingExchangeCode}
                  setBindingExchangeCode={setBindingExchangeCode}
                  bindingCardHolder={bindingCardHolder}
                  setBindingCardHolder={setBindingCardHolder}
                  onSubmit={() => console.log('提交绑卡')}
                />
              }
            />
            <Route path="/rechargeform" element={<RechargeForm />} />
            <Route path="/supportdialog" element={<SupportDialog onClose={handleCloseSupportDialog} />} />
            <Route path="/exchangeform" element={<ExchangeForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
