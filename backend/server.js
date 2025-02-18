const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());

// 允许前端访问后端
app.use(cors({
  origin: 'http://localhost:5173' // 允许你的前端访问后端
}));

// Supabase 连接
const supabase = createClient(
  'https://hzjsqvphkuwjskzisrhr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
);

// 获取所有用户
app.get('/users', async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// 启动服务器
app.listen(3000, () => {
  console.log('后端运行在 http://localhost:3000');
});
