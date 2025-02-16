// src/components/RegisterForm.tsx
import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 表单提交处理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 表单验证
    if (password !== confirmPassword) {
      setErrorMessage('Password and Confirm Password must match!');
      return;
    }
    if (!username || !password || !email) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    // 模拟注册 API 调用，成功后处理
    console.log(`Registering user: ${username}, Email: ${email}`);
    setErrorMessage('');
    // 清空表单
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setEmail('');
  };

  return (
    <div className="registerContainer">
      <h2 className="registerTitle">注册账号</h2>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="username">用户名</label>
          <input
            title="사용자 이름은 최소 6자 이상이어야 합니다"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="请输入用户名"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email">邮箱</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="请输入邮箱"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">密码</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入密码"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="confirmPassword">确认密码</label>
          <input
            id="confirmPassword"
            title="비밀번호를 다시 입력하세요."
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="请确认密码"
            required
          />
        </div>
        <button type="submit" className="registerButton">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
