import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, X, RefreshCw } from 'lucide-react';
import BottomNav from '../components/BottomNav';

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
  const currentBalance = parseInt(localStorage.getItem('playerBalance') || '3000', 10);
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
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">/* 닫기 버튼 */
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
  const [location] = useLocation();
  const mode = location.split('/').pop() || '3min';
  const [, setLocation] = useLocation();

  // 根据 mode 返回对应的回合时长（单位：秒）
  const getDuration = (mode: string): number => {
    switch (mode) {
      case '3min': return 180;
      case '5min': return 300;
      case '12min': return 720;
      default: return 180;
    }
  };

  const duration = getDuration(mode);
  const roundStartKey = `roundStart_${mode}`;

  // 初始化回合倒计时：若 localStorage 中有保存的回合开始时间且未超时，则计算剩余秒数；否则，开始新回合
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
  const [jumps, setJumps] = useState<Jump[]>(() => {
    const savedJumps = localStorage.getItem('jumpHistory');
    return savedJumps ? JSON.parse(savedJumps) : [];
  });
  const [isSpinning, setIsSpinning] = useState(false);

  // startNewRound：重置回合倒计时为当前模式的默认时长，保存新的回合开始时间（基于首尔时间）
  const startNewRound = () => {
    const currentSeoulTime = getSeoulTime();
    localStorage.setItem(roundStartKey, currentSeoulTime.toString());
    setTimeLeft(duration);
  };

  // 每秒更新回合倒计时（基于首尔时间）
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
  }, [mode]);

  // 当倒计时归零时，更新每笔 pending 投注的结果、玩家余额，并启动新回合
  useEffect(() => {
    if (timeLeft === 0) {
      const possibleResults = ['귀엽', '순수하', '직설적이', '섹시하'];
      const currentBets = JSON.parse(localStorage.getItem('currentBets') || '{}');
      // 生成两个不同的随机结果
      const result1Index = Math.floor(Math.random() * possibleResults.length);
      let result2Index = Math.floor(Math.random() * possibleResults.length);
      while (result2Index === result1Index) {
        result2Index = Math.floor(Math.random() * possibleResults.length);
      }
      const results = [possibleResults[result1Index], possibleResults[result2Index]];

      // 更新所有 pending 状态的投注记录（jump）
      setJumps(prevJumps => {
        const updatedJumps = prevJumps.map(jump => {
          if (jump.status === 'pending') {
            const label = getDirectionLabel(jump.direction);
            const pointsEarned = results.includes(label) ? jump.steps * 2 : -jump.steps;
            return {
              ...jump,
              results,
              pointsEarned,
              status: 'completed' as 'pending' | 'completed'
            };
          }
          return jump;
        });
        localStorage.setItem('jumpHistory', JSON.stringify(updatedJumps.slice(-15)));
        return updatedJumps;
      });

      // 根据投注结果更新玩家余额
      const currentBalance = parseInt(localStorage.getItem('playerBalance') || '3000', 10);
      let totalEarnings = 0;
      Object.entries(currentBets).forEach(([direction, amount]) => {
        if (results.includes(getDirectionLabel(direction))) {
          totalEarnings += Number(amount) * 2;
        } else {
          totalEarnings -= Number(amount);
        }
      });
      const newBalance = currentBalance + totalEarnings;
      localStorage.setItem('playerBalance', newBalance.toString());
      localStorage.setItem('currentBets', '{}');
      // 启动新回合
      startNewRound();
    }
  }, [timeLeft]);

  // 将投注方向转换为对应的标签
  const getDirectionLabel = (direction: string) => {
    switch (direction) {
      case '前': return '귀엽';
      case '后': return '순수하';
      case '左': return '직설적이';
      case '右': return '섹시하';
      default: return '';
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

  const handleJumpConfirm = (steps: number) => {
    setIsSpinning(true);
    const currentBets = JSON.parse(localStorage.getItem('currentBets') || '{}');
    currentBets[currentDirection] = (currentBets[currentDirection] || 0) + steps;
    localStorage.setItem('currentBets', JSON.stringify(currentBets));
    const currentBalance = parseInt(localStorage.getItem('playerBalance') || '3000', 10);
    const newBalance = currentBalance - steps;
    localStorage.setItem('playerBalance', newBalance.toString());
    const newJump: Jump = {
      direction: currentDirection,
      steps,
      results: [],
      timestamp: getSeoulTime(), // 使用首尔时间戳
      pointsEarned: 0,
      status: 'pending'
    };
    setJumps(prevJumps => {
      const newJumps = [...prevJumps, newJump];
      localStorage.setItem('jumpHistory', JSON.stringify(newJumps.slice(-15)));
      return newJumps.slice(-15);
    });
    setIsSpinning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8c52ff] to-[#ff914d] pb-16">
      <div className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            반환
          </button>
          <h1 className="text-xl font-bold">{`${mode} 모드`}</h1>
          <div className="bg-blue-700 px-4 py-2 rounded-lg">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
          {[
            { direction: '前', label: '귀엽', gradient: 'from-pink-500 to-rose-500' },
            { direction: '后', label: '순수하', gradient: 'from-purple-500 to-indigo-500' },
            { direction: '左', label: '직설적이', gradient: 'from-blue-500 to-cyan-500' },
            { direction: '右', label: '섹시하', gradient: 'from-orange-500 to-amber-500' }
          ].map(({ direction, label, gradient }) => (
            <button
              key={direction}
              onClick={() => handleJumpClick(direction)}
              className={`group relative bg-gradient-to-br ${gradient} p-8 rounded-2xl 
                         flex items-center justify-center transition-all transform hover:scale-105 
                         hover:shadow-lg active:scale-95 active:shadow-inner`}
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
                    <span>결과: {jump.status === 'pending' ? '결과 대기 중' : jump.results.join(' + ')}</span>
                    <span className="mx-2">|</span>
                    <span>{jump.status === 'completed' ? `${jump.pointsEarned >= 0 ? '+' : ''}${jump.pointsEarned}` : ''}</span>
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
