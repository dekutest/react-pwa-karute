import React from 'react';
import { supabase } from '../supabaseClient';

const Login = () => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) console.error('ログインエラー:', error.message);
  };

  const registerUser = async (user) => {
    const { data, error } = await supabase
      .from('users')
      .upsert([{ email: user.email, name: user.user_metadata.full_name, role: 'practitioner' }]);
    if (error) console.error('ユーザー登録エラー:', error.message);
    else console.log('ユーザー登録完了:', data);
  };

  React.useEffect(() => {
    const getUserInfo = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // 初回ログイン時にユーザー情報を登録
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
