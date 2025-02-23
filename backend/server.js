// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// 解析 JSON 请求体
app.use(express.json());

// 添加根路由，返回默认页面
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>API 服务</title>
      </head>
      <body>
        <h1>欢迎使用 API 服务</h1>
        <p>请通过前端调用 API 接口。</p>
      </body>
    </html>
  `);
});

// 示例 API 接口：绑定银行卡接口
app.post('/api/bind-card', (req, res) => {
  const { cardNumber, bank, cardHolder, exchangeCode } = req.body;
  // 处理绑定银行卡逻辑
  res.json({ message: '银行卡绑定成功' });
});

// 示例 API 接口：获取用户信息
app.get('/api/users/:userId', (req, res) => {
  const { userId } = req.params;
  // 模拟用户数据
  const user = {
    id: userId,
    username: 'player1',
    email: 'player1@example.com',
    balance: 1000,
    createdAt: new Date()
  };
  res.json(user);
});

// 示例 API 接口：更新用户余额
app.post('/api/users/:userId/balance', (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;
  // 处理更新用户余额逻辑
  res.json({ message: `用户 ${userId} 的余额已更新` });
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器正在运行在 http://localhost:${port}`);
});
