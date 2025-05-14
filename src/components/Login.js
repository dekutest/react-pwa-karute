import React from 'react';
import { supabase } from '../supabaseClient';

const Login = () => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) console.error('ログインエラー:', error.message);
  };

  return (
    <div>
      <h2>Googleログイン</h2>
      <button onClick={handleGoogleLogin}>Googleでログイン</button>
    </div>
  );
};

export default Login;
