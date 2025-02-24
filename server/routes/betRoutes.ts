import { Router } from 'express';
import { placeBet, getBetHistory } from '../controllers/betController';

const router = Router();

router.post('/save', placeBet);
router.get('/history', getBetHistory);

export default router;