import React, { useState } from 'react';
import PlayerInfo from '../components/PlayerInfo';
import BindingForm from '../components/BindingForm';
import ExchangeForm from '../components/ExchangeForm';
import SupportDialog from '../components/SupportDialog';

const Profile = () => {
  const [showSupportDialog, setShowSupportDialog] = useState(false);

  // 绑定银行卡信息
  const [bindingCardNumber, setBindingCardNumber] = useState('');
  const [bindingBank, setBindingBank] = useState('');

  // **补全缺少的状态**
  const [bindingExchangeCode, setBindingExchangeCode] = useState('');
  const [bindingCardHolder, setBindingCardHolder] = useState('');

  const playerStats = {
    balance: 1000,
    health: 100,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    nickname: '플레이어:001',
  };

  return (
    <div>
      <PlayerInfo {...playerStats} />

      <BindingForm
        bindingCardNumber={bindingCardNumber}
        setBindingCardNumber={setBindingCardNumber}
        bindingBank={bindingBank}
        setBindingBank={setBindingBank}
        bindingExchangeCode={bindingExchangeCode}  // ✅ 传递新的 `props`
        setBindingExchangeCode={setBindingExchangeCode}
        bindingCardHolder={bindingCardHolder}
        setBindingCardHolder={setBindingCardHolder}
        onSubmit={() => { /* 绑定的提交逻辑 */ }}
      />

      <ExchangeForm /* 传递兑换表单所需的props */ />

      <button
        type="button"
        title="고객에게 연락하세요"
        onClick={() => setShowSupportDialog(true)}
      >
        고객에게 연락하세요
      </button>

      {showSupportDialog && <SupportDialog onClose={() => setShowSupportDialog(false)} />}
    </div>
  );
};
console.log(React.version);
export default Profile;
