import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import resumeRoutes from './routes/resumeRoutes';
import templateRoutes from './routes/templateRoutes';
import jobRoutes from './routes/jobRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import feedbackRoutes from "./routes/feedbackRoutes";
import adminRoutes from './routes/adminRoutes';

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

// Database Connection
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
