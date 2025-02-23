import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5173;

// Trust first proxy if behind a proxy server
app.set('trust proxy', 1);

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Custom handler for when IP is undefined
  keyGenerator: (req) => {
    // Fallback to a default IP if req.ip is undefined
    return req.ip || req.connection.remoteAddress || 'unknown';
  }
});

// Apply rate limiter to all routes
app.use(limiter);

// In-memory storage (replace with a proper database in production)
const users = new Map();
const gameData = new Map();
const transactions = new Map();

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body;

  if (users.has(username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.set(username, {
    username,
    password: hashedPassword,
    email,
    balance: 3000,
    createdAt: new Date()
  });

  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.get(username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );

  res.json({ token, user: { username: user.username, balance: user.balance } });
});

// Game routes
app.post('/api/game/save', authenticateToken, (req, res) => {
  const { gameId, mode, data } = req.body;
  const username = req.user.username;
  
  const key = `${username}-${gameId}`;
  gameData.set(key, {
    mode,
    data,
    updatedAt: new Date()
  });

  res.json({ message: 'Game data saved successfully' });
});

app.get('/api/game/history', authenticateToken, (req, res) => {
  const username = req.user.username;
  const userGames = Array.from(gameData.entries())
    .filter(([key]) => key.startsWith(username))
    .map(([_, value]) => value);

  res.json(userGames);
});

// Transaction routes
app.post('/api/transaction/recharge', authenticateToken, (req, res) => {
  const { amount } = req.body;
  const username = req.user.username;
  const user = users.get(username);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.balance += amount;
  transactions.set(`${username}-${Date.now()}`, {
    type: 'recharge',
    amount,
    timestamp: new Date()
  });

  res.json({ 
    message: 'Recharge successful',
    newBalance: user.balance
  });
});

app.post('/api/transaction/withdraw', authenticateToken, (req, res) => {
  const { amount, bankInfo } = req.body;
  const username = req.user.username;
  const user = users.get(username);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (user.balance < amount) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }

  user.balance -= amount;
  transactions.set(`${username}-${Date.now()}`, {
    type: 'withdraw',
    amount,
    bankInfo,
    timestamp: new Date()
  });

  res.json({
    message: 'Withdrawal request submitted',
    newBalance: user.balance
  });
});

// User profile routes
app.get('/api/user/profile', authenticateToken, (req, res) => {
  const username = req.user.username;
  const user = users.get(username);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { password, ...userProfile } = user;
  res.json(userProfile);
});

app.put('/api/user/profile', authenticateToken, (req, res) => {
  const username = req.user.username;
  const user = users.get(username);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const updatedUser = { ...user, ...req.body };
  users.set(username, updatedUser);

  const { password, ...userProfile } = updatedUser;
  res.json(userProfile);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});