import { FaTimes } from 'react-icons/fa'; // 使用 FaTimes 代替 X
import './SupportDialog.css'; // 导入样式文件
import { useState } from 'react';

// 为 onClose 添加类型声明
interface SupportDialogProps {
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'support';
  text: string;
}

const SupportDialog: React.FC<SupportDialogProps> = ({ onClose }) => {
  // 初始化消息列表
  const [messages, setMessages] = useState<Message[]>([]);

  // 当前输入的消息
  const [messageText, setMessageText] = useState('');

  // 发送消息
  const handleSendMessage = () => {
    if (messageText.trim()) {
      // 发送的消息
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: messageText },
      ]);
      setMessageText(''); // 清空输入框
    }
  };

  // 模拟客服回复
  const handleReceiveMessage = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'support', text: '고객 센터：안녕하세요, 어떤 문제 있으신가요?' },
    ]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">联系客服</h3>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FaTimes className="w-5 h-5" />
            뒤로 가기
          </button>
        </div>

        <div className="customer-support-container">
          <div className="messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'user' ? 'user-message' : 'support-message'}`}
              >
                <span>{message.text}</span>
              </div>
            ))}
          </div>

          <div className="input-container">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="메시지를 입력해 주세요..."
              className="w-full p-2 mt-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleSendMessage}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              전송
            </button>
          </div>

          <button
            onClick={handleReceiveMessage}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            시뮬레이션된 고객 서비스 답변
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportDialog;
