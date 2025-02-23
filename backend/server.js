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
  if (!cardNumber || !bank || !cardHolder || !exchangeCode) {
    return res.status(400).json({ success: false, message: '请填写完整的银行卡信息' });
  }
  // 模拟保存绑卡信息
  const cardData = { cardNumber, bank, cardHolder, exchangeCode };
  return res.json({ success: true, message: '银行卡绑定成功', cardData });
});

// 示例 API 接口：获取绑定信息接口
app.get('/api/card-info', (req, res) => {
  // 这里假设存在绑卡信息，否则返回 404
  // 实际项目中可以从数据库中查询用户信息
  const cardData = null;  // 请替换成实际数据逻辑
  if (cardData) {
    return res.json(cardData);
  } else {
    return res.status(404).json({ success: false, message: '未绑定银行卡' });
  }
});

// 示例 API 接口：积分兑换接口
app.post('/api/exchange', (req, res) => {
  // 模拟处理兑换请求
  return res.json({ success: true, message: '兑换成功' });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
