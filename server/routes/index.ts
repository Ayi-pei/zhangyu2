import { Router } from 'express';
import userRoutes from './userRoutes';
import betRoutes from './betRoutes';

const router = Router();

// 注册用户相关的路由
router.use('/users', userRoutes);

// 注册投注相关的路由
router.use('/bets', betRoutes);

export default router;