import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const authenticated = await checkAuth();
        if (!authenticated) {
          alert('ログインが必要です');
          navigate('/');
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('認証チェックエラー:', error.message);
        navigate('/');
      }
    };
    verifyAuth();
  }, [navigate]);

  if (!isAuthenticated) {
    return <p>認証中...</p>; // 認証中は一時的に表示
  }

  return children;
};

export default ProtectedRoute;
