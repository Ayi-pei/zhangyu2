// src/components/HistoryPage.tsx
import './HistoryPage.css';

interface RechargeRecord {
    date: string;
    amount: number;
    paymentMethod: string;
  }

  const HistoryPage = () => {
    // 从 localStorage 获取数据，并断言类型为 RechargeRecord[]
    const rechargeHistory = JSON.parse(localStorage.getItem('rechargeHistory') || '[]') as RechargeRecord[];

    return (
      <div>
        <h2>Recharge History</h2>
        <ul>
          {rechargeHistory.map((record: RechargeRecord, index: number) => (
            <li key={index}>
              <span>
                {record.date} - Amount: {record.amount} - Method: {record.paymentMethod}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default HistoryPage;
