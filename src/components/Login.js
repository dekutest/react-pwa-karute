import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const Login = () => {
  const [userRole, setUserRole] = useState(null);

  // Googleログイン処理
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
      console.log('Googleログインリクエスト成功');
    } catch (err) {
      console.error('Googleログインエラー:', err.message);
    }
  };

 // ユーザー情報を登録する関数
const registerUser = async (user) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .upsert([{ 
        id: user.id,  
        email: user.email, 
        name: user.user_metadata.full_name || 'No Name', 
        role: 'practitioner'  // 初期値として設定
      }])
      .select();  // ← ここを追加

    if (error) {
      console.error('ユーザー登録エラー:', error.message);
    } else if (data.length > 0) {
      console.log('ユーザー登録成功:', data);
    } else {
      console.warn('アップサート成功だが、返されたデータが空です');
    }
  } catch (err) {
    console.error('アップサート処理エラー:', err.message);
  }
};


  // ログインユーザーの権限を取得
  const fetchUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('権限取得エラー:', error.message);
      } else if (data) {
        setUserRole(data.role);
        console.log('ユーザー権限:', data.role);
      } else {
        console.warn('権限が取得できませんでした');
      }
    } catch (err) {
      console.error('権限取得処理エラー:', err.message);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log('ログイン成功:', session.user);
          await registerUser(session.user);
          await fetchUserRole(session.user.id);  // 権限を取得
        } else {
          console.log('未ログイン状態');
        }
      } catch (err) {
        console.error('セッション取得エラー:', err.message);
      }
    };
    getUserInfo();
  }, []);

  return (
    <div>
      <h2>Googleログイン</h2>
      <button onClick={handleGoogleLogin}>Googleでログイン</button>
      {userRole && <p>あなたの権限: {userRole}</p>}
    </div>
  );
};

export default Login;
