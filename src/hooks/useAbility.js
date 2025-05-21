import { useEffect, useState, useMemo } from 'react';
import supabase from '../supabaseClient';
import defineAbilitiesFor from '../config/abilities';

export default function useAbility(userId) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('ロール取得エラー:', error.message);
        return;
      }

      setRole(data.role);
      console.log('取得したロール:', data.role)
    };

    fetchRole();
  }, [userId]);

  return useMemo(() => {
    if (!role) return null;
    return defineAbilitiesFor({ role });
  }, [role]);
}
