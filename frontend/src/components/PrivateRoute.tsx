import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole: 'admin' | 'user';
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  // 从 localStorage 获取用户角色（这里你可以改为从 Context 或 Redux 读取）
  const userRole = localStorage.getItem('role'); // 例如 "admin" 或 "user"

  // 如果角色匹配，则允许访问
  if (userRole === requiredRole) {
    return <>{children}</>;
  }

  // 如果角色不匹配，重定向到登录页面
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
