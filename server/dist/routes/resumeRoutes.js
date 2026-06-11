"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resumeController_1 = require("../controllers/resumeController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/templates', resumeController_1.getTemplates);
router.route('/').get(authMiddleware_1.protect, resumeController_1.getResumes).post(authMiddleware_1.protect, resumeController_1.createResume);
router.get('/public/:slug', resumeController_1.getResumeBySlug);
router
    .route('/:id')
    .get(authMiddleware_1.protect, resumeController_1.getResumeById)
    .put(authMiddleware_1.protect, resumeController_1.updateResume)
    .delete(authMiddleware_1.protect, resumeController_1.deleteResume);
router.post('/:id/duplicate', authMiddleware_1.protect, resumeController_1.duplicateResume);
router.get('/:id/pdf', authMiddleware_1.protect, resumeController_1.generatePDF);
exports.default = router;
