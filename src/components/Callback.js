import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);

      if (error) {
        console.error('セッション交換失敗:', error.message);
        navigate('/login');
        return;
      }

      console.log('✅ セッション取得成功');
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
