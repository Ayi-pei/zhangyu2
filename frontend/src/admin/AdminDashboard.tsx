// backend/src/routes/AdminDashboard.tsx
import React from 'react';
import AdminLayout from './AdminLayout';

const AdminDashboard: React.FC = () => {
  // 示例统计数据，实际数据可通过 API 获取
  return (
    <AdminLayout>
      <div className="dashboard">
        <h1>仪表盘</h1>
        <div className="stats-cards">
          <div className="card">
            <h2>总用户数</h2>
            <p>150</p>
          </div>
          <div className="card">
            <h2>投注总数</h2>
            <p>320</p>
          </div>
          <div className="card">
            <h2>最新开奖结果</h2>
            <p>12, 23, 34, 45, 56</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
