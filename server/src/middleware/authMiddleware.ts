// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import User from '../models/User';

// interface DecodedToken {
//     id: string;
//     iat: number;
//     exp: number;
// }

// export const protect = async (req: Request, res: Response, next: NextFunction) => {
//     let token;

//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith('Bearer')
//     ) {
//         try {
//             token = req.headers.authorization.split(' ')[1];

//             const decoded = jwt.verify(
//                 token,
//                 process.env.JWT_SECRET || 'secret'
//             ) as DecodedToken;

//             // @ts-ignore
//             req.user = await User.findById(decoded.id).select('-password');
//             next();
//         } catch (error) {
//             console.error(error);
//             res.status(401).json({ message: 'Not authorized, token failed' });
//         }
//     }

//     if (!token) {
//         res.status(401).json({ message: 'Not authorized, no token' });
//     }
// };


// export const checkCredits = (cost: number) => {
//     return async (req: Request, res: Response, next: any) => {
//         // @ts-ignore
//         const user = req.user;

//         if (!user) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }

//         if (user.plan === 'free' && user.credits < cost) {
//             return res.status(403).json({
//                 message: 'Not enough credits. Upgrade to Pro.'
//             });
//         }

//         next();
//     };
// };

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface DecodedToken {
    id: string;
    iat: number;
    exp: number;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET || 'secret'
            ) as DecodedToken;

            // @ts-ignore
            req.user = await User.findById(decoded.id).select('-password');
            return next(); // ✅ ADD RETURN
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed' }); // ✅ ADD RETURN
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' }); // ✅ ADD RETURN
    }
};