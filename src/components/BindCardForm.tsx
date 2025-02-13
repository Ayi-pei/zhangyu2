// src/components/RechargeForm.tsx
import React, { useState } from 'react';

const RechargeForm = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [rechargeHistory, setRechargeHistory] = useState<any[]>(JSON.parse(localStorage.getItem('rechargeHistory') || '[]'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && paymentMethod) {
      const newRecord = {
        amount,
        paymentMethod,
        date: new Date().toLocaleString(),
      };
      const updatedHistory = [...rechargeHistory, newRecord];
      setRechargeHistory(updatedHistory);
      localStorage.setItem('rechargeHistory', JSON.stringify(updatedHistory));
      setAmount('');
      setPaymentMethod('');
    } else {
      console.log("모든 필드를 채워주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Amount:</label>
        <input title = "충전 금액을 입력하세요."
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Payment Method:</label>
        <input title = "결제 수단을 입력하세요."
          type="text"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RechargeForm;
