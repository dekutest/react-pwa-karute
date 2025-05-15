import { supabase } from '../supabaseClient';

// 認証チェック関数
export const checkAuth = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session !== null;
};

// ユーザー情報取得関数
export const getUserInfo = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};

// 強制ログアウト関数
export const forceLogout = async () => {
  await supabase.auth.signOut();
  alert('ログアウトしました。再度ログインしてください。');
};
