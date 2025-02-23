// src/api/supabase.ts
import { createClient } from '@supabase/supabase-js'

// 你的 Supabase 配置
const supabaseUrl = 'https://hzjsqvphkuwjskzisrhr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6anNxdnBoa3V3anNremlzcmhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMDk4MzYsImV4cCI6MjA1NTg4NTgzNn0.Ke1TYtXt1-R6l_ocuVriScOCuGCV7f5SjpRj5gWWGFA'
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
  const { data, error } = await supabase
    .from('bets')
    .select('game_type, sum(amount) as total_bet')
    .group('game_type');
  return error ? [] : data;
}
