import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/forms/RegisterForm';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('请填写所有字段');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('密码和确认密码不匹配');
      return;
    }

    // 强密码验证：至少包含一个大写字母、一个数字和一个特殊字符
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage('密码必须包含至少一个大写字母、一个数字和一个特殊字符');
      return;
    }

    setIsSubmitting(true); // 开始提交，防止重复操作
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert('注册成功，请登录！');
        navigate('/login'); // 跳转到登录页面
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || '注册失败，请重试');
      }
    } catch (error) {
      console.error('注册错误:', error);
      setErrorMessage('服务器错误，请稍后再试');
    } finally {
      setIsSubmitting(false); // 结束提交
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold mb-4">注册</h1>
      <RegisterForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        email={email}
        setEmail={setEmail}
        errorMessage={errorMessage}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default RegisterPage;
