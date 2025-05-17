import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// シングルトンパターンでクライアントを作成
let supabase = null;

if (!supabase) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('✅ Supabaseクライアントが正常に作成されました。');
} else {
  console.log('⚠️ Supabaseクライアントは既に作成済みです。');
}

export { supabase };
