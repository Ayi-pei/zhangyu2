import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';

// 使用懒加载，提高初始加载速度
const Home = lazy(() => import('./pages/Home'));
const GamePlay = lazy(() => import('./pages/GamePlay'));
const Videos = lazy(() => import('./pages/Videos'));
const Profile = lazy(() => import('./pages/Profile'));
const SupportDialog = lazy(() => import('./components/SupportDialog'));
const NotFound = lazy(() => import('./pages/NotFound'));
const BindingForm = lazy(() => import('./components/BindingForm'));
const RechargeForm = lazy(() => import('./components/RechargeForm')); // 修改变量名，避免命名冲突
const History = lazy(() => import('./pages/History'));
const ExchangeForm = lazy(() => import('./components/ExchangeForm'));
const RegisterForm = lazy(() => import('./components/RegisterForm'));
function App() {
  // 绑卡相关的状态
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
          {/* 主页 */}
          <Route path="/" element={<Home />} />

          {/* 游戏玩法页面 */}
          <Route path="/play/:mode" element={<GamePlay />} />

          {/* 视频页 */}
          <Route path="/videos" element={<Videos />} />

          {/* 个人中心 */}
          <Route path="/profile" element={<Profile />} />

          {/* 绑卡页面，正确传递 props */}
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
          {/* 充值页面 */}
          <Route path="/rechargeform" element={<RechargeForm />} />

          {/* 客服支持对话框 */}
          <Route path="/supportdialog" element={<SupportDialog onClose={handleCloseSupportDialog} />} />

          <Route path="/history" element={<History />} />

          <Route path="/exchangeform" element={<ExchangeForm />} />

          <Route path="/register" element={<RegisterForm />} />
          {/* 404 页面 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
