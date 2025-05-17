// トークンを使って管理者データを取得
export const fetchAdminData = async (token) => {
  try {
    const response = await fetch('http://localhost:5050/api/admin', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('アクセス権限がありません');
    return await response.json();
  } catch (error) {
    console.error('管理者データ取得エラー:', error.message);
    return null;
  }
};
