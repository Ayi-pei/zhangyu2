// src/api/futureResults.ts
import { supabase } from '@/api/supabase'

// 获取未来 10 期开奖结果
export async function getFutureResults() {
  const { data, error } = await supabase
    .from('future_results')
    .select('*')
    .order('scheduled_time', { ascending: true })
    .limit(10);
  return error ? [] : data;
}

// 更新开奖结果（仅管理员可操作）
export async function updateResult(gameId: number, newResult: string) {
  const { data, error } = await supabase
    .from('future_results')
    .update({ predicted_result: newResult, updated_at: new Date() })
    .eq('game_id', gameId);
  return error ? null : data;
}
