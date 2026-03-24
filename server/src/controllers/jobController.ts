import { Request, Response } from 'express';
import Job from '../models/Job';

export const getJobs = async (req: Request, res: Response) => {
    try {
        const jobs = await Job.find({ user: (req as any).user._id })
            .populate('resume', 'title selectedTemplate')
            .sort({ updatedAt: -1 });
        res.status(200).json(jobs);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching jobs', error: error.message });
    }
};

export const createJob = async (req: Request, res: Response) => {
    try {
        const { companyName, position, resume, status, notes } = req.body;
        
        const newJob = new Job({
            user: (req as any).user._id,
            companyName,
            position,
            resume,
            status: status || 'to-apply',
            notes
        });

        const savedJob = await newJob.save();
        const populatedJob = await Job.findById(savedJob._id).populate('resume', 'title selectedTemplate');
        
        res.status(201).json(populatedJob);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating job', error: error.message });
    }
};

export const updateJob = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedJob = await Job.findOneAndUpdate(
            { _id: id, user: (req as any).user._id },
            req.body,
            { new: true }
        ).populate('resume', 'title selectedTemplate');

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(updatedJob);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating job', error: error.message });
    }
};

export const deleteJob = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedJob = await Job.findOneAndDelete({ _id: id, user: (req as any).user._id });

        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting job', error: error.message });
    }
};
