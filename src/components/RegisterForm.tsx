// src/components/RegisterForm.tsx
import { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 表单提交处理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 表单验证
    if (password !== confirmPassword) {
      setErrorMessage('Password and Confirm Password must match!');
      return;
    }
    if (!username || !password || !email) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    // 假设这里调用一个注册 API，成功后进行处理
    console.log(`Registering user: ${username}, Email: ${email}`);
    setErrorMessage('');
    // 清空表单
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setEmail('');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input title = "사용자 이름은 최소 6자 이상이어야 합니다"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input title = "이메일을 입력하세요."
            type="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input title = "비밀번호는 최소 8자 이상이어야 하며, 대문자와 소문자, 숫자가 포함되어야 합니다"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input title = "비밀번호를 다시 입력하세요."
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
