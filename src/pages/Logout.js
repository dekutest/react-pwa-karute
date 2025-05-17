import React, { useEffect, useRef } from 'react';
import { supabase } from '../utils/supabaseClient';

const Logout = () => {
  // ログアウト実行フラグを管理
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // 既にログアウト処理が実行されたか確認（StrictMode対策）
        if (hasLoggedOut.current) return;

        // 現在のユーザーを取得
        const { data: { user } } = await supabase.auth.getUser();

        // ユーザーが存在しない場合
        if (!user) {
          if (!hasLoggedOut.current) {
            alert('すでにログアウト済みです');
            hasLoggedOut.current = true;
            window.location.replace('/');
          }
          return;
        }

        // ログアウト実行
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        // ログアウト成功時
        if (!hasLoggedOut.current) {
          alert('ログアウトに成功しました');
          hasLoggedOut.current = true;
          window.location.replace('/');
        }
      } catch (error) {
        console.error('ログアウトエラー:', error.message);
      }
    };

    // useEffectが2回発火しても、1回だけ実行
    if (!hasLoggedOut.current) {
      handleLogout();
    }
  }, []);

  return (
    <div>
      <h2>ログアウト中...</h2>
    </div>
  );
};

export default Logout;
