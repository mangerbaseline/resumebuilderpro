"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePDF = exports.getResumeBySlug = exports.duplicateResume = exports.deleteResume = exports.updateResume = exports.getResumeById = exports.createResume = exports.getResumes = exports.getTemplates = void 0;
const Resume_1 = __importDefault(require("../models/Resume"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const templates_1 = require("../templates");
// Template Registry
const TEMPLATES = {
    modern: templates_1.modernTemplate,
    professional: templates_1.professionalTemplate,
    creative: templates_1.creativeTemplate,
    simple: templates_1.simpleTemplate
};
// @desc    Get available templates
// @route   GET /api/templates
// @access  Public
const getTemplates = async (req, res) => {
    const templates = [
        {
            id: 'modern',
            name: 'Techy',
            description: 'Modern tech-focused layout with a clean aesthetic.',
            thumbnail: '/templates/modern.png'
        },
        {
            id: 'professional',
            name: 'Professional',
            description: 'Elegant layout with a dark sidebar and serif typography.',
            thumbnail: '/templates/professional.png'
        },
        {
            id: 'creative',
            name: 'Creative',
            description: 'Bold, high-impact design for creators and designers.',
            thumbnail: '/templates/creative.png'
        },
        {
            id: 'simple',
            name: 'Simple',
            description: 'Minimalist ATS-friendly layout using Times New Roman.',
            thumbnail: '/templates/simple.png'
        }
    ];
    res.json(templates);
};
exports.getTemplates = getTemplates;
// @desc    Get all resumes for logged in user
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res) => {
    try {
        // @ts-ignore
        const resumes = await Resume_1.default.find({ user: req.user._id }).sort({ updatedAt: -1 });
        res.json(resumes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getResumes = getResumes;
// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res) => {
    const { title, selectedTemplate } = req.body;
    try {
        const resume = await Resume_1.default.create({
            // @ts-ignore
            user: req.user._id,
            title: title || 'Untitled Resume',
            selectedTemplate: selectedTemplate || 'modern',
            isDraft: true,
            data: {
                personalInfo: {
                    fullName: '',
                    jobTitle: '',
                    email: '',
                    phone: '',
                    location: '',
                    summary: '',
                    github: '',
                    linkedin: '',
                },
                experience: [],
                education: [],
                projects: [],
                skills: [],
            },
        });
        res.status(201).json(resume);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createResume = createResume;
// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume_1.default.findById(req.params.id);
        if (resume) {
            // @ts-ignore
            if (resume.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            res.json(resume);
        }
        else {
            res.status(404).json({ message: 'Resume not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getResumeById = getResumeById;
// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res) => {
    try {
        const resume = await Resume_1.default.findById(req.params.id);
        if (resume) {
            // @ts-ignore
            if (resume.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            resume.title = req.body.title || resume.title;
            resume.data = req.body.data || resume.data;
            resume.selectedTemplate = req.body.selectedTemplate || resume.selectedTemplate;
            resume.isDraft = req.body.isDraft !== undefined ? req.body.isDraft : resume.isDraft;
            const updatedResume = await resume.save();
            res.json(updatedResume);
        }
        else {
            res.status(404).json({ message: 'Resume not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateResume = updateResume;
// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
    try {
        const resume = await Resume_1.default.findById(req.params.id);
        if (resume) {
            // @ts-ignore
            if (resume.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            await resume.deleteOne();
            res.json({ message: 'Resume removed' });
        }
        else {
            res.status(404).json({ message: 'Resume not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteResume = deleteResume;
// @desc    Duplicate resume
// @route   POST /api/resumes/:id/duplicate
// @access  Private
const duplicateResume = async (req, res) => {
    try {
        const originalResume = await Resume_1.default.findById(req.params.id);
        if (!originalResume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        // @ts-ignore
        if (originalResume.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const newResume = await Resume_1.default.create({
            // @ts-ignore
            user: req.user._id,
            title: `${originalResume.title} (Copy)`,
            data: originalResume.data,
            selectedTemplate: originalResume.selectedTemplate,
            isDraft: true,
        });
        res.status(201).json(newResume);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.duplicateResume = duplicateResume;
// @desc    Get public resume by slug
// @route   GET /api/resumes/public/:slug
// @access  Public
const getResumeBySlug = async (req, res) => {
    try {
        const resume = await Resume_1.default.findOne({ slug: req.params.slug });
        if (resume) {
            res.json(resume);
        }
        else {
            res.status(404).json({ message: 'Resume not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getResumeBySlug = getResumeBySlug;
// @desc    Generate PDF using Puppeteer
// @route   GET /api/resumes/:id/pdf
// @access  Private
const generatePDF = async (req, res) => {
    try {
        const resume = await Resume_1.default.findById(req.params.id);
        if (!resume)
            return res.status(404).json({ message: 'Resume not found' });
        // @ts-ignore
        if (resume.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const templateId = resume.selectedTemplate || 'modern';
        const templateFn = TEMPLATES[templateId] || TEMPLATES['modern'];
        const htmlContent = templateFn(resume.data);
        // Launch Puppeteer
        const browser = await puppeteer_1.default.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        // Set viewport to match A4 proportions at 96 DPI
        await page.setViewport({
            width: 794,
            height: 1123,
            deviceScaleFactor: 2, // High resolution
        });
        await page.setContent(htmlContent, {
            waitUntil: ['networkidle0', 'load', 'domcontentloaded']
        });
        // Ensure fonts are loaded
        await page.evaluateHandle('document.fonts.ready');
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '0px',
                bottom: '0px',
                left: '0px',
                right: '0px'
            },
            scale: 1,
            preferCSSPageSize: true
        });
        await browser.close();
        // Stream PDF to client
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${resume.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf"`);
        res.status(200).send(pdfBuffer);
    }
    catch (error) {
        console.error('PDF Generation Error:', error);
        res.status(500).json({ message: 'Failed to generate PDF', error: error.message });
    }
};
exports.generatePDF = generatePDF;
