// src/utils/authRedirect.js
export function handleAuthRedirect() {
  const hash = window.location.hash;

  if (hash) {
    const params = new URLSearchParams(hash.replace('#', '?'));
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      console.log('✅ トークンを保存しました');
      // トップページにリダイレクト
      window.location.href = '/dekutest/react-pwa-karut/';
    }
  }
}
