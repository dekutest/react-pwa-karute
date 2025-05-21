import supabase from '../supabaseClient';

/**
 * ロールとチームIDに応じて、患者データを取得
 * @param {string} role - ユーザーのロール（admin / staff / leader / practitioner）
 * @param {string} teamId - ユーザーの所属チームID（中間テーブル未導入の前提）
 * @returns {Array} 患者データの配列
 */
export const fetchPatients = async (role, teamId) => {
  try {
    let query = supabase.from('patients').select('*');

    if (role === 'leader' || role === 'staff') {
      query = query.eq('team_id', teamId); // 閲覧制限：自分のチームのみ
    } else if (role === 'practitioner') {
      return []; // practitionerは閲覧不可
    }

    const { data, error } = await query;

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching patients:', error.message);
    return [];
  }
};
