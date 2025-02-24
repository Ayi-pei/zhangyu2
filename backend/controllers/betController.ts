import { Request, Response, RequestHandler } from 'express';
import { supabase } from '../api/supabase';

// 扩展 Express Request 类型，添加 user 属性
interface CustomRequest extends Request {
  user?: {
    id?: string;
    username?: string;
  };
}

// 新下注接口，下注选项必须为 '大'、'小'、'单' 或 '双'
export const placeBet: RequestHandler = async (req, res) => {
  const customReq = req as CustomRequest;
  const { gameId, amount, choice } = customReq.body;
  const username = customReq.user?.username;

  if (!username) {
    res.status(401).json({ error: '未认证用户' });
    return;
  }

  const validChoices = ['大', '小', '单', '双'];
  if (!validChoices.includes(choice)) {
    res.status(400).json({ error: '无效的下注选项。请选择：大、小、单、双。' });
    return;
  }

  const { error } = await supabase
    .from('bets')
    .insert([{
      user_id: customReq.user?.id || null,
      game_id: gameId,
      amount,
      choice,
      status: '进行中',
      created_at: new Date()
    }]);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json({ message: '下注成功' });
};

export const getBetHistory: RequestHandler = async (req, res) => {
  const customReq = req as CustomRequest;
  const userId = customReq.user?.id;
  if (!userId) {
    res.status(401).json({ error: '未认证用户' });
    return;
  }

  const { data, error } = await supabase
    .from('bets')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json({ history: data });
};
