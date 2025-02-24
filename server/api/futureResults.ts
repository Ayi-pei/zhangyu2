// src/api/futureResults.ts
import { supabase } from '../api/supabase';
import express from 'express';
const app = express();

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
export async function updateFutureResult(gameId: number, newResult: string) {
  const { data, error } = await supabase
    .from('future_results')
    .update({ predicted_result: newResult, updated_at: new Date() })
    .eq('game_id', gameId);
  return error ? null : data;
}

// 获取历史开奖结果
export async function getResults() {
  const { data, error } = await supabase.from('results').select('*');
  return error ? null : data;
}

// 更新历史开奖结果
export async function updateResult(resultId: number, resultData: any) {
  const { data, error } = await supabase
    .from('results')
    .update(resultData)
    .eq('id', resultId);
  return error ? null : data;
}

// Express 路由示例
app.get('/api/future-results', async (req, res) => {
  const results = await getFutureResults();
  res.json(results);
});

app.put('/api/future-results/:gameId', async (req, res) => {
  const gameId = parseInt(req.params.gameId, 10);
  const { newResult } = req.body;
  const result = await updateFutureResult(gameId, newResult);
  res.json(result);
});

app.get('/api/results', async (req, res) => {
  const results = await getResults();
  res.json(results);
});

app.put('/api/results/:resultId', async (req, res) => {
  const resultId = parseInt(req.params.resultId, 10);
  const resultData = req.body;
  const result = await updateResult(resultId, resultData);
  res.json(result);
});

export default app;
