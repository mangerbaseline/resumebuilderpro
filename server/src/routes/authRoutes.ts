import express from 'express';
import { registerUser, loginUser, getMe, refreshToken } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/refresh', protect, refreshToken);

export default router;
