import { createClient } from '@supabase/supabase-js';

// 環境変数からURLとキーを取得
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

// 環境変数が正しく読み込まれているか確認
// console.log("Supabase URL:", supabaseUrl);
// console.log("Supabase Key:", supabaseKey);

// Supabaseクライアントを作成
export const supabase = createClient(supabaseUrl, supabaseKey);
