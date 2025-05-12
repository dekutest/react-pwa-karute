import { supabase } from '../utils/supabaseClient';

// 治癒ステータスを更新（完治/治療中）
export const updateInjuryStatus = async (injuryId, isHealed) => {
  try {
    const { data, error } = await supabase
      .from('injuries')
      .update({ is_healed: isHealed })
      .eq('id', injuryId)
      .select();

    if (error) {
      console.error('Error updating injury status:', error.message);
      return null;
    }

    console.log('Update response:', data);
    return data;
  } catch (error) {
    console.error('Unexpected error during update:', error.message);
    return null;
  }
};
