import { useMemo } from 'react';
import defineAbilitiesFor from '../config/abilities'; // 権限定義ファイル

export default function useAbility(userId) {
  // userId が null のときは何もせず null を返す
  return useMemo(() => {
    if (!userId) return null;

    // ここでロールを仮定（実際は Supabase から取得してもOK）
    let role = 'member'; // デフォルト

    if (userId === 'admin-id') {
      role = 'admin';
    }

    return defineAbilitiesFor({ role });
  }, [userId]);
}
