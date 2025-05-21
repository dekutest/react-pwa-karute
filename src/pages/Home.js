import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import { useAbility } from '../contexts/AbilityContext';

const Home = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const ability = useAbility();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session || !session.user) {
        console.log('未ログイン状態です');
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);
      setUserEmail(session.user.email);

      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('ロール取得失敗:', error);
      } else {
        setRole(data.role);
      }

      setLoading(false);
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
redirectTo: 'https://react-pwa-karute.vercel.app/callback'

      },
    });

    if (error) {
      console.error('ログイン失敗:', error.message);
    } else {
      console.log('✅ Googleログイン画面にリダイレクトします');
    }
  };

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (!isLoggedIn) {
    return (
      <div>
        <h1>ホームページ</h1>
        <p>ログインしていません</p>
        <button onClick={handleLogin}>Googleでログイン</button>
      </div>
    );
  }

  return (
    <div>
      <h1>ホームページ</h1>
      <p>あなたのロール: {role}</p>
      <p>ログイン中: {userEmail}</p>

      {ability.can('update', 'Patient') && (
        <button onClick={() => navigate('/patients')}>患者情報を編集する</button>
      )}

      {ability.can('update', 'Patient') && (
        <button onClick={() => navigate('/patients')}>施術記録を入力する</button>
      )}

      {!ability.can('update', 'Patient') && (
        <p>閲覧専用モードです（編集不可）</p>
      )}

      <div style={{ marginTop: '20px' }}>
        <Link to="/patients">📋 患者一覧ページへ</Link>
      </div>

      <div style={{ marginTop: '40px' }}>
        <button onClick={handleLogin}>Googleでログイン</button>
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
          ログアウト
        </button>
      </div>
    </div>
  );
};

export default Home;
