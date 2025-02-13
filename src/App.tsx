import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GamePlay from './pages/GamePlay';
import Videos from './pages/Videos';
import Profile from './pages/Profile';
import SupportDialog from './components/SupportDialog'; // 新添加客服聊天页面

function App() {
  const handleCloseSupportDialog = () => {
    console.log("客服对话框关闭");
    // 这里可以做任何关闭对话框的逻辑
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/:mode" element={<GamePlay />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/Dialog-support"
          element={<SupportDialog onClose={handleCloseSupportDialog} />}
        /> {/* 添加客服聊天页面的路由并传递 onClose 属性 */}
      </Routes>
    </Router>
  );
}

export default App;
