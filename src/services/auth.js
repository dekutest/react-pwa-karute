// auth.js
import { createClient } from '@supabase/supabase-js';
import defineAbilitiesFor from '../config/abilities';

// Supabaseクライアントの初期化
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// トークンを保存する関数
export const saveAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// トークンを取得する関数
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// トークンを削除する関数（ログアウト時に使用）
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

// ユーザー情報を保存する関数
export const saveUserInfo = (user) => {
  localStorage.setItem('userInfo', JSON.stringify(user));
};

// ユーザー情報を取得する関数
export const getUserInfo = () => {
  const user = localStorage.getItem('userInfo');
  return user ? JSON.parse(user) : null;
};

// ユーザー情報を削除する関数（ログアウト時に使用）
export const removeUserInfo = () => {
  localStorage.removeItem('userInfo');
};

// ユーザーロールを取得する関数
export const fetchUserRole = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId);

    if (error) {
      console.error('Error fetching user role:', error);
      return null;
    }

    return data[0]?.role || null;
  } catch (err) {
    console.error('Error in fetchUserRole:', err);
    return null;
  }
};

// ユーザーの権限を設定する関数
export const setUserAbility = async (userId) => {
  try {
    const role = await fetchUserRole(userId);
    return defineAbilitiesFor({ role });
  } catch (err) {
    console.error('Error in setUserAbility:', err);
    return null;
  }
};

// Googleログインを行う関数
export const loginWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) throw new Error(error.message);

    if (data) {
      const { session } = data;
      const token = session?.access_token;
      const user = session?.user;

      if (token) {
        saveAuthToken(token);
        saveUserInfo(user);  // ユーザー情報を保存
        console.log('Googleログイン成功:', user);
        return user;
      }
    }
  } catch (err) {
    console.error('Googleログイン失敗:', err);
    return null;
  }
};

// ログアウト処理
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);

    removeAuthToken();
    removeUserInfo();  // ユーザー情報も削除
    console.log('ログアウト成功');
  } catch (err) {
    console.error('ログアウト失敗:', err);
  }
};

// 現在のログイン状態を確認する関数
export const getCurrentUser = async () => {
  try {
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      console.log('現在のユーザー:', data.user);
      return data.user;
    } else {
      console.log('ユーザーが未ログインです');
      return null;
    }
  } catch (err) {
    console.error('ユーザー取得失敗:', err);
    return null;
  }
};
