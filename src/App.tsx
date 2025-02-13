// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PlayPage from './pages/GamePlay';


// 使用懒加载实现代码分割，提高初始加载速度
const Home = lazy(() => import('./pages/Home'));
const GamePlay = lazy(() => import('./pages/GamePlay'));
const Videos = lazy(() => import('./pages/Videos'));
const Profile = lazy(() => import('./pages/Profile'));
const SupportDialog = lazy(() => import('./components/SupportDialog'));
// 如果你有404页面，可以创建一个简单的 NotFound 组件
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const handleCloseSupportDialog = () => {
    console.log("客服对话框关闭");
    // 在这里添加任何关闭客服对话框的逻辑，比如更新状态或清理资源
  };

  return (
    <Router>
      {/* Suspense 用于在组件加载时显示加载提示 */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play/:mode" element={<GamePlay />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/profile" element={<Profile />} />

          {/* 使用统一的小写路径命名 */}
          <Route
            path="/dialog-support"
            element={<SupportDialog onClose={handleCloseSupportDialog} />}
          />
          {/* 404 页面，匹配所有未定义的路由 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/:path" element={<PlayPage />} />
      </Routes>
    </Router>
  );
}

export default App;
