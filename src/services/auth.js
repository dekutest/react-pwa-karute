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
