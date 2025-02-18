// src/components/forms/BindingForm.tsx
import React from 'react';
import { useBinding } from '../../hooks/useBinding';  // 修改为新路径
import '../../styles/BindingForm.css';

interface BindingFormProps {
  onSubmit: () => void;
}

const BindingForm: React.FC<BindingFormProps> = ({ onSubmit }) => {
  const {
    bindingCardNumber,
    setBindingCardNumber,
    bindingBank,
    setBindingBank,
    bindingExchangeCode,
    setBindingExchangeCode,
    bindingCardHolder,
    setBindingCardHolder,
  } = useBinding();

  return (
    <div className="bindingFormContainer">
      <h2>绑定银行卡</h2>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <label>
          银行卡号:
          <input
            type="text"
            value={bindingCardNumber}
            onChange={(e) => setBindingCardNumber(e.target.value)}
            placeholder="输入银行卡号"
          />
        </label>
        <label>
          银行名称:
          <input
            type="text"
            value={bindingBank}
            onChange={(e) => setBindingBank(e.target.value)}
            placeholder="输入银行名称"
          />
        </label>
        <label>
          兑换码:
          <input
            type="text"
            value={bindingExchangeCode}
            onChange={(e) => setBindingExchangeCode(e.target.value)}
            placeholder="输入兑换码"
          />
        </label>
        <label>
          持卡人姓名:
          <input
            type="text"
            value={bindingCardHolder}
            onChange={(e) => setBindingCardHolder(e.target.value)}
            placeholder="输入持卡人姓名"
          />
        </label>
        <button type="submit">提交</button>
      </form>
    </div>
  );
};

export default BindingForm;
