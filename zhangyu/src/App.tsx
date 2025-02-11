import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../attached_assets/Home';
import GamePlay from '../attached_assets/GamePlay';
import Videos from '../attached_assets/Videos';
import Profile from '../attached_assets/Profile';
import CustomerSupport from '../attached_assets/CustomerSupport'; // 新添加客服聊天页面

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/:mode" element={<GamePlay />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/customer-support" element={<CustomerSupport />} /> {/* 添加客服聊天页面的路由 */}
      </Routes>
    </Router>
  );
}

export default App;