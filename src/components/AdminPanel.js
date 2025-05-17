import React, { useState, useEffect } from 'react';
import { getAuthToken } from '../services/auth';

const AdminPanel = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setError('ログインしてください');
      return;
    }

    fetch('http://localhost:5050/api/admin', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.message) {
          setData(res);
        } else {
          setError('権限がありません');
        }
      })
      .catch((err) => setError('データ取得エラー'));
  }, []);

  return (
    <div>
      <h2>管理者パネル</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data ? (
        <div>
          <p>メールアドレス: {data.user.email}</p>
          <p>権限: {data.user.role}</p>
          <p>メッセージ: {data.message}</p>
        </div>
      ) : (
        <p>データを取得中...</p>
      )}
    </div>
  );
};

export default AdminPanel;
