import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, X, RefreshCw } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { getPlayerBalance, setPlayerBalance, getJumpHistory, setJumpHistory } from '../utils/storage';
import { exportDataToBackend } from '../utils/api';

interface Jump {
  direction: string;
  steps: number;
  results: string[];
  timestamp: number;
  pointsEarned: number;
  status: 'pending' | 'completed';
}

interface JumpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (steps: number) => void;
  direction: string;
}

// 辅助函数：获取当前首尔时间（毫秒）
const getSeoulTime = () =>
  new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })).getTime();

// 格式化时间戳为 hh:mm:ss 格式
const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');
  const ss = date.getSeconds().toString().padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
};

function JumpDialog({ isOpen, onClose, onConfirm, direction }: JumpDialogProps) {
  const [steps, setSteps] = useState('');
  const [error, setError] = useState('');
  const currentBalance = getPlayerBalance();
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stepsNum = parseInt(steps, 10);
    if (isNaN(stepsNum) || stepsNum < 1) {
      setError('숫자는 0보다 큰 양의 정수여야 합니다');
      return;
    }
    if (stepsNum > currentBalance) {
      setError('잔액이 부족합니다');
      return;
    }
    onConfirm(stepsNum);
    setSteps('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">전송 {direction} 포인트</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mb-4 text-sm text-gray-600">
          현재 잔액: {currentBalance} 포인트
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg mb-4"
            placeholder="포인트 입력"
            autoFocus
            min="1"
            max={currentBalance}
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition-colors"
          >
            오케이
          </button>
        </form>
      </div>
    </div>
  );
}

function GamePlay() {
  // 从 URL 中获取参数，若 mode 为空，则使用默认值 '3min'
  const { mode: paramMode, gameId } = useParams<{ mode: string; gameId: string }>();
  const mode = paramMode ?? '3min';
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { modeName: string; duration: number } | undefined;

  console.log("从 Home 页面传递的模式名称：", state?.modeName);
  console.log("游戏时长：", state?.duration);

  // 根据 URL 参数或传递的 state 决定游戏模式名称和时长
  const modeName = state?.modeName || mode;
  const getDuration = (mode: string): number => {
    switch (mode) {
      case '3min':
        return 180;
      case '5min':
        return 300;
      case '12min':
        return 720;
      default:
        return 180;
    }
  };
  const duration = state?.duration || getDuration(mode);
  const roundStartKey = `roundStart_${mode}`;

  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const currentSeoulTime = getSeoulTime();
    const savedRoundStart = localStorage.getItem(roundStartKey);
    if (savedRoundStart) {
      const roundStart = parseInt(savedRoundStart, 10);
      const elapsed = Math.floor((currentSeoulTime - roundStart) / 1000);
      if (elapsed < duration) {
        return duration - elapsed;
      }
    }
    localStorage.setItem(roundStartKey, currentSeoulTime.toString());
    return duration;
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDirection, setCurrentDirection] = useState('');
  const [jumps, setJumps] = useState<Jump[]>(() => getJumpHistory());
  const [isSpinning, setIsSpinning] = useState(false);

  const startNewRound = () => {
    const currentSeoulTime = getSeoulTime();
    localStorage.setItem(roundStartKey, currentSeoulTime.toString());
    setTimeLeft(duration);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const currentSeoulTime = getSeoulTime();
      const savedRoundStart = localStorage.getItem(roundStartKey);
      if (savedRoundStart) {
        const roundStart = parseInt(savedRoundStart, 10);
        const elapsed = Math.floor((currentSeoulTime - roundStart) / 1000);
        const remaining = duration - elapsed;
        if (remaining <= 0) {
          setTimeLeft(0);
        } else {
          setTimeLeft(remaining);
        }
      } else {
        startNewRound();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [mode, duration, roundStartKey]);

  useEffect(() => {
    if (timeLeft === 0) {
      const possibleResults = ['귀엽', '순수하', '직설적이', '섹시하'];
      const currentBets = JSON.parse(localStorage.getItem('currentBets') || '{}');
      const result1Index = Math.floor(Math.random() * possibleResults.length);
      let result2Index = Math.floor(Math.random() * possibleResults.length);
      while (result2Index === result1Index) {
        result2Index = Math.floor(Math.random() * possibleResults.length);
      }
      const results = [possibleResults[result1Index], possibleResults[result2Index]];

      setJumps(prevJumps => {
        const updatedJumps = prevJumps.map(jump => {
          if (jump.status === 'pending') {
            const label = getDirectionLabel(jump.direction);
            const pointsEarned = results.includes(label) ? jump.steps * 2 : -jump.steps;
            return {
              ...jump,
              results,
              pointsEarned,
              status: 'completed'
            } as Jump;
          }
          return jump;
        });
        setJumpHistory(updatedJumps.slice(-15));
        return updatedJumps;
      });

      const currentBalance = getPlayerBalance();
      let totalEarnings = 0;
      Object.entries(currentBets).forEach(([direction, amount]) => {
        if (results.includes(getDirectionLabel(direction))) {
          totalEarnings += Number(amount) * 2;
        } else {
          totalEarnings -= Number(amount);
        }
      });
      const newBalance = currentBalance + totalEarnings;
      setPlayerBalance(newBalance);
      localStorage.setItem('currentBets', '{}');
      startNewRound();
    }
  }, [timeLeft, duration]);

  const getDirectionLabel = (direction: string) => {
    switch (direction) {
      case '귀엽':
        return '귀엽';
      case '순수하':
        return '순수하';
      case '직설적이':
        return '직설적이';
      case '섹시하':
        return '섹시하';
      default:
        return '';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleJumpClick = (direction: string) => {
    setCurrentDirection(direction);
    setIsDialogOpen(true);
  };

  const handleJumpConfirm = async (steps: number) => {
    setIsSpinning(true);

    const currentBets = JSON.parse(localStorage.getItem('currentBets') || '{}');
    currentBets[currentDirection] = (currentBets[currentDirection] || 0) + steps;
    localStorage.setItem('currentBets', JSON.stringify(currentBets));

    const currentBalance = getPlayerBalance();
    const newBalance = currentBalance - steps;
    setPlayerBalance(newBalance);

    const newJump: Jump = {
      direction: currentDirection,
      steps,
      results: [],
      timestamp: getSeoulTime(),
      pointsEarned: 0,
      status: 'pending'
    };
    setJumps(prevJumps => {
      const newJumps = [...prevJumps, newJump];
      setJumpHistory(newJumps.slice(-15));
      return newJumps.slice(-15);
    });

    const dataToSend = {
      gameId,
      mode,
      selection: currentDirection,
      points: steps,
      jump: newJump
    };

    try {
      const result = await exportDataToBackend(dataToSend);
      console.log('数据成功发送到后台:', result);
    } catch (error) {
      console.error('数据发送失败:', error);
    }

    setIsSpinning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8c52ff] to-[#ff914d] pb-16">
      <div className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            반환
          </button>
          <h1 className="text-xl font-bold">{`${modeName} 모드`}</h1>
          <div className="bg-blue-700 px-4 py-2 rounded-lg">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
          {[
            { direction: '귀엽', label: '귀엽', gradient: 'from-pink-500 to-rose-500' },
            { direction: '순수하', label: '순수하', gradient: 'from-purple-500 to-indigo-500' },
            { direction: '직설적이', label: '직설적이', gradient: 'from-blue-500 to-cyan-500' },
            { direction: '섹시하', label: '섹시하', gradient: 'from-orange-500 to-amber-500' }
          ].map(({ direction, label, gradient }) => (
            <button
              type="button"
              key={direction}
              onClick={() => handleJumpClick(direction)}
              className={`group relative bg-gradient-to-br ${gradient} p-8 rounded-2xl flex items-center justify-center transition-all transform hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-inner`}
              disabled={isSpinning}
            >
              <span className="font-bold text-2xl text-white">{label}</span>
              {isSpinning && (
                <RefreshCw className="absolute top-2 right-2 w-6 h-6 text-white animate-spin" />
              )}
            </button>
          ))}
        </div>
        {jumps.length > 0 && (
          <div className="mt-8 bg-white bg-opacity-90 rounded-lg p-4 max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">선택 기록</h2>
            <div className="space-y-2">
              {jumps.map((jump, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-gray-100 p-3 rounded transition-opacity animate-fade-in"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{getDirectionLabel(jump.direction)}</span>
                    <span className={`font-semibold ${jump.pointsEarned >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {jump.pointsEarned >= 0 ? '+' : ''}{jump.pointsEarned}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    <span>베팅: {jump.steps}</span>
                    <span className="mx-2">|</span>
                    <span>
                      결과: {jump.status === 'pending' ? '결과 대기 중' : jump.results.join(' + ')}
                    </span>
                    <span className="mx-2">|</span>
                    <span>
                      {jump.status === 'completed' ? `${jump.pointsEarned >= 0 ? '+' : ''}${jump.pointsEarned}` : ''}
                    </span>
                    <span className="mx-2">|</span>
                    <span>{formatTimestamp(jump.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <JumpDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleJumpConfirm}
        direction={getDirectionLabel(currentDirection)}
      />
      <BottomNav />
    </div>
  );
}

export default GamePlay;
