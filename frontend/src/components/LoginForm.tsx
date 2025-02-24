import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface LoginFormProps {
  onLoginSuccess: (username: string, password: string) => Promise<void>;
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.length < 6 || username.length > 8 || password.length < 6 || password.length > 8) {
      console.error('用户名和密码必须是 6-8 位字符');
      return;
    }

    try {
      await login(username, password);
      await onLoginSuccess(username, password);
      navigate('/profile'); // 登录成功后跳转
    } catch {
      console.error('用户名或密码错误');
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl mb-4 text-center">Login</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          title="请输入用户名"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded-md mt-1"
          required
          minLength={6}
          maxLength={8}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          title="请输入密码"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-md mt-1"
          required
          minLength={6}
          maxLength={8}
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <input
            type="checkbox"
            id="rememberMe"
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-sm">Remember Me</label>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
