import express from 'express';
import { supabase } from './supabase';

const app = express();

// 获取用户列表
app.get('/api/users', async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .range(0, 30); // 可以根据需要分页

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

// 创建用户
app.post('/api/users', async (req, res) => {
  const userData = req.body;
  const { data, error } = await supabase.from('users').insert([userData]);

  if (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
  return res.status(201).json({ success: true, message: '用户创建成功', data });
});

// 更新用户信息
app.put('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;

  const { data, error } = await supabase
    .from('users')
    .update(userData)
    .eq('id', userId);

  if (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
  return res.json({ success: true, message: '用户信息更新成功', data });
});

// 删除用户
app.delete('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { error } = await supabase.from('users').delete().eq('id', userId);

  if (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
  return res.json({ success: true, message: '用户删除成功' });
});

export default app;