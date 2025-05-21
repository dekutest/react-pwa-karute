import React from 'react';
import supabase from '../supabaseClient';

const Login = () => {
  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dekutest/react-pwa-karut/callback/`,
          queryParams: {
            prompt: 'select_account',
          },
        },
        flowType: 'pkce',
      });
      if (error) throw error;
      alert("ログイン処理中...");
    } catch (error) {
      console.error("ログイン失敗:", error.message);
    }
  };

  return (
    <div>
      <h2>電子カルテアプリ ログインページ</h2>
      <p>このページはログイン画面です。</p>
      <button onClick={handleLogin}>Googleでログイン</button>
    </div>
  );
};

export default Login;
