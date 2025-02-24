import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { supabase } from './api/supabase';
import routes from './routes';

const app = express();
const port = process.env.PORT || 5000;

// Middleware 配置
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Rate limiting 配置
const keyGenerator = (req: Request): string =>
  req.ip || (req.connection && req.connection.remoteAddress) || 'unknown';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 每个 IP 限制 100 次请求
  standardHeaders: true, // 在响应头中返回 RateLimit 信息
  legacyHeaders: false, // 禁用 X-RateLimit-* 响应头
  keyGenerator: keyGenerator,
});

app.use(limiter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
  console.log(`Request IP: ${ip}`);
  next();
});

// Authentication 中间件
const authenticateToken: express.RequestHandler = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    (req as any).user = user; // 将用户信息挂载到 req 上
    next();
  });
};

// 用户注册接口
app.post('/api/register', async (req: Request, res: Response): Promise<void> => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const { error } = await supabase
    .from('users')
    .insert([{ username, password: hashedPassword, email }]);
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.status(201).json({ message: 'User registered successfully' });
});

// 示例测试路由
app.get('/api/test', async (req: Request, res: Response): Promise<void> => {
  try {
    res.json({ message: 'Test route' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 用户登录接口
app.post('/api/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const { data, error } = await supabase
    .from('users')
    .select('id, username, password')
    .eq('username', username)
    .single();

  if (error || !data) {
    res.status(400).json({ error: 'Invalid username or password' });
    return;
  }

  const validPassword = await bcrypt.compare(password, data.password);
  if (!validPassword) {
    res.status(400).json({ error: 'Invalid username or password' });
    return;
  }

  const token = jwt.sign({ id: data.id, username: data.username }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '1h',
  });

  res.json({ token });
});

// 获取玩家余额接口
app.get('/api/player/balance', authenticateToken, async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { data, error } = await supabase
    .from('balances')
    .select('balance')
    .eq('user_id', userId)
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json({ balance: data.balance });
});

// 设置玩家余额接口
app.post('/api/player/balance', authenticateToken, async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { balance } = req.body;

  const { error } = await supabase
    .from('balances')
    .upsert({ user_id: userId, balance });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json({ message: 'Balance updated successfully' });
});

// 获取跳跃历史接口
app.get('/api/player/jump-history', authenticateToken, async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { data, error } = await supabase
    .from('jump_history')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json({ history: data });
});

// 设置跳跃历史接口
app.post('/api/player/jump-history', authenticateToken, async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { history } = req.body;

  const { error } = await supabase
    .from('jump_history')
    .upsert({ user_id: userId, history });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json({ message: 'Jump history updated successfully' });
});

// 导出数据接口（示例）
app.post('/api/export', authenticateToken, async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { data } = req.body;

  // 处理导出数据的逻辑（根据需要实现）
  res.json({ message: 'Data exported successfully' });
});

// 使用其他路由（例如：betRoutes, userRoutes 等）
// routes 模块内应导出一个 Router 对象，该对象内部已经注册了其它路由接口
app.use('/api', routes);

// 示例路由
app.get('/api/example', (req: Request, res: Response) => {
  res.json({ message: 'Hello, world!' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`服务器正在运行在 http://localhost:${port}`);
});

export default app;
