import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { forceLogout } from '../utils/auth';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          setUser(data.user);
        } else {
          forceLogout();
          window.location.href = '/';
        }
      } catch (error) {
        console.error('ユーザー情報取得エラー:', error.message);
        forceLogout();
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h2>ホーム画面</h2>
      {user ? (
        <div>
          <p>ログイン中: {user.email}</p>
          <button onClick={forceLogout}>ログアウト</button>
        </div>
      ) : (
        <p>ユーザー情報を取得中...</p>
      )}
    </div>
  );
};

export default Home;
