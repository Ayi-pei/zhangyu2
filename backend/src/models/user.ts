// src/routes/user.ts
import express from 'express';
import { getUserById, updateUserAccount, exchangePoints } from '../api/user';
import { bindCard, getCardInfo } from '../api/bank';

const router = express.Router();

// 获取用户信息
router.get('/user/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = await getUserById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: '用户未找到' });
  }
  res.json(user);
});

// 更新用户账户信息
router.post('/user/:userId/update', async (req, res) => {
  const { cardNumber, accountInfo } = req.body;
  const userId = parseInt(req.params.userId);

  const updatedUser = await updateUserAccount(userId, cardNumber, accountInfo);
  if (!updatedUser) {
    return res.status(500).json({ success: false, message: '更新失败' });
  }
  res.json({ success: true, message: '更新成功', data: updatedUser });
});

// 积分兑换
router.post('/user/:userId/exchange', async (req, res) => {
  const { points } = req.body;
  const userId = parseInt(req.params.userId);

  const updatedUser = await exchangePoints(userId, points);
  if (!updatedUser) {
    return res.status(500).json({ success: false, message: '兑换失败' });
  }
  res.json({ success: true, message: '兑换成功', data: updatedUser });
});

// 绑定银行卡
router.post('/user/:userId/bind-card', async (req, res) => {
  const { cardNumber, bank, cardHolder } = req.body;
  const userId = parseInt(req.params.userId);

  const result = await bindCard(userId, cardNumber, bank, cardHolder);
  if (!result.success) {
    return res.status(500).json(result);
  }
  res.json(result);
});

// 获取用户绑定的银行卡信息
router.get('/user/:userId/card-info', async (req, res) => {
  const userId = parseInt(req.params.userId);

  const cardInfo = await getCardInfo(userId);
  if (!cardInfo) {
    return res.status(404).json({ success: false, message: '未绑定银行卡' });
  }
  res.json(cardInfo);
});

export default router;
