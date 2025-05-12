import { supabase } from '../utils/supabaseClient';

// 患者を追加
export const addPatient = async (name, team) => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .insert([{ name, team }])
      .select(); // データを取得

    if (error) throw error;
    if (data && data.length > 0) {
      console.log("Supabase挿入結果:", data);  // デバッグ用
      return data[0]; // 生成された患者データを返す
    } else {
      throw new Error('Patient ID not generated');
    }
  } catch (error) {
    console.error('Error adding patient:', error.message);
    return null;
  }
};

// 患者情報を更新
export const updatePatient = async (patientId, name, team) => {
  try {
    if (!patientId || patientId === 'undefined') {
      throw new Error('Invalid patient ID');
    }

    const { data, error } = await supabase
      .from('patients')
      .update({ name, team })
      .eq('id', patientId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating patient:', error.message);
    return null;
  }
};
