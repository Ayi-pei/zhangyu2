import { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import './RechargeForm.css';

const QUICK_AMOUNTS = [100, 200, 500, 1000, 2000, 5000];

const RechargeForm = () => {
  const [amount, setAmount] = useState('');
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleQuickAmountSelect = (value: number) => {
    setSelectedQuickAmount(value);
    setAmount(value.toString());
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMessage('请输入有效的充值金额');
      setSuccessMessage('');
      return;
    }

    // 模拟充值成功
    setErrorMessage('');
    setSuccessMessage(`成功充值 ${numericAmount} 积分`);
    setAmount('');
    setSelectedQuickAmount(null);
  };

  return (
    <div className="recharge-container">
      <div className="recharge-card">
        <h2 className="recharge-title">积分充值</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="amount-input-group">
            <label htmlFor="rechargeAmount">充值金额</label>
            <input
              id="rechargeAmount"
              type="number"
              className="amount-input"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setSelectedQuickAmount(null);
                setErrorMessage('');
              }}
              placeholder="请输入充值金额"
              min="1"
            />
          </div>

          <div className="quick-amounts">
            {QUICK_AMOUNTS.map((value) => (
              <button
                key={value}
                type="button"
                className={`amount-button ${selectedQuickAmount === value ? 'selected' : ''}`}
                onClick={() => handleQuickAmountSelect(value)}
              >
                {value}
              </button>
            ))}
          </div>

          {errorMessage && (
            <div className="message error-message">
              <AlertCircle className="w-5 h-5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="message success-message">
              <CheckCircle className="w-5 h-5" />
              <span>{successMessage}</span>
            </div>
          )}

          <button type="submit" className="recharge-button">
            确认充值
          </button>
        </form>
      </div>
    </div>
  );
};

export default RechargeForm;