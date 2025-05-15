import { supabase } from '../utils/supabaseClient';

// 患者名を取得
export const fetchPatientName = async (patientId) => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('name')
      .eq('id', patientId)
      .single();

    if (error) throw error;

    return data.name;
  } catch (error) {
    console.error('Error fetching patient name:', error.message);
    return '不明';
  }
};

// 患者の施術履歴を取得
export const fetchTreatments = async (patientId) => {
  try {
    const { data, error } = await supabase
      .from('treatments')
      .select('*')
      .eq('patient_id', patientId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching treatments:', error.message);
    return [];
  }
};

// 患者の受傷履歴を取得
export const fetchInjuries = async (patientId) => {
  try {
    const { data, error } = await supabase
      .from('injuries')
      .select('*')
      .eq('patient_id', patientId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching injuries:', error.message);
    return [];
  }
};
