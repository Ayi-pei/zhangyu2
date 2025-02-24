import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { login } from '../../../server/services/authService'; // 引入登录函数

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // 移除了对 supabase.auth.user() 的检查，如有需要请通过 AuthContext 或其他方式检查

  const handleLoginSuccess = async (username: string, password: string) => {
    try {
      const user = await login(username, password);
      // 登录成功后跳转
      if (user) {
        navigate('/profile', { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <h1 className="text-3xl font-bold mb-6 text-center">登录</h1>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
