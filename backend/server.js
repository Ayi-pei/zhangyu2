const express = require('express');
const { supabase } = require('./src/api/supabase');
const app = express();
const port = process.env.PORT || 5000;

// 解析 JSON 请求体
app.use(express.json());

// 获取用户列表
app.get('/api/users', async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .limit(30)  // 可以根据需要分页
    .offset(0);

  if (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
  return res.json(data);
});

// 获取单个用户信息
app.get('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    return res.status(404).json({ success: false, message: '用户未找到' });
  }
  return res.json(data);
});

// 更新用户信息
app.put('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { card_number, account_info } = req.body;

  const { data, error } = await supabase
    .from('users')
    .update({ card_number, account_info })
    .eq('id', userId);

  if (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
  return res.json({ success: true, message: '用户信息更新成功', data });
});

// 获取开奖结果
app.get('/api/results', async (req, res) => {
  const { data, error } = await supabase
    .from('results')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
  return res.json(data);
});

// 修改开奖结果
app.put('/api/results/:id', async (req, res) => {
  const resultId = req.params.id;
  const { winning_numbers, draw_date } = req.body;

  const { data, error } = await supabase
    .from('results')
    .update({ winning_numbers, draw_date })
    .eq('id', resultId);

  if (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
  return res.json({ success: true, message: '开奖结果更新成功', data });
});

// 获取投注记录
app.get('/api/bets', async (req, res) => {
  const { userId } = req.query;

  const { data, error } = await supabase
    .from('bets')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
  return res.json(data);
});

// 修改投注记录
app.put('/api/bets/:id', async (req, res) => {
  const betId = req.params.id;
  const { amount, status } = req.body;

  const { data, error } = await supabase
    .from('bets')
    .update({ amount, status })
    .eq('id', betId);

  if (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
  return res.json({ success: true, message: '投注记录更新成功', data });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
