// src/components/BindingForm.tsx
import React from 'react';

const BindingForm = ({ bindingCardNumber, setBindingCardNumber, bindingBank, setBindingBank, bindingExchangeCode, setBindingExchangeCode, bindingCardHolder, setBindingCardHolder, onSubmit }: { bindingCardNumber: string; setBindingCardNumber: React.Dispatch<React.SetStateAction<string>>; bindingBank: string; setBindingBank: React.Dispatch<React.SetStateAction<string>>; bindingExchangeCode: string; setBindingExchangeCode: React.Dispatch<React.SetStateAction<string>>; bindingCardHolder: string; setBindingCardHolder: React.Dispatch<React.SetStateAction<string>>; onSubmit: () => void }) => (
  <div>
    <h4 className="font-semibold">绑定银行卡</h4>
    <input type="text" placeholder="银行卡号" value={bindingCardNumber} onChange={(e) => setBindingCardNumber(e.target.value)} className="w-full p-2 mt-2 border border-gray-300 rounded" />
    <input type="text" placeholder="银行名称" value={bindingBank} onChange={(e) => setBindingBank(e.target.value)} className="w-full p-2 mt-2 border border-gray-300 rounded" />
    <input type="text" placeholder="兑换码" value={bindingExchangeCode} onChange={(e) => setBindingExchangeCode(e.target.value)} className="w-full p-2 mt-2 border border-gray-300 rounded" />
    <input type="text" placeholder="卡主姓名" value={bindingCardHolder} onChange={(e) => setBindingCardHolder(e.target.value)} className="w-full p-2 mt-2 border border-gray-300 rounded" />
    <button type="button" onClick={onSubmit} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">提交绑定</button>
  </div>
);

export default BindingForm;
