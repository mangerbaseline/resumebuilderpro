import express from 'express';
import { getAdminData } from '../controllers/adminController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/data', protect, getAdminData);

export default router;
