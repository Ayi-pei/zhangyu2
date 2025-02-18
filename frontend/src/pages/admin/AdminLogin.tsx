// src/pages/admin/AdminLogin.tsx
import React, { useState } from 'react';
import '../../styles/AdminLogin.css';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 基本表单验证
    if (!username || !password) {
      setErrorMessage('请填写用户名和密码');
      return;
    }

    // 模拟登录 API 调用，成功后处理
    console.log(`登录用户名：${username}`);
    // 清空错误信息
    setErrorMessage('');

    // 这里可以实现你的登录逻辑，如调用后台 API 进行验证
    // 登录成功后，可以跳转到管理后台页面
  };

  return (
    <div className="adminLoginContainer">
      <h2 className="adminLoginTitle">管理员登录</h2>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="username">用户名</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="请输入用户名"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">密码</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入密码"
          />
        </div>
        <button type="submit" className="loginButton">
          登录
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
