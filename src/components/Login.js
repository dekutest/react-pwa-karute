import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Login = () => {
  const navigate = useNavigate();
  const [isSessionChecked, setIsSessionChecked] = useState(false);

  // 初期セッションチェック
  useEffect(() => {
    const handleSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log('💾 初期セッションチェック:', session);

      if (error) {
        console.error('❌ セッション取得エラー:', error.message);
        return;
      }

      if (session) {
        console.log('✅ 既にログイン済み');
        navigate('/home', { replace: true });
      } else {
        console.log('🔓 ログインが必要です');
      }
      setIsSessionChecked(true);
    };

    handleSession();

    // 認証状態の監視
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth State Change:', event, session);

      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        if (session && session.user) {
          console.log('✅ ログイン成功:', session.user);
          alert('ログイン成功！');
          navigate('/home', { replace: true });
        } else {
          // 警告文をわかりやすく変更
          console.warn('🔄 セッションの確認中...（一時的な状態です）');
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('📝 ログアウトしました');
        alert('ログアウトしました');
        navigate('/');
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  // ログイン処理
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) throw error;

      console.log('🌐 Googleログイン開始');
    } catch (error) {
      console.error('ログインエラー:', error.message);
      alert('ログインに失敗しました');
    }
  };

  if (!isSessionChecked) {
    return <div>🔄 認証情報を確認中...</div>;
  }

  return (
    <div className="login-container">
      <h2>ログインページ</h2>
      <button onClick={handleGoogleLogin}>Googleでログイン</button>
    </div>
  );
};

export default Login;
