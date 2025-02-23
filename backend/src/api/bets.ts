import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

// 初始化 Supabase 客户端
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

const app = express();
app.use(express.json()); // 解析 JSON 请求

// 定义 Bet 接口
interface Bet {
  id: number;
  user_id: string;
  amount: number;
  choice: string; // 允许任意字符串（或限制为 '大' | '小' | '单' | '双'）
  status: string; // 允许任意字符串（或限制为 '进行中' | '已结算' | '取消'）
  bet_time: string; // 投注时间
  balance_after_bet: number; // 投注后余额
}

// 🟢 获取用户投注记录
app.get('/api/bets', async (req: Request, res: Response) => {
  const { userId } = req.query as { userId?: string };

  if (!userId) {
    return res.status(400).json({ success: false, message: '缺少用户 ID' });
  }

  const { data, error } = await supabase
    .from('bets') // ✅ **不再使用 `from<T, U>` 泛型**
    .select('id, amount, choice, user_id, bet_time, balance_after_bet')
    .eq('user_id', userId);

  if (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
  return res.json({ success: true, data });
});

// 🟢 修改投注记录
app.put('/api/bets/:id', async (req: Request, res: Response) => {
  const betId = req.params.id;
  const { amount, status, choice, bet_time, balance_after_bet } = req.body;

  if (!betId) {
    return res.status(400).json({ success: false, message: '缺少投注 ID' });
  }

  if (
    typeof amount !== 'number' ||
    typeof status !== 'string' ||
    typeof choice !== 'string' ||
    typeof bet_time !== 'string' ||
    typeof balance_after_bet !== 'number'
  ) {
    return res.status(400).json({ success: false, message: '无效的输入数据' });
  }

  const { data, error } = await supabase
    .from('bets') // ✅ **不再使用 `from<T, U>` 泛型**
    .update({ amount, status, choice, bet_time, balance_after_bet })
    .eq('id', betId)
    .select(); // 返回更新后的数据

  if (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
  return res.json({ success: true, message: '投注记录更新成功', data });
});

// 🟢 获取所有投注记录
export async function getBets() {
  const { data, error } = await supabase
    .from('bets') // ✅ **不再使用 `from<T, U>` 泛型**
    .select('id, amount, choice, user_id, bet_time, balance_after_bet');

  return error ? null : data;
}

// 🟢 更新投注记录
export async function updateBet(betId: number, betData: Partial<Bet>) {
  const { data, error } = await supabase
    .from('bets') // ✅ **不再使用 `from<T, U>` 泛型**
    .update(betData)
    .eq('id', betId)
    .select(); // 返回更新后的数据

  return error ? null : data;
}

export default app;
