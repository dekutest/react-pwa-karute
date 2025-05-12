import { supabase } from '../utils/supabaseClient';

export const fetchPatients = async () => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('*');

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching patients:', error.message);
    return [];
  }
};
