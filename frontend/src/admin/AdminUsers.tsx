// backend/src/routes/AdminUsers.tsx
import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';

interface User {
  id: number;
  username: string;
  email: string;
  role: string; // 表示权限或角色信息
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  // 模拟 API 请求获取用户数据
  useEffect(() => {
    // 这里用 setTimeout 模拟延时获取数据
    setTimeout(() => {
      setUsers([
        { id: 1, username: 'john_doe', email: 'john@example.com', role: 'user' },
        { id: 2, username: 'admin_user', email: 'admin@example.com', role: 'admin' },
      ]);
    }, 500);
  }, []);

  const handleEditUser = (user: User) => {
    // 实际开发中可以弹出表单编辑用户信息
    alert(`编辑用户信息：${user.username}`);
  };

  const handleEditBetRecords = (user: User) => {
    // 处理用户投注记录编辑逻辑
    alert(`编辑投注记录：${user.username}`);
  };

  const handleEditResults = (user: User) => {
    // 处理开奖结果编辑逻辑
    alert(`编辑开奖结果：${user.username}`);
  };

  return (
    <AdminLayout>
      <div className="admin-users">
        <h1>用户管理</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>用户名</th>
              <th>邮箱</th>
              <th>角色</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEditUser(user)}>编辑信息</button>
                  <button onClick={() => handleEditBetRecords(user)}>编辑投注</button>
                  <button onClick={() => handleEditResults(user)}>编辑开奖结果</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
