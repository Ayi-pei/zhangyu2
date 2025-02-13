import { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';  // 使用 useNavigate 进行页面跳转

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();  // 获取 navigate 函数

  useEffect(() => {
    // 检查是否已经登录，记住我功能
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setIsLoggedIn(true);
      navigate('/home'); // 自动跳转到首页
    }
  }, [navigate]);

  const onLoginSuccess = () => {
    localStorage.setItem('username', 'user'); // 保存用户名
    setIsLoggedIn(true);
    navigate('/home'); // 登录成功后跳转
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {isLoggedIn ? (
        <div className="text-center">Welcome back!</div>
      ) : (
        <LoginForm onLoginSuccess={onLoginSuccess} />
      )}
    </div>
  );
};

export default LoginPage;
