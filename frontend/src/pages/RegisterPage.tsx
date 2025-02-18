import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/forms/RegisterForm'; // 引入注册表单组件

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigate = useNavigate(); // 用于导航

  // 提交注册表单
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 表单验证
    if (password !== confirmPassword) {
      setErrorMessage('密码和确认密码不匹配');
      return;
    }
    if (!username || !password || !email) {
      setErrorMessage('请填写所有字段');
      return;
    }

    // 强密码验证：至少包含一个大写字母、一个数字和一个特殊字符
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage('密码必须至少包含一个大写字母、一个数字和一个特殊字符');
      return;
    }

    // 模拟注册 API 调用，成功后处理
    console.log(`注册用户：${username}, 邮箱：${email}`);
    setErrorMessage('');
    // 清空表单
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setEmail('');

    // 跳转到成功注册页面或其他页面
    navigate('/profile');
  };

  return (
    <div className="register-page">
      <h1>注册</h1>
      <RegisterForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        email={email}
        setEmail={setEmail}
        onSubmit={handleSubmit}
      />
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    </div>
  );
};

export default RegisterPage;
