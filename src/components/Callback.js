import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1)); // "#"を除去
    const accessToken = params.get('access_token');

    if (accessToken) {
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: params.get('refresh_token'),
      }).then(() => {
        alert('ログイン成功！');
        navigate('/');
      }).catch((error) => {
        console.error('セッション設定エラー:', error);
        navigate('/login');
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h2>Google認証コールバックページ</h2>
      <p>ログイン処理中です。お待ちください...</p>
    </div>
  );
};

export default Callback;
