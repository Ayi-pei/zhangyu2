import { AlertCircle } from 'lucide-react';
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
  return (
    <div className="binding-container">
      <div className="binding-card">
        <h2 className="binding-title">绑定银行卡</h2>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}>
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
            <label htmlFor="exchangeCode">兑换码</label>
            <input
              id="exchangeCode"
              type="text"
              value={bindingExchangeCode}
              onChange={(e) => setBindingExchangeCode(e.target.value)}
              placeholder="请输入兑换码"
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

          {/* Error message example */}
          <div className="error-message" style={{ display: 'none' }}>
            <AlertCircle className="w-5 h-5" />
            <span>请填写完整的银行卡信息</span>
          </div>

          <button type="submit" className="submit-button">
            确认绑定
          </button>
        </form>
      </div>
    </div>
  );
};

export default BindingForm;