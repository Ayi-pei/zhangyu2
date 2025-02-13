// src/components/ExchangeForm.tsx
import React, { useState } from 'react';
import './ExchangeForm.css';  // 引入外部 CSS 文件

const ExchangeForm = () => {
  const [exchangeCode, setExchangeCode] = useState('');
  const [points, setPoints] = useState(''); // 将类型统一为 string
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 兑换提交处理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const pointsNumber = Number(points); // 转换为数字

    // 验证兑换点数和兑换码
    if (!exchangeCode || !points || isNaN(pointsNumber) || pointsNumber <= 0) {
      setErrorMessage('Please enter a valid exchange code and points.');
      return;
    }

    // 模拟兑换请求
    setErrorMessage('');
    setSuccessMessage(`Successfully exchanged ${pointsNumber} points using the code ${exchangeCode}.`);
    // 清空表单
    setExchangeCode('');
    setPoints('');
  };

  return (
    <div>
      <h2>Exchange</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Exchange Code:</label>
          <input
            title="교환 코드를 입력하세요." // 请输入兑换码
            type="text"
            value={exchangeCode}
            onChange={(e) => setExchangeCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Points:</label>
          <input
            title="포인트를 입력하세요" // 请输入积分
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            min="1"
            required
          />
        </div>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        {successMessage && <p className="successMessage">{successMessage}</p>}
        <button type="submit">Exchange</button>
      </form>
    </div>
  );
};

export default ExchangeForm;
