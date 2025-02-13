import { useState } from 'react';
import './Profile.css'; // 引入样式文件

const Profile = () => {
  const [showSupportDialog, setShowSupportDialog] = useState(false);

  // 用户信息
  const playerStats = {
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    nickname: '플레이어:001',
    balance: 1000,
    reputation: 100,
    vipLevel: 1,
  };

  // 点击返回按钮的处理函数
  const handleBack = () => {
    // 这里可以跳转回首页，假设使用 React Router
    window.location.href = '/'; // 假设返回首页的方式
  };

  return (
    <div className="profile-container p-4">
      {/* 返回按钮 */}
      <button onClick={handleBack} className="back-btn text-white bg-blue-500 p-2 rounded-md">
        返回首页
      </button>

      {/* 用户信息部分 */}
      <div className="user-info flex items-center gap-4 mt-6">
        <img src={playerStats.avatar} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-white" />
        <div className="text-white">
          <h2 className="text-xl font-bold">{playerStats.nickname}</h2>
          <div className="flex gap-4 mt-2 text-sm">
            <span>当前余额: {playerStats.balance}</span>
            <span>玩家信誉: {playerStats.reputation}</span>
            <span className="text-yellow-500">VIP等级 {playerStats.vipLevel} <span className="text-yellow-400">★</span></span>
          </div>
        </div>
      </div>

      {/* 功能部分 */}
      <div className="functions mt-6 space-y-4">
        <button className="function-btn w-full p-3 text-white bg-green-500 rounded-md">历史记录</button>
        <button className="function-btn w-full p-3 text-white bg-yellow-500 rounded-md">绑卡-兑换</button>
        <button className="function-btn w-full p-3 text-white bg-blue-500 rounded-md">积分补充</button>
        <button className="function-btn w-full p-3 text-white bg-purple-500 rounded-md" onClick={() => setShowSupportDialog(true)}>
          客服支持
        </button>
        <button className="function-btn w-full p-3 text-white bg-red-500 rounded-md">结束退出</button>
      </div>

      {/* 客服支持弹窗 */}
      {showSupportDialog && (
        <div className="support-dialog fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-bold">联系客服</h3>
            <button
              className="mt-4 p-2 bg-red-500 text-white rounded-md"
              onClick={() => setShowSupportDialog(false)}
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
