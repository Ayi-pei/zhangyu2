import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import '../../styles/BindingForm.css';

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
  const navigate = useNavigate();
  const [isCardBound, setIsCardBound] = useState(false);
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showExchangeForm, setShowExchangeForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // 检查是否已绑定银行卡
    const boundCard = localStorage.getItem('boundCard');
    if (boundCard) {
      const cardData = JSON.parse(boundCard);
      setBindingCardNumber(cardData.cardNumber);
      setBindingBank(cardData.bank);
      setBindingCardHolder(cardData.cardHolder);
      setIsCardBound(true);
    }
  }, [setBindingCardNumber, setBindingBank, setBindingCardHolder]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bindingCardNumber || !bindingBank || !bindingExchangeCode || !bindingCardHolder) {
      setError('请填写完整的银行卡信息');
      return;
    }

    // 保存绑卡信息
    const cardData = {
      cardNumber: bindingCardNumber,
      bank: bindingBank,
      cardHolder: bindingCardHolder,
      exchangeCode: bindingExchangeCode
    };
    localStorage.setItem('boundCard', JSON.stringify(cardData));
    setIsCardBound(true);
    setSuccess('银行卡绑定成功！');
    onSubmit();
  };

  const handleExchange = (e: React.FormEvent) => {
    e.preventDefault();
    const boundCard = localStorage.getItem('boundCard');
    if (!boundCard) {
      setError('请先绑定银行卡');
      return;
    }

    const cardData = JSON.parse(boundCard);
    if (verificationCode !== cardData.exchangeCode) {
      setError('兑换码验证失败');
      return;
    }

    const points = parseInt(exchangeAmount);
    if (isNaN(points) || points <= 0) {
      setError('请输入有效的兑换积分数量');
      return;
    }

    // 获取当前余额
    const currentBalance = parseInt(localStorage.getItem('playerBalance') || '0');
    if (points > currentBalance) {
      setError('积分余额不足');
      return;
    }

    // 计算兑换金额（10积分 = 1韩元）
    const krwAmount = points / 10;
    
    // 更新余额
    localStorage.setItem('playerBalance', (currentBalance - points).toString());
    
    setSuccess(`成功兑换 ${points} 积分为 ${krwAmount} 韩元`);
    setExchangeAmount('');
    setVerificationCode('');
  };

  return (
    <div className="binding-container">
      <button
        type="button"
        onClick={() => navigate('/profile')}
        className="back-button"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>返回个人中心</span>
      </button>

      <div className="binding-card">
        <h2 className="binding-title">{isCardBound ? '银行卡管理' : '绑定银行卡'}</h2>
        
        {error && (
          <div className="error-message">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="success-message">
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">银行卡号</label>
            <input
              id="cardNumber"
              type="text"
              value={bindingCardNumber}
              onChange={(e) => setBindingCardNumber(e.target.value)}
              placeholder="请输入银行卡号"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bank">开户银行</label>
            <input
              id="bank"
              type="text"
              value={bindingBank}
              onChange={(e) => setBindingBank(e.target.value)}
              placeholder="请输入开户银行"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cardHolder">持卡人姓名</label>
            <input
              id="cardHolder"
              type="text"
              value={bindingCardHolder}
              onChange={(e) => setBindingCardHolder(e.target.value)}
              placeholder="请输入持卡人姓名"
            />
          </div>

          {!isCardBound && (
            <div className="form-group">
              <label htmlFor="exchangeCode">兑换码</label>
              <input
                id="exchangeCode"
                type="text"
                value={bindingExchangeCode}
                onChange={(e) => setBindingExchangeCode(e.target.value)}
                placeholder="请设置兑换码"
              />
            </div>
          )}

          {!isCardBound && (
            <button type="submit" className="submit-button">
              确认绑定
            </button>
          )}
        </form>

        {isCardBound && (
          <div className="exchange-section">
            <button
              type="button"
              onClick={() => setShowExchangeForm(!showExchangeForm)}
              className="toggle-exchange-button"
            >
              {showExchangeForm ? '隐藏兑换表单' : '积分兑换'}
            </button>

            {showExchangeForm && (
              <form onSubmit={handleExchange} className="exchange-form">
                <div className="form-group">
                  <label htmlFor="exchangeAmount">兑换积分</label>
                  <input
                    id="exchangeAmount"
                    type="number"
                    value={exchangeAmount}
                    onChange={(e) => setExchangeAmount(e.target.value)}
                    placeholder="请输入要兑换的积分数量"
                    min="1"
                  />
                  <small className="exchange-rate">兑换比例：10积分 = 1韩元</small>
                </div>

                <div className="form-group">
                  <label htmlFor="verificationCode">兑换码验证</label>
                  <input
                    id="verificationCode"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="请输入兑换码"
                  />
                </div>

                <button type="submit" className="exchange-button">
                  确认兑换
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BindingForm;