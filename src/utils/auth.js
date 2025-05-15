import { supabase } from '../supabaseClient';

// 認証チェック関数（リトライ付き）
const checkAuth = async (retries = 3) => {
  try {
    for (let attempt = 1; attempt <= retries; attempt++) {
      const { data, error } = await supabase.auth.getSession();
      console.log(`🔄 認証チェック (試行 ${attempt})`, data);

      if (error) {
        console.error('❌ 認証チェックエラー:', error.message);
        return false;
      }

      // セッションが存在しない場合、リトライ
      if (!data || !data.session) {
        console.warn('⚠️ セッションが存在しない (リトライ)');
        await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5秒待機
        continue;
      }

      console.log('✅ 認証成功:', data);
      return true;
    }

    console.error('❌ 最大リトライ数に達しました');
    return false;
  } catch (error) {
    console.error('❌ 認証エラー:', error.message);
    return false;
  }
};

// 強制ログアウト関数
const forceLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error('ログアウトに失敗しました');
    }
    localStorage.removeItem('supabase.auth.token');
    sessionStorage.removeItem('supabase.auth.token');
    alert('ログアウトしました。再度ログインしてください。');
    window.location.href = '/';
  } catch (error) {
    console.error('❌ ログアウトエラー:', error.message);
  }
};

// エクスポート部分（まとめてエクスポート）
export { checkAuth, forceLogout };
