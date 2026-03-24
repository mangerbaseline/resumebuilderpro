import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const getAtsScore = async (req: Request, res: Response) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        const { resumeData, jobDescription } = req.body;

        if (!resumeData || !jobDescription) {
            return res.status(400).json({ message: 'Resume data and job description are required.' });
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error('ATS Error: GEMINI_API_KEY is missing from environment variables.');
            return res.status(500).json({ message: 'Gemini API key is not configured.' });
        }

        const model = genAI.getGenerativeModel({ 
            model: 'gemini-3-flash-preview',
            generationConfig: { temperature: 0 }
        });

        const prompt = `
You are an expert ATS (Applicant Tracking System) scanner. 
I will provide you with a Job Description and Candidate Resume Data in JSON format.
Your task is to evaluate the resume against the job description and provide:
1. An overall ATS score out of 100.
2. A list of matching keywords found in the resume.
3. A list of missing keywords from the job description that the resume lacks.
4. A short paragraph of suggestions for improvement.
5. also dont give different ats score for same resume 

Must respond ONLY with a valid JSON object matching this structure exactly (no markdown formatting, no extra text):
{
  "score": 85,
  "matchingKeywords": ["Node.js", "React"],
  "missingKeywords": ["AWS", "Docker"],
  "suggestions": "Add more details about cloud deployments."
}

Job Description:
${jobDescription}

Candidate Resume Data (JSON):
${JSON.stringify(resumeData)}
`;

        console.log('Sending prompt to Gemini...');
        const result = await model.generateContent(prompt);
        const response = result.response;
        const responseText = response.text();
        
        if (!responseText) {
            console.error('ATS Error: Gemini returned an empty response.');
            return res.status(500).json({ message: 'Empty response from AI.' });
        }

        // Extract JSON from response text in case Gemini wraps it in markdown blocks
        let jsonStr = responseText.trim();
        if (jsonStr.startsWith('\`\`\`json')) {
            jsonStr = jsonStr.substring(7, jsonStr.lastIndexOf('\`\`\`')).trim();
        } else if (jsonStr.startsWith('\`\`\`')) {
            jsonStr = jsonStr.substring(3, jsonStr.lastIndexOf('\`\`\`')).trim();
        }

        let atsData;
        try {
            atsData = JSON.parse(jsonStr);
        } catch (err) {
            console.error('ATS Error: Failed to parse Gemini JSON:', jsonStr);
            return res.status(500).json({ message: 'Failed to parse AI response.', raw: jsonStr });
        }

        res.status(200).json(atsData);

    } catch (error: any) {
        console.error('Error generating ATS score:', error);
        res.status(500).json({ message: 'Internal server error while evaluating ATS score.', error: error.message });
    }
};

export const enhanceExperience = async (req: Request, res: Response) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        const { resumeData, jobDescription } = req.body;

        if (!resumeData || !jobDescription) {
            return res.status(400).json({ message: 'Resume data and job description are required.' });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ message: 'Gemini API key is not configured.' });
        }

        const model = genAI.getGenerativeModel({ 
            model: 'gemini-3-flash-preview',
            generationConfig: { temperature: 0.7 }
        });

        const prompt = `
You are an expert resume writer. I will provide you with a Job Description and a list of Experience Descriptions from a candidate's resume.
Your task is to REWRITE each experience description to be more impactful, using action verbs and quantifiable achievements based on the job requirements.

CRITICAL RULES:
1. DO NOT ADD ANY NEW SKILLS that are not already implied in the original description.
2. DO NOT hallucinate technologies or tools.
3. Focus solely on improving the impact and clarity of the phrasing (e.g., use "Developed" instead of "Worked on", "Optimized" instead of "Fixed").
4. If a description is already very strong, you can leave it mostly as is but polished.
5. Keep the length similar to the original.

Must respond ONLY with a valid JSON object matching this structure exactly (no markdown formatting, no extra text):
{
  "enhancedExperiences": [
    "Enhanced description 1...",
    "Enhanced description 2..."
  ]
}

Job Description:
${jobDescription}

Candidate Experience Descriptions:
${JSON.stringify((resumeData.experience || []).map((exp: any) => exp.description))}
`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        // Extract JSON from response text
        let jsonStr = responseText.trim();
        if (jsonStr.startsWith('```json')) {
            jsonStr = jsonStr.substring(7, jsonStr.lastIndexOf('```')).trim();
        } else if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.substring(3, jsonStr.lastIndexOf('```')).trim();
        }

        const enhancedData = JSON.parse(jsonStr);
        res.status(200).json(enhancedData);

    } catch (error: any) {
        console.error('Error enhancing experience:', error);
        res.status(500).json({ message: 'Error enhancing experience.', error: error.message });
    }
};
