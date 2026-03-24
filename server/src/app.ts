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



app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/jobs', jobRoutes);
app.use("/api", feedbackRoutes);
app.use('/api/admin', adminRoutes);

// Install Chrome asynchronously at startup
const chromePath = '/opt/render/.cache/puppeteer/chrome/linux-146.0.7680.66/chrome-linux64/chrome';

async function installChromeIfMissing() {
  if (!fs.existsSync(chromePath)) {
    console.log('Chrome not found, installing...');
    await new Promise<void>((resolve, reject) => {
      const child = require('child_process').spawn(
        'npx', ['puppeteer', 'browsers', 'install', 'chrome'],
        { 
          stdio: 'inherit',
          env: { ...process.env, PUPPETEER_CACHE_DIR: '/opt/render/.cache/puppeteer' }
        }
      );
      child.on('close', (code: number) => {
        if (code === 0) {
          console.log('Chrome installed successfully');
          resolve();
        } else {
          reject(new Error(`Chrome install failed with code ${code}`));
        }
      });
    });
  }
}

connectDB();

// Start server first, install Chrome in background
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    installChromeIfMissing().catch(console.error);
});

