import { useState } from 'react';
import './RechargeForm.css';  // 引入外部CSS

const RechargeForm = () => {
  // 将状态统一为字符串
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 将输入的金额转换为数字
    const numericAmount = Number(amount);

    // 检查转换后的值是否为有效数字且大于0
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMessage('Please enter a valid recharge amount.');
      setSuccessMessage('');
      return;
    }

    // 模拟充值逻辑
    setErrorMessage('');
    setSuccessMessage(`Successfully recharged ${numericAmount} units.`);

    // 清空表单
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="rechargeAmount">Recharge Amount:</label>
        <input
          id="rechargeAmount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter recharge amount"  // 可访问性提示
          title="충전 금액을 입력하세요."              // 请输入充值金额
          required
        />
      </div>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      {successMessage && <p className="successMessage">{successMessage}</p>}
      <button type="submit">Recharge</button>
    </form>
  );
};

export default RechargeForm;
