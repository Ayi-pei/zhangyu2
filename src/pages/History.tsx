// src/pages/History.tsx
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface JumpRecord {
  direction: string;
  steps: number;
  results: string[];
  timestamp: number;
  pointsEarned: number;
  status: 'pending' | 'completed';
}

const History = () => {
  const [records, setRecords] = useState<JumpRecord[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRecords = localStorage.getItem('jumpHistory');
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
        type="button"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        返回
      </button>
      <h1 className="text-2xl font-bold mb-4">历史记录</h1>
      {records.length === 0 ? (
        <p>暂无记录</p>
      ) : (
        <div className="space-y-4">
          {records.map((record, index) => (
            <div key={index} className="p-4 bg-white rounded shadow">
              <div className="flex justify-between">
                <span>选择: {record.direction}</span>
                <span>投注: {record.steps}</span>
              </div>
              <div className="flex justify-between">
                <span>结果: {record.status === 'completed' ? record.results.join(' ') : '等待中'}</span>
                <span>收益: {record.pointsEarned >= 0 ? '+' : ''}{record.pointsEarned}</span>
              </div>
              <div className="text-sm text-gray-500">
                {formatTimestamp(record.timestamp)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
