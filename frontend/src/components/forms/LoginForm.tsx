import { FormEvent, useState } from 'react';

const LoginForm = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (username === 'user' && password === 'password') {
      if (rememberMe) {
        localStorage.setItem('username', username); // 记住用户名
      }
      onLoginSuccess();
    } else {
      setError('用户名或密码错误');
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl mb-4 text-center">Login</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          title="请输入用户名"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded-md mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          title="请输入密码"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-md mt-1"
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <div className="flex justify-between items-center mb-4">
        <div>
          <input
            type="checkbox"
            id="rememberMe"
            className="mr-2"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe" className="text-sm">Remember Me</label>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
