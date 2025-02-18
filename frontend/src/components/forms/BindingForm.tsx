import React from 'react';

interface BindingFormProps {
  bindingCardNumber: string;
  setBindingCardNumber: React.Dispatch<React.SetStateAction<string>>;
  bindingBank: string;
  setBindingBank: React.Dispatch<React.SetStateAction<string>>;
  bindingExchangeCode: string;
  setBindingExchangeCode: React.Dispatch<React.SetStateAction<string>>;
  bindingCardHolder: string;
  setBindingCardHolder: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
}

const BindingForm: React.FC<BindingFormProps> = ({
  bindingCardNumber,
  setBindingCardNumber,
  bindingBank,
  setBindingBank,
  bindingExchangeCode,
  setBindingExchangeCode,
  bindingCardHolder,
  setBindingCardHolder,
  onSubmit
}) => {
  return (
    <div>
      <h2>绑定银行卡</h2>
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
      <button onClick={onSubmit}>提交</button>
    </div>
  );
};

export default BindingForm;
