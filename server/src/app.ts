// // import express, { Application, Request, Response } from 'express';
// // import cors from 'cors';
// // import dotenv from 'dotenv';
// // dotenv.config();

// // import { connectDB } from './config/db';
// // import authRoutes from './routes/authRoutes';
// // import resumeRoutes from './routes/resumeRoutes';
// // import templateRoutes from './routes/templateRoutes';
// // import jobRoutes from './routes/jobRoutes';
// // import subscriptionRoutes from './routes/subscriptionRoutes';
// // import feedbackRoutes from "./routes/feedbackRoutes";
// // import adminRoutes from './routes/adminRoutes';
// // import aiRoutes from './routes/aiRoutes';
// // import interviewRoutes from './routes/interviewRoutes';
// // import { startCreditResetJob } from './cron/creditsReset';

// // const app: Application = express();
// // const PORT = process.env.PORT || 5000;

// // app.use(cors());
// // app.use('/api/subscriptions', subscriptionRoutes);
// // app.use(express.json());
// // app.get('/', (req: Request, res: Response) => {
// //     res.send('API is running...');
// // });
// // startCreditResetJob();

// // app.use('/api/auth', authRoutes);
// // app.use('/api/resumes', resumeRoutes);
// // app.use('/api/templates', templateRoutes);
// // app.use("/api", feedbackRoutes);
// // app.use('/api/admin', adminRoutes);
// // app.use('/api/ai', aiRoutes);
// // app.use("/api/jobs", jobRoutes);
// // app.use("/api" , interviewRoutes);
// // connectDB();

// // app.listen(PORT, () => {
// //     console.log(`Server running on port ${PORT}`);
// // });


// import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// dotenv.config();

// import { connectDB } from './config/db';
// import authRoutes from './routes/authRoutes';
// import resumeRoutes from './routes/resumeRoutes';
// import templateRoutes from './routes/templateRoutes';
// import jobRoutes from './routes/jobRoutes';
// import subscriptionRoutes from './routes/subscriptionRoutes';
// import feedbackRoutes from "./routes/feedbackRoutes";
// import adminRoutes from './routes/adminRoutes';
// import aiRoutes from './routes/aiRoutes';
// import interviewRoutes from './routes/interviewRoutes';
// import { startCreditResetJob } from './cron/creditsReset';

// const app: Application = express();
// const PORT = process.env.PORT || 5000;

// // 1. ADVANCED CORS SETUP: Explicitly allows authorization tokens across ports
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'], // Add your Next.js local development ports here
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // 2. PARSERS PLACED BEFORE ALL ROUTE INITIALIZATIONS
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // 3. CORE BASE ROUTES
// app.get('/', (req: Request, res: Response) => {
//   res.send('API is running...');
// });

// // 4. ROUTE ROUTING REGISTRATIONS
// app.use('/api/subscriptions', subscriptionRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/resumes', resumeRoutes); // <-- Your ats-score endpoint lives here!
// app.use('/api/templates', templateRoutes);
// app.use("/api", feedbackRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/ai', aiRoutes);
// app.use("/api/jobs", jobRoutes);
// app.use("/api", interviewRoutes);

// // 5. RUN BACKGROUND CRONS & DATABASE PIPELINES
// startCreditResetJob();
// connectDB();

// // app.listen(PORT, () => {
// //   console.log(`Server successfully running on port ${PORT}`);
// // });

// export default app; // Exporting the app for testing purposes


import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import resumeRoutes from './routes/resumeRoutes';
import templateRoutes from './routes/templateRoutes';
import jobRoutes from './routes/jobRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import feedbackRoutes from "./routes/feedbackRoutes";
import adminRoutes from './routes/adminRoutes';
import aiRoutes from './routes/aiRoutes';
import interviewRoutes from './routes/interviewRoutes';
import { startCreditResetJob } from './cron/creditsReset';

const app: Application = express();
const PORT = process.env.PORT || 5000;

// 1. ADVANCED CORS SETUP: Explicitly allows authorization tokens across ports
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. PARSERS PLACED BEFORE ALL ROUTE INITIALIZATIONS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. CORE BASE ROUTES
app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});

// 4. ROUTE ROUTING REGISTRATIONS
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes); // <-- Your ats-score endpoint lives here!
app.use('/api/templates', templateRoutes);
app.use("/api", feedbackRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api", interviewRoutes);

// 5. RUN BACKGROUND CRONS & DATABASE PIPELINES
startCreditResetJob();
connectDB();

// 6. SERVE FRONTEND IN PRODUCTION (Vercel)
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the frontend build folder
  app.use(express.static(path.join(__dirname, '../../client/dist')));
  
  // For any non-API route, serve the frontend index.html
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
  });
}

// 7. EXPORT FOR VERCEL (NO app.listen here!)
export default app;
