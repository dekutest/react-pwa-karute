import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);  // 初期値をnullに
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate('/');  // ログインページへリダイレクト
        }
      } catch (error) {
        console.error('認証チェックエラー:', error.message);
        setIsAuthenticated(false);
        navigate('/');  // ログインページへリダイレクト
      }
    };
    checkAuth();
  }, [navigate]);

  // 認証状態がまだ確定していない場合
  if (isAuthenticated === null) {
    return <p>認証中...</p>;
  }

  // 認証されていない場合
  if (!isAuthenticated) {
    return <p>ログインが必要です。</p>;
  }

  // 認証成功時に子コンポーネントを表示
  return children;
};

export default ProtectedRoute;
