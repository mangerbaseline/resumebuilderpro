import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { execSync } from 'child_process';
dotenv.config();

import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import resumeRoutes from './routes/resumeRoutes';
import templateRoutes from './routes/templateRoutes';
import jobRoutes from './routes/jobRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import feedbackRoutes from "./routes/feedbackRoutes";
import adminRoutes from './routes/adminRoutes';
import puppeteer from 'puppeteer';
import fs from 'fs';
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

// Stripe webhook needs raw body, register it BEFORE express.json()
app.use('/api/subscriptions', subscriptionRoutes);

app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

app.get('/debug/chrome', (req: Request, res: Response) => {
    const expectedPath = '/opt/render/.cache/puppeteer/chrome/linux-146.0.7680.66/chrome-linux64/chrome';
    res.json({
        expectedPathExists: fs.existsSync(expectedPath),
        puppeteerExecutablePath: puppeteer.executablePath(),
        envVars: {
            PUPPETEER_EXECUTABLE_PATH: process.env.PUPPETEER_EXECUTABLE_PATH,
            PUPPETEER_CACHE_DIR: process.env.PUPPETEER_CACHE_DIR,
        },
        cacheExists: fs.existsSync('/opt/render/.cache/puppeteer'),
       cacheContents: (() => {
    try {
        const result = execSync('find /opt/render/.cache/puppeteer -type f -name "chrome" 2>/dev/null', { encoding: 'utf8' });
        return result;
    } catch {
        return 'find command failed or directory empty';
    }
})(),
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/jobs', jobRoutes);
app.use("/api", feedbackRoutes);
app.use('/api/admin', adminRoutes);

// Database Connection
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


