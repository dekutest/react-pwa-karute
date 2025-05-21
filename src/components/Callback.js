import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      console.log('🔄 コールバック開始');

      const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);

      console.log('🔍 exchangeCodeForSession 結果:', data);
      if (error) {
        console.error('❌ セッション交換失敗:', error.message);
        navigate('/login');
        return;
      }

      if (!data?.session) {
        console.warn('⚠️ セッションが取得できませんでした（data.session is null）');
      } else {
        console.log('✅ セッション取得成功:', data.session);
      }

      navigate('/');
    };

    handleOAuthRedirect();
  }, [navigate]);

  return (
    <div>
      <h2>Google認証コールバックページ</h2>
      <p>ログイン処理中です。お待ちください...</p>
    </div>
  );
};

export default Callback;
