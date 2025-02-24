import app from './App';

const port = process.env.PORT || 5000;

// 启动服务器
app.listen(port, () => {
  console.log(`服务器正在运行在 http://localhost:${port}`);
});