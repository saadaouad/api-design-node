import type { Request, Response, NextFunction } from 'express';

import type { JwtPayload } from '../types/jwt.ts';
import { verifyToken } from '../utils/jwt.ts';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const payload = await verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    console.error('Authentication error', err);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
