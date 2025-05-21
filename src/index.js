import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import supabase from './supabaseClient';

// ✅ ハッシュ形式（/#access_token=...）を検出して、クエリに変換して処理する
if (window.location.hash.includes('access_token')) {
  (async () => {
    try {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const queryString = new URLSearchParams(hashParams).toString();
      const redirectUrl = `${window.location.origin}/callback?${queryString}`;

      const { data, error } = await supabase.auth.exchangeCodeForSession(redirectUrl);

      if (error) {
        console.error('セッション復元エラー:', error.message);
      } else {
        console.log('🛠️ ハッシュからセッション復元成功:', data);
      }
    } catch (err) {
      console.error('例外エラー:', err);
    } finally {
      // 成功・失敗にかかわらず遷移
      window.location.replace('/dekutest/react-pwa-karut/');
    }
  })();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/dekutest/react-pwa-karut">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
