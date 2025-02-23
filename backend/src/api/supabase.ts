// src/api/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || 'https://your-supabase-url.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY || 'your-supabase-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// 查询玩家账户信息
export async function getUserInfo(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  return error ? null : data;
}

// 查询玩家投注记录
export async function getUserBets(userId: string) {
  const { data, error } = await supabase
    .from('bets')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return error ? [] : data;
}

// 获取所有游戏投注统计
export async function getBetStats() {
  const { data, error } = await supabase.rpc('get_bet_stats');
  return error ? [] : data;
}
