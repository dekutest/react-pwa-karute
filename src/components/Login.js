import React from 'react';
import { supabase } from '../supabaseClient';

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) throw error;

      // セッションが確定するまで最大5秒待つ
      const waitForSession = async (maxAttempts = 10) => {
        for (let i = 0; i < maxAttempts; i++) {
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            alert('ログイン成功！');
            window.location.href = '/home';
            return;
          }
          await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5秒待機
        }
        alert('セッションの確立に失敗しました');
      };

      await waitForSession();
    } catch (error) {
      console.error('ログインエラー:', error.message);
      alert('ログインに失敗しました');
    }
  };

  return (
    <div className="login-container">
      <h2>ログインページ</h2>
      <button onClick={handleGoogleLogin}>Googleでログイン</button>
    </div>
  );
};

export default Login;
