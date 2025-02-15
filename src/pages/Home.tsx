import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Laptop as Octopus, Clock3, Clock5, Clock12 } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import '../styles/carousel.css';

interface GameMode {
  name: string;
  duration: number;
  icon: React.ReactNode;
  path: string;
}

const gameModes: GameMode[] = [
  { name: "정식-3분", duration: 3, icon: <Clock3 className="w-6 h-6" />, path: "3min" },
  { name: "고급-5분", duration: 5, icon: <Clock5 className="w-6 h-6" />, path: "5min" },
  { name: "일반-12분", duration: 12, icon: <Clock12 className="w-6 h-6" />, path: "12min" },
];

const carouselImages = [
  "/images/carousel-1.jpg",
  "/images/carousel-2.jpg",
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();  // 确保可以导航

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.setProperty('--translate-x', `-${currentSlide * 100}%`);
    }
  }, [currentSlide]);

  // 处理游戏模式选择
  const handleModeSelect = (mode: GameMode) => {
    navigate(`/play/${mode.path}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#8c52ff] to-[rgb(253,134,59)] pb-16">
      {/* 轮播图 */}
      <div className="carousel-container">
        <div className="carousel-track" ref={trackRef}>
          {carouselImages.map((img, index) => (
            <img key={index} src={img} alt={`Slide ${index + 1}`} className="carousel-slide" />
          ))}
        </div>
      </div>

      {/* 主要内容 */}
      <div className="container mx-auto px-4 py-8">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-2">
            <Octopus className="w-10 h-10" />
            만남
          </h1>
        </div>

        {/* 游戏模式选择 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {gameModes.map((mode) => (
            <button
              key={mode.name}
              onClick={() => handleModeSelect(mode)}
              className="p-6 rounded-lg bg-blue-500 text-white text-center transition-transform duration-300 ease-in-out hover:bg-blue-600 hover:scale-105 hover:shadow-lg"
            >
              <div className="flex flex-col items-center gap-2">
                {mode.icon}
                <span className="font-semibold">{mode.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 底部导航 */}
      <BottomNav className="fixed bottom-0 left-0 w-full" />
    </div>
  );
}

export default Home;
