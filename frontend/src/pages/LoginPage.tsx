import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (role: 'admin' | 'user') => {
    localStorage.setItem('role', role);

    // 根据角色跳转不同页面
    if (role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    } else {
      navigate('/home', { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold mb-4">登录</h1>
      <button onClick={() => handleLogin('user')} className="bg-blue-500 text-white px-4 py-2 mb-2">普通用户登录</button>
      <button onClick={() => handleLogin('admin')} className="bg-red-500 text-white px-4 py-2">管理员登录</button>
    </div>
  );
};

export default LoginPage;
