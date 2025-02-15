import { FaTimes } from 'react-icons/fa';
import './SupportDialog.css'; // 假如你需要额外的自定义样式
import { useState } from 'react';

interface SupportDialogProps {
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'support';
  text: string;
}

const SupportDialog: React.FC<SupportDialogProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');

  // 发送消息
  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: messageText },
      ]);
      setMessageText('');
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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        {/* 头部：标题和返回按钮 */}
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h3 className="text-xl font-semibold text-gray-800">联系客服</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 flex items-center"
            aria-label="返回"
          >
            <FaTimes className="w-5 h-5 mr-1" />
            <span className="text-sm">뒤로 가기</span>
          </button>
        </div>

        {/* 内容区域 */}
        <div className="p-4 space-y-4">
          {/* 消息展示区域 */}
          <div className="h-64 overflow-y-auto border border-gray-100 rounded p-2 bg-gray-50">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center">메시지가 없습니다</p>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded ${
                    message.sender === 'user'
                      ? 'bg-blue-100 text-blue-800 self-end'
                      : 'bg-gray-200 text-gray-800 self-start'
                  }`}
                >
                  {message.text}
                </div>
              ))
            )}
          </div>

          {/* 输入区域 */}
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="메시지를 입력해 주세요..."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex-1 mr-2"
              >
                전송
              </button>
              <button
                type="button"
                onClick={handleReceiveMessage}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors flex-1"
              >
                시뮬레이션 답변
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportDialog;
