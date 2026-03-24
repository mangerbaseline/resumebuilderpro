import { Request, Response } from 'express';
import User from '../models/User';
import Resume from '../models/Resume';
import Job from '../models/Job';
import Feedback from '../models/Feedback';

export const getAdminData = async (req: any, res: Response) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        const resumes = await Resume.find().sort({ updatedAt: -1 });
        const jobs = await Job.find().sort({ updatedAt: -1 });
        const feedbacks = await Feedback.find().populate('user', 'name email').sort({ createdAt: -1 });

        // Calculate some basic activity stats
        const usersData = users.map(user => {
            const userResumes = resumes.filter(r => r.user?.toString() === user._id.toString());
            const userJobs = jobs.filter(j => j.user?.toString() === user._id.toString());
            return {
                ...user.toObject(),
                resumesCount: userResumes.length,
                resumes: userResumes,
                jobsCount: userJobs.length,
                activity: userResumes.length + userJobs.length
            };
        });

        const subscribedUsers = users.filter((u: any) => u.isSubscribed);
        
        const dailyRevenue: Record<string, number> = {};
        const monthlyRevenue: Record<string, number> = {};

        subscribedUsers.forEach((user: any) => {
            const date = new Date(user.updatedAt || user.createdAt);
            const dayKey = date.toISOString().split('T')[0];
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            dailyRevenue[dayKey] = (dailyRevenue[dayKey] || 0) + 1;
            monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + 1;
        });

        res.status(200).json({
            users: usersData,
            feedbacks,
            dailyRevenue,
            monthlyRevenue,
            totalSubscribed: subscribedUsers.length,
            totalResumes: resumes.length,
            totalJobs: jobs.length,
            totalUsers: users.length,
            totalFeedback: feedbacks.length
        });
    } catch (error: any) {
        console.error("Admin data fetch error:", error);
        res.status(500).json({ message: 'Failed to fetch admin data' });
    }
};
