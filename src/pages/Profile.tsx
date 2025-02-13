import React, { useState } from 'react';
import PlayerInfo from './components/PlayerInfo';
import BindingForm from './components/BindingForm';
import ExchangeForm from './components/ExchangeForm';
import SupportDialog from './components/SupportDialog';

const Profile = () => {
  const [showSupportDialog, setShowSupportDialog] = useState(false);

  const playerStats = {
    balance: 1000,
    health: 100,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    nickname: '플레이어:001',
  };

  return (
    <div>
      <PlayerInfo {...playerStats} />
      <BindingForm /* 传递绑定表单所需的props */ />
      <ExchangeForm /* 传递兑换表单所需的props */ />
      <button onClick={() => setShowSupportDialog(true)}>联系客服</button>

      {showSupportDialog && <SupportDialog onClose={() => setShowSupportDialog(false)} />}
    </div>
  );
};

export default Profile;
