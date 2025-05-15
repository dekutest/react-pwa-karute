import { supabase } from '../supabaseClient';

// 患者一覧を取得する関数
export const fetchPatients = async () => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('*');
    if (error) throw new Error(error.message);
    return data;
  } catch (err) {
    console.error('患者データ取得エラー:', err.message);
    return [];
  }
};
