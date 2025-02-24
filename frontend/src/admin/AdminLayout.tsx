// backend/src/routes/AdminLayout.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // 如果使用 react-router-dom，否则可自行修改
import './AdminLayout.css'; // 可按需要自定义样式

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>管理面板</h2>
        <nav>
          <ul>
            <li>
              <Link to="/admin/dashboard">仪表盘</Link>
            </li>
            <li>
              <Link to="/admin/users">用户管理</Link>
            </li>
            <li>
              <Link to="/admin/bets">投注记录</Link>
            </li>
            <li>
              <Link to="/admin/results">开奖结果</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
};

export default AdminLayout;
