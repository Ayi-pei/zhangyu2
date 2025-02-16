import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Film, Gamepad2, User } from 'lucide-react';
import './BottomNav.css';

interface BottomNavProps {
  className?: string;
}

function BottomNav({ className = "" }: BottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`bottom-nav ${className}`}>
      <button type="button"
        onClick={() => navigate('/')}
        className={`nav-button ${isActive('/') ? 'active' : ''}`}
      >
        <Home className="w-6 h-6" />
        <span>홈</span>
      </button>
      <button type="button"
        onClick={() => navigate('/videos')}
        className={`nav-button ${isActive('/videos') ? 'active' : ''}`}
      >
        <Film className="w-6 h-6" />
        <span>동영상</span>
      </button>
      <button type="button"
        onClick={() => {
          if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            navigate('/');
          }
        }}
        className={`nav-button ${isActive('/game') ? 'active' : ''}`}
      >
        <Gamepad2 className="w-6 h-6" />
        <span>게임</span>
      </button>
      <button type="button"
        onClick={() => navigate('/profile')}
        className={`nav-button ${isActive('/profile') ? 'active' : ''}`}
      >
        <User className="w-6 h-6" />
        <span>내 페이지</span>
      </button>
    </div>
  );
}

export default BottomNav;
