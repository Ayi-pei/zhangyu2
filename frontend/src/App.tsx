// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';

const Home = lazy(() => import('./pages/Home'));
const GamePlay = lazy(() => import('./pages/GamePlay'));
const Videos = lazy(() => import('./pages/Videos'));
const Profile = lazy(() => import('./pages/Profile'));
const SupportDialog = lazy(() => import('./components/SupportDialog'));
const NotFound = lazy(() => import('./components/NotFound'));
const BindingForm = lazy(() => import('./components/forms/BindingForm'));
const RechargeForm = lazy(() => import('./components/forms/RechargeForm'));
const History = lazy(() => import('./pages/History'));
const ExchangeForm = lazy(() => import('./components/forms/ExchangeForm'));
const RegisterForm = lazy(() => import('./components/forms/RegisterForm'));
const LoginPage = lazy(() => import('./pages/LoginPage')); // 引入 LoginPage

function App() {
  const [bindingCardNumber, setBindingCardNumber] = useState('');
  const [bindingBank, setBindingBank] = useState('');
  const [bindingExchangeCode, setBindingExchangeCode] = useState('');
  const [bindingCardHolder, setBindingCardHolder] = useState('');

  const handleCloseSupportDialog = () => {
    console.log('客服对话框关闭');
  };

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play/:mode/:gameId" element={<GamePlay />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
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
          <Route path="/history" element={<History />} />
          <Route path="/exchangeform" element={<ExchangeForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginPage />} /> {/* 添加登录路由 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
