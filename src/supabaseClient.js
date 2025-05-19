import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

try {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('✅ Supabaseクライアントが正常に作成されました。');
} catch (err) {
  console.error('❌ Supabaseクライアント作成エラー:', err.message);
}

export { supabase };
