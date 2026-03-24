import express from 'express';
import multer from 'multer';
import {
    getResumes,
    createResume,
    getResumeById,
    updateResume,
    deleteResume,
    duplicateResume,
    generatePDF,
    getResumeBySlug,
    getTemplates
} from '../controllers/resumeController';
import { uploadResume } from '../controllers/resumeUploadController';
import { getAtsScore, enhanceExperience } from '../controllers/atsController';
import { generateCoverLetter } from '../controllers/coverLetterController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();
const upload = multer({ 
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.get('/templates', getTemplates);
router.route('/').get(protect, getResumes).post(protect, createResume);
router.post('/ats-score', protect, getAtsScore);
router.post('/enhance-experience', protect, enhanceExperience);
router.post('/generate-cover-letter', protect, generateCoverLetter);
router.get('/public/:slug', getResumeBySlug);
router.post('/upload', protect, upload.single('resume'), uploadResume);
router
    .route('/:id')
    .get(protect, getResumeById)
    .put(protect, updateResume)
    .delete(protect, deleteResume);

router.post('/:id/duplicate', protect, duplicateResume);
router.get('/:id/pdf', protect, generatePDF);

export default router;
