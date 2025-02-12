import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Film, Gamepad2, User } from 'lucide-react';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => navigate('/')}
          className={`flex flex-col items-center ${isActive('/') ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">홈</span>
        </button>
        <button
          onClick={() => navigate('/videos')}
          className={`flex flex-col items-center ${isActive('/videos') ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <Film className="w-6 h-6" />
          <span className="text-xs mt-1">동영상</span>
        </button>
        <button
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigate('/');
            }
          }}
          className={`flex flex-col items-center ${isActive('/game') ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <Gamepad2 className="w-6 h-6" />
          <span className="text-xs mt-1">게임</span>
        </button>
        <button
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center ${isActive('/profile') ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">내 페이지</span>
        </button>
      </div>
    </div>
  );
}

export default BottomNav
