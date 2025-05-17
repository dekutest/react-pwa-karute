import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

const handleLogin = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
  } catch (error) {
    console.error('ログインエラー:', error.message);
  }
};

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        console.log('ログイン成功：', user);
        setIsAuthenticated(true);  // 認証状態を更新
        navigate('/register');  // ログイン済みならリダイレクト
      } else {
        setIsAuthenticated(false);  // 未ログインの場合
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div>
      <h1>ログインページ</h1>
      {isAuthenticated ? (
        <p>ログイン済みです</p>
      ) : (
        <>
          <button onClick={handleLogin} className="p-2 bg-blue-500 text-white rounded">
            Googleでログイン
          </button>
          <a href="/logout" className="p-2 bg-red-500 text-white rounded mt-2 block">
            ログアウト
          </a>
        </>
      )}
    </div>
  );
};

export default Home;
