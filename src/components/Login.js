import React, { useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Login = () => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) console.error('ログインエラー:', error.message);
  };

  // ユーザー情報を登録する関数
  const registerUser = async (user) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .upsert([{ 
          id: user.id,  // ユーザーIDを保存
          email: user.email, 
          name: user.user_metadata.full_name, 
          role: 'practitioner' 
        }]);

      if (error) {
        console.error('ユーザー登録エラー:', error.message);
      } else {
        console.log('ユーザー登録成功:', data);
      }
    } catch (err) {
      console.error('アップサート処理エラー:', err.message);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log('ログイン成功:', session.user);
        registerUser(session.user);
      }
    };
    getUserInfo();
  }, []);

  return (
    <div>
      <h2>Googleログイン</h2>
      <button onClick={handleGoogleLogin}>Googleでログイン</button>
    </div>
  );
};

export default Login;
