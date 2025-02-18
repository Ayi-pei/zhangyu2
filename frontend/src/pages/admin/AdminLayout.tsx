import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* 左侧导航 */}
      <nav className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">管理后台</h2>
        <ul>
          <li className="mb-2">
            <Link to="/admin/dashboard">📊 仪表盘</Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/users">👥 用户管理</Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/review">📝 内容审核</Link>
          </li>
        </ul>
      </nav>

      {/* 右侧内容 */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet /> {/* 这里会渲染子路由 */}
      </div>
    </div>
  );
};

export default AdminLayout;
