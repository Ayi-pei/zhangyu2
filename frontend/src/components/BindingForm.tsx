import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import './BindingForm.css';

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

  // 组件加载时请求后端获取用户已绑定的银行卡信息
  useEffect(() => {
    fetch('/api/card-info')
      .then(res => res.json())
      .then(data => {
        if (data && data.cardNumber) {
          setBindingCardNumber(data.cardNumber);
          setBindingBank(data.bank);
          setBindingCardHolder(data.cardHolder);
          // 可选：如果后端返回兑换码，也可以设置
          setIsCardBound(true);
        }
      })
      .catch(err => {
        console.error('获取绑卡信息失败:', err);
        // 可以根据需求设置错误提示，这里选择不提示
      });
  }, [setBindingCardNumber, setBindingBank, setBindingCardHolder]);

  // 绑定银行卡表单提交处理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!bindingCardNumber || !bindingBank || !bindingExchangeCode || !bindingCardHolder) {
      setError('请填写完整的银行卡信息');
      return;
    }
    
    fetch('/api/bind-card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cardNumber: bindingCardNumber,
        bank: bindingBank,
        cardHolder: bindingCardHolder,
        exchangeCode: bindingExchangeCode
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIsCardBound(true);
          setSuccess('银行卡绑定成功！');
          onSubmit();
        } else {
          setError(data.message || '绑定失败，请重试');
        }
      })
      .catch(err => {
        console.error('绑定错误:', err);
        setError('绑定过程中出现错误，请稍后重试');
      });
  };

  // 积分兑换表单提交处理
  const handleExchange = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 若没有绑定银行卡，则直接提示错误
    if (!isCardBound) {
      setError('请先绑定银行卡');
      return;
    }

    const points = parseInt(exchangeAmount);
    if (isNaN(points) || points <= 0) {
      setError('请输入有效的兑换积分数量');
      return;
    }

    fetch('/api/exchange', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        exchangeAmount: points,
        verificationCode: verificationCode
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // 假设后端返回了兑换后的积分数和对应韩元金额
          setSuccess(`成功兑换 ${data.points} 积分为 ${data.krwAmount} 韩元`);
          // 可选：若后端返回更新后的用户余额，可在此更新状态
          setExchangeAmount('');
          setVerificationCode('');
        } else {
          setError(data.message || '兑换失败，请重试');
        }
      })
      .catch(err => {
        console.error('兑换错误:', err);
        setError('兑换过程中出现错误，请稍后重试');
      });
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
              disabled={isCardBound}  // 已绑定后不可修改
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
              disabled={isCardBound}
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
              disabled={isCardBound}
            />
          </div>

          {/* 未绑定状态下才允许设置兑换码 */}
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
