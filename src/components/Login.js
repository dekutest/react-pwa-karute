import React, { useState } from 'react';
import { saveAuthToken } from '../services/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, role }),
      });

      if (!response.ok) throw new Error('ログイン失敗');

      const data = await response.json();
      saveAuthToken(data.token);  // トークンを保存
      setMessage('ログイン成功！');
      console.log('トークン保存完了:', data.token);
    } catch (error) {
      setMessage('ログインエラー：' + error.message);
    }
  };

  return (
    <div>
      <h2>管理者ログイン</h2>
      <input
        type="text"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="役割 (admin)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <button onClick={handleLogin}>ログイン</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
