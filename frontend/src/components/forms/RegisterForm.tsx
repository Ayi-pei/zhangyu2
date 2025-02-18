import { Dispatch, SetStateAction } from 'react';
import '../../styles/RegisterForm.css';

interface RegisterFormProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  errorMessage: string;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean; // 添加加载状态
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  email,
  setEmail,
  errorMessage,
  onSubmit,
  isSubmitting = false, // 默认状态为 false
}) => {
  return (
    <div className="registerContainer">
      <h2 className="registerTitle">注册账号</h2>
      <form onSubmit={onSubmit}>
        <div className="formGroup">
          <label htmlFor="username">用户名</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="请输入用户名"
            required
            autoComplete="off"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="email">邮箱</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="请输入邮箱"
            required
            autoComplete="off"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="password">密码</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入密码"
            required
            autoComplete="new-password"
            minLength={8}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="confirmPassword">确认密码</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="请确认密码"
            required
            autoComplete="new-password"
            minLength={8}
          />
        </div>

        {errorMessage && <div className="errorMessage">{errorMessage}</div>}

        <button
          type="submit"
          className="registerButton"
          disabled={isSubmitting} // 防止重复提交
        >
          {isSubmitting ? '注册中...' : '注册'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
