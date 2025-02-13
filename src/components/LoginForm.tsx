// src/components/LoginForm.tsx
import { FormEvent, useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(`Username: ${username}, Password: ${password}`);
    // 在这里你可以调用API进行登录验证
  };

  // 为表单提交添加类型注解
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Username:</label>
        <input
          title="사용자 이름을 입력하세요." // 请输入用户名
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          title="비밀번호를 입력하세요." // 请输入密码
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
